const express = require('express');
const loginRequest = require('../requests/auth/loginRequest');
const signupRequest = require('../requests/auth/signupRequest');
const validate = require('../utils/validate');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', validate(signupRequest), authController.signup);
router.post('/login', validate(loginRequest), authController.login);
router.post('/forget-password', authController.forgetPassword);
router.patch('/reset-password/:token', authController.resetPassword);

module.exports = router;
