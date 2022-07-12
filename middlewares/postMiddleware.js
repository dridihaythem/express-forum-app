const Post = require('../models/postModel');
const AppError = require('../utils/AppError');

// check if user is admin or moderator
// or user is the author of this post
exports.canUpdateOrDeletePost = async (req, res, next) => {
	const post = await Post.findById(req.params.id);

	if (!post) {
		return next(new AppError('Post not found', 404));
	}

	if (['admin', 'moderator'].includes(req.user.role) || post.user == req.user._id) {
		next();
	}

	return next(new AppError('unauthorized', 401));
};
