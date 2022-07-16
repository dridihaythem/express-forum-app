const express = require('express');
const {
	createPost,
	getPost,
	getAllPosts,
	findUnpublished,
	publishPost,
	deletePost,
	updatePost,
} = require('../controllers/postController');
const { auth, restrictTo, notBanned, appendUserIfTokenExist } = require('../middlewares/authMiddleware');
const { canUpdateOrDeletePost } = require('../middlewares/postMiddleware');
const createPostRequest = require('../requests/posts/createPostRequest');
const validate = require('../utils/validate');
const commentRouter = require('./commentRoutes');

const router = express.Router();

// for admin and moderator
router.get('/findUnpublished', auth, restrictTo('admin', 'moderator'), findUnpublished);
router.patch('/:slug/publish', auth, restrictTo('admin', 'moderator'), publishPost);

// for all users
router.route('/').get(getAllPosts).post(auth, notBanned, validate(createPostRequest), createPost);
router
	.route('/:slug')
	.get(appendUserIfTokenExist, getPost)
	.patch(auth, notBanned, canUpdateOrDeletePost, updatePost)
	.delete(auth, notBanned, canUpdateOrDeletePost, deletePost);

router.use('/:postId/comments', commentRouter);

module.exports = router;
