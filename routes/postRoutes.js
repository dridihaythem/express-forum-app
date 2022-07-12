const express = require('express');
const {
	createPost,
	getPost,
	getAllPosts,
	getUnpublishedPosts,
	publishPost,
	deletePost,
	updatePost,
} = require('../controllers/postController');
const { auth, restrictTo, notBanned } = require('../middlewares/authMiddleware');
const { canUpdateOrDeletePost } = require('../middlewares/postMiddleware');

const router = express.Router();

// for admin and moderator
router.get('/unpublished', auth, restrictTo('admin', 'moderator'), getUnpublishedPosts);
router.patch('/publish/:id', auth, restrictTo('admin', 'moderator'), publishPost);

// for all users
router.route('/').get(getAllPosts).post(auth, notBanned, createPost);
router
	.route('/:id')
	.get(getPost)
	.patch(auth, notBanned, canUpdateOrDeletePost, updatePost)
	.delete(auth, notBanned, canUpdateOrDeletePost, deletePost);

module.exports = router;