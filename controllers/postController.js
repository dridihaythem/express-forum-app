const Post = require('../models/postModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.createPost = catchAsync(async (req, res, next) => {
	const data = {
		title: req.body.title,
		content: req.body.content,
		userId: req.user.id,
	};

	const post = await Post.create(data);

	res.status(201).json({
		status: 'success',
		data: { _id: post._id, title: post.title, content: post.content },
	});
});

exports.getPost = catchAsync(async (req, res, next) => {
	const post = await Post.findOne({ _id: req.params.id, published: true })
		.select('slug title content')
		.populate({ path: 'userId', select: 'first_name last_name' });

	if (!post) {
		return next(new AppError('Post not found', 404));
	}
	res.status(200).json({
		status: 'success',
		data: post,
	});
});
