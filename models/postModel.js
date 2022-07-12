const mongoose = require('mongoose');
const slugify = require('slugify');

const postSchema = mongoose.Schema(
	{
		user: {
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
	},
	{ toJSON: { virtuals: true } },
	{ toObject: { virtuals: true } },
);

postSchema.virtual('comments', {
	ref: 'Comment',
	foreignField: 'post',
	localField: '_id',
});

// Create slug when create a new post
postSchema.pre('save', function (next) {
	this.slug = slugify(this.title);
	next();
});

//  populate user

postSchema.pre(/^find/, function (next) {
	this.populate({ path: 'user', select: 'first_name last_name' });
	next();
});

// show comments
postSchema.pre(/^findOne/, function (next) {
	this.populate({ path: 'comments', select: 'comment user publishedAt' });
	next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
