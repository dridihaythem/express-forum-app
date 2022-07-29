const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/userModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

// const multerStorage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, 'public/images/users');
// 	},
// 	filename: (req, file, cb) => {
// 		const extension = file.mimetype.split('/')[1];
// 		cb(null, `${Date.now()}${Math.floor(Math.random() * 10000)}.${extension}`);
// 	},
// });

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
	if (file.mimetype.startsWith('image')) {
		cb(null, true);
	} else {
		return cb(new AppError('Please upload a vlid image', 422), false);
	}
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = (req, res, next) => {
	if (!req.file) return next();
	req.file.filename = `${Date.now()}${Math.floor(Math.random() * 10000)}.jpeg`;
	console.log(req.file.filename);
	sharp(req.file.buffer)
		.resize(500, 500)
		.toFormat('jpeg')
		.jpeg({ quality: 90 })
		.toFile(`public/images/users/${req.file.filename}`);
	next();
};

exports.getMe = (req, res, next) => {
	res.json({ status: 'success', user: req.user });
};

exports.updateMe = catchAsync(async (req, res, next) => {
	const { currentPassword, password, passwordConfirmation, ...others } = req.body;

	if (req.file) {
		others.photo = req.file.filename;
	}

	let user = await User.findById(req.user._id).select('+password');

	if (currentPassword) {
		// user want to update password

		if (!(await user.checkPassword(currentPassword, user.password))) {
			return next(new AppError('wrong current password', 422));
		}

		others.password = await User.encryptPassword(password);
	}
	// console.log({ ...others });
	user = await User.findByIdAndUpdate(req.user._id, others, { new: true, runValidators: true });

	res.json({ status: 'success', user });
});

exports.getUser = catchAsync(async (req, res, next) => {
	const user = await User.findById(req.params.id).select('-email');

	if (!user) {
		return next(new AppError('User not found', 404));
	}

	res.status(200).json({
		status: 'success',
		data: user,
	});
});
