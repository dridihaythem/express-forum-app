const Comment = require('../models/commentModel');
const Post = require('../models/postModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.createComment = catchAsync(async (req, res, next) => {
	const postId = req.params.postId;

	// check if post is published
	const post = await Post.findOne({ _id: postId, published: true });

	if (!post) {
		return next(new AppError('Post not found', 404));
	}

	const comment = await Comment.create({
		post: postId,
		user: req.user._id,
		comment: req.body.comment,
	});

	res.status(201).json({
		status: 'success',
		data: { comment: comment.comment },
	});
});
