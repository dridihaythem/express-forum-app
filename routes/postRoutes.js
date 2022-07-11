const express = require('express');
const { createPost, getPost } = require('../controllers/postController');
const { auth, restrictTo } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/').post(auth, restrictTo('user'), createPost);
router.route('/:id').get(getPost);

module.exports = router;
