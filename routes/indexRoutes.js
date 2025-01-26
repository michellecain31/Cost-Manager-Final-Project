// Michelle Cain Segev Cohen

const express = require('express');
const router = express.Router();

/**
 * @route GET /
 * @description Home page route for the Cost Manager API
 * @access Public
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {string} - A welcome message for the API
 */
router.get('/', function (req, res) {
    res.send('Welcome to the Cost Manager API!');
});

module.exports = router;
