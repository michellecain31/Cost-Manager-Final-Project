// Michelle Cain Segev Cohen

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.send('Welcome to the Cost Manager API!');
});

module.exports = router;

