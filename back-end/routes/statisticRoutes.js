const express = require('express');
const { auth, restrictTo } = require('../middlewares/authMiddleware');
const usersStatisticRoutes = require('./usersStatisticRoutes');

const router = express.Router();

router.use(auth, restrictTo('admin'));

router.use('/users', usersStatisticRoutes);

module.exports = router;
