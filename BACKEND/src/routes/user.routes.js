const express = require("express");
const {
  userSignUpController,
  userLoginController,
  userVerifyOTPController,
} = require("../controller/userController");
const router = express.Router();

router.post("/signup", userSignUpController);
router.post("/login", userLoginController);
router.post("verify-otp", userVerifyOTPController);

module.exports = router;
