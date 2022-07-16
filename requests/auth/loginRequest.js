const Joi = require('joi');

const loginRequest = Joi.object({
	email: Joi.string().email().required().lowercase(),
	password: Joi.required(),
});

module.exports = loginRequest;
