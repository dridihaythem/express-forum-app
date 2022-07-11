const Post = require('../models/postModel');
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
