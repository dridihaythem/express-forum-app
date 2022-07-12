const Comment = require('../models/commentModel');
const Post = require('../models/postModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const { banUser } = require('./authController');

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
		data: { _id: comment._id, comment: comment.comment, publishedAt: comment.publishedAt },
	});
});

exports.deleteComment = catchAsync(async (req, res, next) => {
	const comment = await Comment.findByIdAndDelete(req.params.id);

	// admin and moderator can ban user
	if (req.body.ban) {
		await banUser(req.user, comment.user._id);
	}

	res.status(204).json({
		status: 'success',
		data: null,
	});
});

exports.updateComment = catchAsync(async (req, res, next) => {
	const comment = await Comment.findByIdAndUpdate(
		req.params.id,
		{ comment: req.body.comment },
		{ new: true, runValidators: true },
	);

	res.status(200).json({
		status: 'success',
		data: { comment: comment.comment },
	});
});
