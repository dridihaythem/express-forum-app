const AppError = require('./AppError');

sendDevError = (err, res) => {
	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
		error: err,
		stack: err.stack,
	});
};

sendProdError = (err, res) => {
	if (err.isOperational) {
		res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
		});
	} else {
		console.log(`Error 💥 ${err.name}`);
		console.log(err);
		res.status(500).json({
			status: 'error',
			message: 'Something went very wrong !',
		});
	}
};

handleValidationErrors = (err) => {
	const errors = Object.values(err.errors).map((el) => el.message);
	const message = `Invalid input data: ${errors.join(', ')}`;
	return new AppError(message, 400);
};

const handleDuplicateFields = (err) => {
	const message = `Duplicate field value: ${Object.keys(err.keyValue)[0]}`;
	return new AppError(message, 400);
};

module.exports = (err, req, res, next) => {
	let error = Object.assign(err);
	error.statusCode = error.statusCode || 500;
	error.status = error.status || 'error';

	if (process.env.NODE_ENV === 'development') {
		sendDevError(err, res);
	} else {
		if (error.name == 'ValidationError') {
			error = handleValidationErrors(error);
		} else if (error.code == 11000) {
			error = handleDuplicateFields(error);
		}
		sendProdError(error, res);
	}
};
