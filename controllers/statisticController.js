const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.getByGender = catchAsync(async (req, res, next) => {
	const data = await User.aggregate([
		{
			$group: {
				_id: '$gender',
				users: { $sum: 1 },
			},
		},
		{
			$project: {
				_id: false,
				gender: '$_id',
				users: '$users',
			},
		},
	]);
	res.json({ status: 'success', data });
});

exports.getByRole = catchAsync(async (req, res, next) => {
	const data = await User.aggregate([
		{
			$group: {
				_id: '$role',
				users: { $sum: 1 },
			},
		},
		{
			$project: {
				_id: false,
				role: '$_id',
				users: '$users',
			},
		},
	]);
	res.json({ status: 'success', data });
});

exports.getByRegistrationMonth = catchAsync(async (req, res, next) => {
	const year = Number(req.query.year) || new Date().getFullYear();
	const data = await User.aggregate([
		{
			$unwind: '$createdAt',
		},
		{
			$match: {
				createdAt: {
					$gte: new Date(`${year}-01-01`),
					$lte: new Date(`${year}-12-31`),
				},
			},
		},
		{
			$group: {
				_id: { $month: '$createdAt' },
				users: { $sum: 1 },
			},
		},
		{
			$project: {
				_id: false,
				month_number: '$_id',
				users: '$users',
			},
		},
		{
			$sort: {
				month_number: 1,
			},
		},
	]);
	res.json({ status: 'success', data });
});
