// Michelle Cain Segev Cohen

const express = require('express');
const router = express.Router();
const Cost = require('../models/cost');

// Allowed categories for cost items
const validCategories = ['food', 'health', 'housing', 'sport', 'education'];

/**
 * @route POST /api/addcost
 * @description Adds a new cost item to the database
 * @access Public
 * @param {Object} req - Express request object
 * @param {Object} req.body - The request body
 * @param {string} req.body.userid - The ID of the user
 * @param {string} req.body.description - Description of the cost
 * @param {string} req.body.category - Category of the cost (must be one of the allowed categories)
 * @param {number} req.body.sum - The cost amount
 * @param {number} [req.body.year] - Year of the cost (defaults to the current year if not provided)
 * @param {number} [req.body.month] - Month of the cost (defaults to the current month if not provided)
 * @param {number} [req.body.day] - Day of the cost (defaults to the current day if not provided)
 * @param {Object} res - Express response object
 * @returns {JSON} - Success or error message with the cost details
 */
router.post('/', async (req, res) => {
    try {
        const { userid, description, category, sum, year, month, day } = req.body;

        // Validate required properties
        if (!userid || !description || !category || sum === undefined) {
            return res.status(400).json({ error: 'One or more required properties are missing' });
        }

        // Validate category input
        if (!validCategories.includes(category.toLowerCase())) {
            return res.status(400).json({ error: `Invalid category. Allowed categories are: ${validCategories.join(', ')}` });
        }

        // Validate sum
        if (sum < 0) {
            return res.status(400).json({ error: 'Sum cannot be negative' });
        }

        // Validate date fields (year, month, day)
        const validYear = year || new Date().getFullYear();
        const validMonth = month || new Date().getMonth() + 1;
        const validDay = day || new Date().getDate();

        if (validMonth < 1 || validMonth > 12) {
            return res.status(400).json({ error: 'Invalid month input' });
        }
        if (validDay < 1 || validDay > 31) {
            return res.status(400).json({ error: 'Invalid day input' });
        }

        // Generate a unique ID for the cost
        const costId = 'id' + Math.random().toString(16).slice(2);

        // Build the cost object
        const newCost = new Cost({
            userid,
            description,
            category: category.toLowerCase(),
            sum,
            year: validYear,
            month: validMonth,
            day: validDay,
            id: costId,
        });

        // Save the cost to the database
        const savedCost = await newCost.save();

        // Log the added cost to the terminal
        console.log('New cost added:', savedCost);

        // Return success response
        res.status(201).json({ message: 'Cost added successfully', cost: savedCost });
    } catch (error) {
        // Log the error to the terminal
        console.error('Error adding cost:', error);

        // Return error response
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
