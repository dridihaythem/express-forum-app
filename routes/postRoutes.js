const express = require('express');
const { createPost, getPost, getAllPosts, unpublishedPosts, publishPost } = require('../controllers/postController');
const { auth, restrictTo, notBanned } = require('../middlewares/authMiddleware');

const router = express.Router();

// for admin and moderator
router.get('/unpublished', auth, restrictTo('admin', 'moderator'), unpublishedPosts);
router.patch('/publish/:id', auth, restrictTo('admin', 'moderator'), publishPost);

// for all users
router.route('/').get(getAllPosts).post(auth, notBanned, createPost);
router.route('/:id').get(getPost);

module.exports = router;
