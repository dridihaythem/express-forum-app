const express = require('express');
const { getByGender, getByRole, getByRegistrationMonth } = require('../controllers/statisticController');

const router = express.Router();

router.get('/getByGender', getByGender);
router.get('/getByRole', getByRole);
router.get('/getByRegistrationMonth', getByRegistrationMonth);

module.exports = router;
