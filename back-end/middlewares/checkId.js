const ObjectId = require('mongoose').Types.ObjectId;

const AppError = require('../utils/AppError');

// check if args are valid mongo ObjectId
// example :
// checkId('id') , checkId('questionid')
// checkId('questionid','answerid','userid')
const checkId =
	(...args) =>
	(req, res, next) => {
		args.forEach((param) => {
			if (req.params.hasOwnProperty(param) && !ObjectId.isValid(req.params[param])) {
				return next(new AppError('Page not found', 404));
			}
		});

		next();
	};

module.exports = checkId;
