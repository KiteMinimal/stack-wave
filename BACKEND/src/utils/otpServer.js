// utils/otpService.js
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const config = require('../config/config');

module.exports.generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

module.exports.sendOTPEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.EMAIL_USER,
      pass: config.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: '"OTP Signup" <no-reply@example.com>',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is: ${otp}`,
  });
};
