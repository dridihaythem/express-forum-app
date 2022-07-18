const Joi = require('joi');

const date = new Date();
date.setFullYear(date.getFullYear() - 13);

const updateMeRequest = Joi.object({
	first_name: Joi.string().trim().min(3).max(10).lowercase(),
	last_name: Joi.string().trim().min(3).max(10).lowercase(),
	birthday: Joi.date().less(date).messages({
		'date.less': 'You must be at least 13 years old',
	}),
	gender: Joi.string().valid('male', 'female').lowercase(),
	currentPassword: Joi.string().min(6),
	password: Joi.string().min(6),
	passwordConfirmation: Joi.string().min(6).valid(Joi.ref('password')),
})
	.with('password', 'currentPassword') //current password required to update password
	.with('password', 'passwordConfirmation');

module.exports = updateMeRequest;
