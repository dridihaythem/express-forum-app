const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

exports.signup = catchAsync(async (req, res) => {
	let user = await User.create(req.body);
	//FIXME : hide password
	res.status(201).json({
		status: 'success',
		data: { user: user },
	});
});
