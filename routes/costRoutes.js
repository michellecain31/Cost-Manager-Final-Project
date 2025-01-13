const express = require('express');
const { addCost, getMonthlyReport } = require('../controllers/costController');
const router = express.Router();

router.post('/add', addCost);
router.get('/report', getMonthlyReport);

module.exports = router;

