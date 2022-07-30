const Comment = require('../models/commentModel');
const Post = require('../models/postModel');
const AppError = require('../utils/AppError');

// check if user is admin or moderator
// or user is the author of this comment
exports.canUpdateOrDeleteComment = async (req, res, next) => {
	const post = await Post.findOne({ slug: req.params.slug });

	if (!post) {
		return next(new AppError('Post not found', 404));
	}

	const filter = { _id: req.params.id, post: post.id };

	const comment = await Comment.findOne(filter);

	if (!comment) {
		return next(new AppError('Comment not found', 404));
	}

	if (['admin', 'moderator'].includes(req.user.role) || req.user._id.equals(comment.user._id)) {
		return next();
	}

	return next(new AppError('unauthorized', 401));
};
