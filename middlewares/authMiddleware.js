const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.auth = catchAsync(async (req, res, next) => {
	let token;
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1];
	}

	if (!token) {
		return next(new AppError('unauthorized', 401));
	}

	const data = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

	const user = await User.findById(data.id);

	if (!user) {
		return next(new AppError('unauthorized', 401));
	}

	req.user = user;

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
