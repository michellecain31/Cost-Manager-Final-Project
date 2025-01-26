// Michelle Cain Segev Cohen

const express = require('express');
const router = express.Router();
const Cost = require('../models/cost');

// Predefined categories
const validCategories = ['food', 'health', 'housing', 'sport', 'education'];

/**
 * @route GET /api/report
 * @description Retrieve a monthly report of costs grouped by category
 * @access Public
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters
 * @param {string} req.query.user_id - The user ID
 * @param {number} req.query.year - The year
 * @param {number} req.query.month - The month
 * @returns {JSON} - Grouped costs by category
 */
router.get('/', async (req, res) => {
    try {
        const { user_id, year, month } = req.query;

        // Validate required query parameters
        if (!user_id || !year || !month) {
            return res.status(400).json({ error: 'One or more required properties are missing' });
        }

        // Retrieve costs for the specified user, year, and month
        const costs = await Cost.find({
            userid: user_id,
            year: parseInt(year),
            month: parseInt(month),
        });

        // Initialize grouped costs with all categories
        const groupedCosts = validCategories.reduce((acc, category) => {
            acc[category] = [];
            return acc;
        }, {});

        // Populate grouped costs with data
        costs.forEach((cost) => {
            groupedCosts[cost.category].push({
                description: cost.description,
                sum: cost.sum,
                day: cost.day,
            });
        });

        // Return grouped costs
        res.status(200).json(groupedCosts);
    } catch (error) {
        console.error('Error retrieving monthly report:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
