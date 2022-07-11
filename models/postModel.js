const mongoose = require('mongoose');
const slugify = require('slugify');

const postSchema = mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: [true, 'Post must belong to a user'],
	},
	slug: {
		type: String,
		unique: [true, 'Slug must be unique'],
	},
	title: {
		type: String,
		required: [true, 'Title is required'],
		minlength: [10, 'Title must be at least 10 characters long'],
		maxlength: [100, 'Title  must be at most 100 characters long'],
	},
	content: {
		type: String,
		required: [true, 'Content is required'],
		minlength: [10, 'Content must be at least 10 characters long'],
	},
	published: {
		type: Boolean,
		default: false,
	},
	publishedAt: {
		type: Date,
	},
});

// Create slug when create a new post
postSchema.pre('save', function (next) {
	this.slug = slugify(this.title);
	next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
