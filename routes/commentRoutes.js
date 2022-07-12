const express = require('express');
const { createComment, deleteComment, updateComment } = require('../controllers/commentController');
const { auth, notBanned } = require('../middlewares/authMiddleware');
const { canUpdateOrDeleteComment } = require('../middlewares/commentMiddleware');

const router = express.Router({ mergeParams: true });

router.route('/').post(auth, notBanned, createComment);
router
	.route('/:id')
	.patch(auth, notBanned, canUpdateOrDeleteComment, updateComment)
	.delete(auth, notBanned, canUpdateOrDeleteComment, deleteComment);

module.exports = router;
