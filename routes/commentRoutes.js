const express = require('express');
const { createComment, deleteComment, updateComment } = require('../controllers/commentController');
const { auth, notBanned } = require('../middlewares/authMiddleware');
const { canUpdateOrDeleteComment } = require('../middlewares/commentMiddleware');

const router = express.Router({ mergeParams: true });

router.use(auth, notBanned);

router.route('/').post(createComment);

router.route('/:id').patch(canUpdateOrDeleteComment, updateComment).delete(canUpdateOrDeleteComment, deleteComment);

module.exports = router;
