const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: [true, 'Comment must belong to a user'],
	},
	post: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Post',
		required: [true, 'Comment must belong to a post'],
	},
	comment: {
		type: String,
		required: [true, 'Comment is required'],
	},
	publishedAt: {
		type: Date,
		default: Date.now(),
	},
});

commentSchema.pre(/^find/, function (next) {
	this.populate({ path: 'user', select: 'first_name last_name' });
	next();
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
