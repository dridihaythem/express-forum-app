const Joi = require('joi');

const resetPasswordRequest = Joi.object({
	password: Joi.string().min(6).required(),
	passwordConfirmation: Joi.string().min(6).required().valid(Joi.ref('password')),
});

module.exports = resetPasswordRequest;
