const express = require('express');
const { getMe, updateMe, uploadUserPhoto, resizeUserPhoto } = require('../controllers/userController');
const { auth, notBanned } = require('../middlewares/authMiddleware');
const forgetPasswordRequest = require('../requests/auth/forgetPasswordRequest');
const loginRequest = require('../requests/auth/loginRequest');
const resetPasswordRequest = require('../requests/auth/resetPasswordRequest');
const signupRequest = require('../requests/auth/signupRequest');
const updateMeRequest = require('../requests/users/updateMeRequest');
const validate = require('../utils/validate');
const authController = require('./../controllers/authController');

const router = express.Router();

router
	.route('/me')
	.get(auth, getMe)
	.post(auth, notBanned, uploadUserPhoto, resizeUserPhoto, validate(updateMeRequest), updateMe);
router.post('/signup', validate(signupRequest), authController.signup);
router.post('/login', validate(loginRequest), authController.login);
router.post('/forget-password', validate(forgetPasswordRequest), authController.forgetPassword);
router.patch('/reset-password/:token', validate(resetPasswordRequest), authController.resetPassword);

module.exports = router;
