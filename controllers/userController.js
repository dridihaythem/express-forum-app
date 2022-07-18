exports.getMe = (req, res, next) => {
	res.json({ status: 'success', user: req.user });
};
