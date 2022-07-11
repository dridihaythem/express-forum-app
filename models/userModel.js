const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const userSchema = mongoose.Schema({
	first_name: {
		type: String,
		required: [true, 'First name is required'],
		lowercase: true,
		minlength: [3, 'First name must be at least 3 characters long'],
		maxlength: [10, 'First name must be at most 10 characters long'],
	},
	last_name: {
		type: String,
		required: [true, 'Last name is required'],
		lowercase: true,
		minlength: [3, 'Last name must be at least 3 characters long'],
		maxlength: [10, 'Last name must be at most 10 characters long'],
	},
	birthday: {
		type: Date,
		required: [true, 'Birthday is required'],
	},
	email: {
		type: String,
		required: [true, 'Email is required'],
		unique: [true, 'Email is already in use'],
		lowercase: true,
		validate: [validator.isEmail, 'Please enter a valid email'],
	},
	role: {
		type: String,
		enum: ['user', 'moderator', 'admin'],
		default: 'user',
	},
	banned: {
		type: Boolean,
		default: false,
	},
	// account is active / disabled
	disabled: {
		type: Boolean,
		default: false,
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
		minlength: [6, 'Password must be at least 6 characters long'],
		select: false,
	},
	passwordConfirmation: {
		type: String,
		required: [true, 'Please confirm your password'],
		validate: {
			// this work on create or save only
			// doesn't work on update (exp : findOneAndUpdate)
			validator: function (val) {
				return val == this.password;
			},
			message: 'Passwords do not match',
		},
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	passwordResetToken: String,
	passwordResetExpires: Date,
});

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) next();
	console.log('encrypt password and remove passwordConfirmation field before save');
	this.password = await bcrypt.hash(this.password, 10);
	this.passwordConfirmation = undefined;
	next();
});

userSchema.methods.checkPassword = async function (password, hashedPassword) {
	console.log(`compare ${password} and ${hashedPassword}`);
	return await bcrypt.compare(password, hashedPassword);
};

userSchema.methods.createResetToken = function () {
	const resetToken = crypto.randomBytes(32).toString('hex');

	this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
	this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

	return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
