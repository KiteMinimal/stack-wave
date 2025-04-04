const userModel = require("../models/user.model")

module.exports.userSignUpController = async(req, res) => {
    try {

        const { username, password, email, avatar } = req.body

        if (!username || !password || !email || !avatar) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        const userAllReadyExist = await userModel.findOne({
            $or: [
                { username },
                { email }
            ]
        })
        
        if (userAllReadyExist) {
            return res.status(400).json({ message: 'User already exists' })
        }

        const hashedPassword = await userModel.hashPassword(password)

        const newUser = await userModel.create({
            username,
            password: hashedPassword,
            email,
            avatar
        })

        const token = newUser.generateToken()

        res.status(201).json({ message: 'User created successfully', user: newUser , token: token })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

}

module.exports.userLoginController = async(req, res) => {
    try {
        
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }

        const isPasswordValid = await user.comparePassword(password)
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }
        const token = user.generateToken()
        res.status(200).json({ message: 'Login successful', user, token })

    } catch (err) {
        return res.status(500).json({ error: err.message })
        
    }
}
