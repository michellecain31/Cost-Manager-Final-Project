// Michelle Cain Segev Cohen

const express = require('express');
const router = express.Router();
const Cost = require('../models/cost');

// Allowed categories for cost items
const validCategories = ['food', 'health', 'housing', 'sport', 'education'];

/**
 * @route POST /api/add
 * @description Adds a new cost item to the database
 * @access Public
 */
router.post('/add', async (req, res) => {
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

        // Validate date fields
        const validYear = year || new Date().getFullYear();
        const validMonth = month || new Date().getMonth() + 1;
        const validDay = day || new Date().getDate();

        if (validMonth < 1 || validMonth > 12) {
            return res.status(400).json({ error: 'Invalid month input' });
        }
        if (validDay < 1 || validDay > 31) {
            return res.status(400).json({ error: 'Invalid day input' });
        }

        // Create new cost object
        const newCost = new Cost({
            userid,
            description,
            category: category.toLowerCase(),
            sum,
            year: validYear,
            month: validMonth,
            day: validDay,
        });

        // Save to database
        const savedCost = await newCost.save();

        // Return success response
        res.status(201).json({ message: 'Cost added successfully', cost: savedCost });
    } catch (error) {
        console.error('Error adding cost:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
