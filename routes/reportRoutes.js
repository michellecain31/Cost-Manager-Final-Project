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
 * @param {string} req.query.id - The user ID
 * @param {number} req.query.year - The year
 * @param {number} req.query.month - The month
 * @returns {JSON} - Report with costs grouped by category
 */
router.get('/', async (req, res) => {
    try {
        const { id, year, month } = req.query;

        // Validate required query parameters
        if (!id || !year || !month) {
            return res.status(400).json({ error: 'One or more required properties are missing' });
        }

        // Retrieve costs for the specified user, year, and month
        const costs = await Cost.find({
            userid: id,
            year: parseInt(year),
            month: parseInt(month),
        });

        // Initialize grouped costs structure with all categories
        const groupedCosts = validCategories.reduce((acc, category) => {
            acc[category] = [];
            return acc;
        }, {});

        // Populate grouped costs with data
        costs.forEach((cost) => {
            groupedCosts[cost.category].push({
                sum: cost.sum,
                description: cost.description,
                day: cost.day,
            });
        });

        // Build the final report structure
        const report = {
            userid: id,
            year: parseInt(year),
            month: parseInt(month),
            costs: Object.entries(groupedCosts).map(([category, items]) => ({
                [category]: items,
            })),
        };

        // Return the report
        res.status(200).json(report);
    } catch (error) {
        console.error('Error retrieving monthly report:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
