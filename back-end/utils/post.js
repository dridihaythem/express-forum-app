const slugify = require('slugify');
const Post = require('../models/postModel');

exports.createSlug = async (title) => {
	let slug = slugify(title);
	while ((await Post.findOne({ slug: slug })) != null) {
		slug = `${slug}-${Math.floor(Math.random() * 500) + 100}`;
	}
	return slug;
};
