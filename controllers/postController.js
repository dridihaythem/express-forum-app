const Post = require('../models/postModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.createPost = catchAsync(async (req, res, next) => {
	const data = {
		title: req.body.title,
		content: req.body.content,
		user: req.user._id,
	};

	// posts from users with roles "admin" , "moderator" must be approved immediately

	if (['admin', 'moderator'].includes(req.user.role)) {
		data.published = true;
		data.publishedAt = Date.now();
	}

	const post = await Post.create(data);

	res.status(201).json({
		status: 'success',
		data: { _id: post._id, title: post.title, content: post.content },
	});
});

exports.getPost = catchAsync(async (req, res, next) => {
	const post = await Post.findOne({ _id: req.params.id, published: true })
		.select('slug title content user')
		.populate({ path: 'user', select: 'first_name last_name' });

	if (!post) {
		return next(new AppError('Post not found', 404));
	}
	res.status(200).json({
		status: 'success',
		data: post,
	});
});

exports.getAllPosts = catchAsync(async (req, res, next) => {
	const posts = await Post.find({ published: true })
		.select('slug title conten user')
		.populate({ path: 'user', select: 'first_name last_name' });

	res.status(200).json({
		status: 'success',
		data: posts,
	});
});
