const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

const getUserFromToken = async (req) => {
	let token;

	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1];
	}

	if (!token) return;

	const data = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

	const user = await User.findById(data.id);

	return user;
};

exports.auth = catchAsync(async (req, res, next) => {
	const user = await getUserFromToken(req);

	if (!user) {
		return next(new AppError('unauthorized', 401));
	}
	if (user.disabled) {
		return next(new AppError('Your account has been disabled', 401));
	}

	req.user = user;

	next();
});

//
exports.appendUserIfTokenExist = catchAsync(async (req, res, next) => {
	const user = await getUserFromToken(req);
	if (user) {
		req.user = user;
	}
	next();
});

exports.restrictTo =
	(...roles) =>
	(req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(new AppError('You do not have permission to perform this action', 403));
		}
		next();
	};

exports.notBanned = (req, res, next) => {
	if (req.user.banned) {
		return next(new AppError('Your account has been banned', 403));
	}
	next();
};
