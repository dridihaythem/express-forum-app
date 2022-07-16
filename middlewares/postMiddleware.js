const Post = require('../models/postModel');
const AppError = require('../utils/AppError');

// check if user is admin or moderator
// or user is the author of this post
exports.canUpdateOrDeletePost = async (req, res, next) => {
	// user can update or delete only published posts
	const filter = { slug: req.params.slug, published: true };
	// admin or moderator can update or delete any posts
	if (['admin', 'moderator'].includes(req.user.role)) {
		delete filter.published;
	}

	const post = await Post.findOne(filter);

	if (!post) {
		return next(new AppError('Post not found', 404));
	}

	if (['admin', 'moderator'].includes(req.user.role) || req.user._id.equals(post.user._id)) {
		return next();
	}

	return next(new AppError('unauthorized', 401));
};
