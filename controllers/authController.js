const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

exports.signup = catchAsync(async (req, res) => {
	const user = await User.create(req.body);
	const { password, ...others } = user._doc;
	res.status(201).json({
		status: 'success',
		data: { user: others },
	});
});
