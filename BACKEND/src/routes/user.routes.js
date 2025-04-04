const express = require('express');
const { userSignUpController, userLoginController } = require('../controller/userController');
const router = express.Router();

router.post('/signup',userSignUpController)
router.post('/login',userLoginController)

module.exports = router;