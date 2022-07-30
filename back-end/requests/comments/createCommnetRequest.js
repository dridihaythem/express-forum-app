const Joi = require('joi');

const createCommentRequest = Joi.object({
	comment: Joi.string().trim().min(10).max(255).required(),
});

module.exports = createCommentRequest;
