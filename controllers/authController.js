const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');
const sendEmail = require('../utils/SendEmail');

const createAndSendToken = (user, statusCode, res) => {
	const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
	res.status(statusCode).json({
		status: 'success',
		token: token,
		data: { user },
	});
};

exports.signup = catchAsync(async (req, res) => {
	const user = await User.create(req.body);
	const { password, ...others } = user._doc;

	createAndSendToken(others, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return next(new AppError('Please provide your email and password', 401));
	}

	const user = await User.findOne({ email }).select('+password');

	if (!user || !(await user.checkPassword(password, user.password))) {
		return next(new AppError('Incorrect email or password', 401));
	}

	const { password: _password, ...others } = user._doc;

	createAndSendToken(others, 200, res);
});

exports.forgetPassword = catchAsync(async (req, res, next) => {
	const { email } = req.body;

	if (!email) {
		return next(new AppError('Please provide your email', 401));
	}

	const user = await User.findOne({ email });

	if (!user) {
		return next(new AppError('No user found with this email', 404));
	}

	const token = user.createResetToken();

	await user.save({ validateBeforeSave: false });

	sendEmail({
		email: user.email,
		subject: 'Reset your password',
		message: `${req.protocol}://${req.get('host')}/api/v1/auth/reset-password/${token}`,
	})
		.then(() => {
			res.status(200).json({
				status: 'success',
				message: 'Token sent to email',
			});
		})
		.catch(async (err) => {
			user.passwordResetToken = undefined;
			user.passwordResetExpires = undefined;
			await user.save({ validateBeforeSave: false });
			return next(new AppError('Error sending email', 500));
		});
});

exports.resetPassword = catchAsync(async (req, res, next) => {
	const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

	const user = await User.findOne({ passwordResetToken: hashedToken, passwordResetExpires: { $gte: Date.now() } });

	if (!user) {
		return next(new AppError('Token is invalid or has expired', 400));
	}

	const { password, passwordConfirmation } = req.body;

	user.password = password;
	user.passwordConfirmation = passwordConfirmation;
	user.passwordResetToken = undefined;
	user.passwordResetExpires = undefined;

	await user.save();

	const { password: _password, ...others } = user._doc;

	createAndSendToken(others, 200, res);
});
