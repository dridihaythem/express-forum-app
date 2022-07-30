const Post = require('../models/postModel');
const User = require('../models/userModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const { createSlug } = require('../utils/post');
const { banUser } = require('../utils/user');

exports.createPost = catchAsync(async (req, res, next) => {
	const data = { ...req.body };
	data.user = req.user._id;
	data.slug = await createSlug(data.title);

	// posts from users with roles "admin" , "moderator" must be approved immediately

	if (['admin', 'moderator'].includes(req.user.role)) {
		data.published = true;
		data.publishedAt = Date.now();
	}

	const post = await Post.create(data);

	res.status(201).json({
		status: 'success',
		data: { _id: post._id, slug: post.slug, title: post.title, content: post.content },
	});
});

exports.getPost = catchAsync(async (req, res, next) => {
	const filter = { slug: req.params.slug, published: true };

	if (req.user && ['admin', 'moderator'].includes(req.user.role)) {
		delete filter.published;
	}
	const post = await Post.findOne(filter).select('slug title content comments_count user publishedAt');

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
		.sort({ publishedAt: -1 })
		.select('slug title content comments_count user publishedAt');

	res.status(200).json({
		status: 'success',
		data: posts,
	});
});

exports.findUnpublished = catchAsync(async (req, res, next) => {
	const posts = await Post.find({ published: false }).select('slug title content comments_count user');

	res.status(200).json({
		status: 'success',
		data: posts,
	});
});

exports.publishPost = catchAsync(async (req, res, next) => {
	const post = await Post.findOneAndUpdate(
		{ slug: req.params.slug, published: false },
		{
			published: true,
			publishedAt: Date.now(),
		},
	).select('slug title content user');

	if (!post) {
		return next(new AppError('Post not found', 404));
	}
	res.status(200).json({
		status: 'success',
		data: post,
	});
});

exports.deletePost = catchAsync(async (req, res, next) => {
	const post = await Post.findOneAndDelete({ slug: req.params.slug });

	// admin and moderator can ban user
	await banUser(req.user, post.user._id);

	res.status(204).json({
		status: 'success',
		data: null,
	});
});

exports.updatePost = catchAsync(async (req, res, next) => {
	const { title, content } = req.body; // we can only update title and content

	const post = await Post.findOneAndUpdate(
		{ slug: req.params.slug },
		{ title, content },
		{ new: true, runValidators: true },
	);

	res.status(200).json({
		status: 'success',
		data: post,
	});
});

exports.findByUser = catchAsync(async (req, res, next) => {
	const user = await User.findById(req.params.userId).populate({
		path: 'posts',
		match: { published: true },
		select: 'slug title content -user',
	});

	if (!user) {
		return next(new AppError('User not found', 404));
	}

	res.status(200).json({
		status: 'success',
		data: user.posts,
	});
});
