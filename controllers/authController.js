const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');

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
