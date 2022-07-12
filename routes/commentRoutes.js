const express = require('express');
const { createComment, deleteComment, updateComment } = require('../controllers/commentController');
const { auth, notBanned } = require('../middlewares/authMiddleware');
const { canUpdateOrDeleteComment } = require('../middlewares/commentMiddleware');

const router = express.Router({ mergeParams: true });

router.use(auth, notBanned);

router.route('/').post(createComment);

router.use(canUpdateOrDeleteComment);

router.route('/:id').patch(updateComment).delete(deleteComment);

module.exports = router;
