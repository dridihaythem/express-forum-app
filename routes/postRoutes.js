const express = require('express');
const { createPost } = require('../controllers/postController');
const { auth, restrictTo } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/').post(auth, restrictTo('user'), createPost);

module.exports = router;
