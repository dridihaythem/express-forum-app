module.exports = (fn) => (req, res, next) =>
	fn(req, res, next).catch(function (err) {
		next(err);
	});
