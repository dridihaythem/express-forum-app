const Joi = require('joi');

const resetPasswordRequest = Joi.object({
	password: Joi.required(),
	passwordConfirmation: Joi.string().required().valid(Joi.ref('password')),
});

module.exports = resetPasswordRequest;
