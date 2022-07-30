const catchAsync = require('./catchAsync');

const validate = (schema) =>
	catchAsync(async (req, res, next) => {
		try {
			const result = await schema.validateAsync(req.body, { abortEarly: false });
			req.body = result;

			next();
		} catch (error) {
			const details = error.details;
			let errors;
			if (!details) {
				// example : error.message =  "email already exists (email)"
				// param = email
				const message = error.message;
				const param = message.substring(message.lastIndexOf('(') + 1, message.lastIndexOf(')') - 1);
				errors = [{ param, message }];
			} else {
				errors = details.map((el) => ({ param: el.path[0], message: el.message.replaceAll('"', '') }));
			}
			res.status(422).json({ status: 'fail', errors });
		}
	});

module.exports = validate;
