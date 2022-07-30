const express = require('express');
const { getUser } = require('../controllers/userController');
const checkId = require('../middlewares/checkId');

const router = express.Router();

router.get('/:id', checkId('id'), getUser);

module.exports = router;
