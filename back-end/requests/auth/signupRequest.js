const Joi = require('joi');
const User = require('../../models/userModel');

const checkUsedEmail = async (value, helpers) => {
	const check = await User.findOne({ email: value });
	if (check) {
		throw new Error('email already exists');
	}
	return value;
};

const date = new Date();
date.setFullYear(date.getFullYear() - 13);

const signupRequest = Joi.object({
	first_name: Joi.string().trim().min(3).max(10).required().lowercase(),
	last_name: Joi.string().trim().min(3).max(10).required().lowercase(),
	birthday: Joi.date().less(date).required().messages({
		'date.less': 'You must be at least 13 years old',
	}),
	email: Joi.string().email().required().lowercase().external(checkUsedEmail),
	gender: Joi.string().valid('male', 'female').required().lowercase(),
	password: Joi.string().min(6).required(),
	passwordConfirmation: Joi.string().min(6).required().valid(Joi.ref('password')),
});

module.exports = signupRequest;
