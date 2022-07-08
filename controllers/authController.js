const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

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
