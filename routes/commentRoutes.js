const express = require('express');
const { createComment } = require('../controllers/commentController');
const { auth, notBanned } = require('../middlewares/authMiddleware');

const router = express.Router({ mergeParams: true });

router.route('/').post(auth, notBanned, createComment);

module.exports = router;
