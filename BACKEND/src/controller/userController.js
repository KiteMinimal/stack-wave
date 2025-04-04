const userModel = require("../models/user.model");
const { generateOTP, sendOTPEmail } = require("../utils/otpServer");

module.exports.userSignUpController = async (req, res) => {
  try {
    const { username, password, email, avatar } = req.body;

    if (!username || !password || !email || !avatar) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const otp = generateOTP();
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

    const userAllReadyExist = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (userAllReadyExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await userModel.hashPassword(password);

    const newUser = await userModel.create({
      username,
      password: hashedPassword,
      email,
      avatar,
      otp,
      otpExpiresAt,
    });

    if (email.includes("@")) {
      await sendOTPEmail(email, otp);
    }

    res.status(201).json({ message: "otp send successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.userVerifyOTPController = async (req, res) => {
  try {
    const { emailOrPhone, otp } = req.body;

    const user = await userModel.findOne({ emailOrPhone });
    if (!user || user.otp !== otp || user.otpExpiresAt < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiresAt = undefined;
    await user.save();

    const token = newUser.generateToken();
    res
      .status(200)
      .json({
        message: "User verified successfully",
        user: user,
        token: token,
      });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.userLoginController = async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;
    if (!emailOrPhone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await userModel.findOne({ emailOrPhone });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = user.generateToken();
    res.status(200).json({ message: "Login successful", user, token });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
