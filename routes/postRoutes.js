const express = require('express');
const { createPost, getPost, getAllPosts, unpublishedPosts } = require('../controllers/postController');
const { auth, restrictTo, notBanned } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/unpublished', auth, restrictTo('admin', 'moderator'), unpublishedPosts);
router.route('/').get(getAllPosts).post(auth, notBanned, createPost);
router.route('/:id').get(getPost);

module.exports = router;
