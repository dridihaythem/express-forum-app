const express = require('express');
const { createComment, deleteComment, updateComment } = require('../controllers/commentController');
const { auth, notBanned } = require('../middlewares/authMiddleware');
const { canUpdateOrDeleteComment } = require('../middlewares/commentMiddleware');
const createCommentRequest = require('../requests/comments/createCommnetRequest');
const validate = require('../utils/validate');

const router = express.Router({ mergeParams: true });

router.use(auth, notBanned);

router.route('/').post(validate(createCommentRequest), createComment);

router
	.route('/:id')
	.patch(canUpdateOrDeleteComment, validate(createCommentRequest), updateComment)
	.delete(canUpdateOrDeleteComment, deleteComment);

module.exports = router;
