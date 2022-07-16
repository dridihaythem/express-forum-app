const Joi = require('joi');
const User = require('../../models/userModel');

const checkUserExist = async (value, helpers) => {
	const user = await User.findOne({ email: value });
	if (!user) {
		throw new Error('No user found with this email');
	}
	return value;
};

const forgetPasswordRequest = Joi.object({
	email: Joi.string().email().required().lowercase().external(checkUserExist),
});

module.exports = forgetPasswordRequest;
