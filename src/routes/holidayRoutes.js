const express = require('express');
const router = express.Router();
const holidayController = require('../controllers/holidayController');

router.get('/holidays', holidayController.getHolidays);
router.get('/countries', holidayController.getCountries);

module.exports = router;
