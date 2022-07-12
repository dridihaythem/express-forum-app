const Comment = require('../models/commentModel');
const AppError = require('../utils/AppError');

// check if user is admin or moderator
// or user is the author of this comment
exports.canUpdateOrDeleteComment = async (req, res, next) => {
	const filter = { _id: req.params.id, post: req.params.postId };

	const comment = await Comment.findOne(filter);

	if (!comment) {
		return next(new AppError('Comment not found', 404));
	}

	if (['admin', 'moderator'].includes(req.user.role) || req.user._id.equals(comment.user._id)) {
		return next();
	}

	return next(new AppError('unauthorized', 401));
};
