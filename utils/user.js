const User = require('../models/userModel');
const catchAsync = require('./catchAsync');

// check if user is admin/moderator otherwise ignore request
exports.banUser = async (authUser, userId) =>
	catchAsync(
		(async function (req, res, next) {
			if (['admin', 'moderator'].includes(authUser.role)) {
				await User.findByIdAndUpdate(userId, {
					banned: true,
				});
			}
		})(authUser, userId),
	);
