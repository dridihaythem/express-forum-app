const Joi = require('joi');

const createPostRequest = Joi.object({
	title: Joi.string().trim().min(10).max(70).required(),
	content: Joi.string().trim().min(10).max(500).required(),
});

module.exports = createPostRequest;
