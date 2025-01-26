// Michelle Cain Segev Cohen

const express = require('express');
const router = express.Router();

/**
 * @constant {Array} developers - Array containing the details of the development team
 * @property {string} firstname - First name of the developer
 * @property {string} lastname - Last name of the developer
 */
const developers = [
    { firstname: 'Michelle', lastname: 'Cain' },
    { firstname: 'Segev', lastname: 'Cohen' }
];

/**
 * @route GET /api/about
 * @description Returns the details of the developers (team members)
 * @access Public
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {JSON} - An array of objects containing the first and last names of developers
 */
router.get('/', (req, res) => {
    res.json(developers);
});

module.exports = router;
