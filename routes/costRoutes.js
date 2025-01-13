// Michelle Cain Segev Cohen

const express = require('express');
const router = express.Router();
const Cost = require('../models/cost');
const Report = require('../models/computedreports');

// POST request to add a new cost
router.post('/', async (req, res) => {
    try {
        const { userid, description, category, sum, year, month, day } = req.body;

        // Validate required properties
        if (!userid || !description || !category || sum === undefined) {
            return res.status(400).json({ error: 'One or more required properties are missing' });
        }

        // Validate category input
        const validCategories = ['food', 'health', 'housing', 'sport', 'education', 'transportation', 'other'];
        if (!validCategories.includes(category.toLowerCase())) {
            return res.status(400).json({ error: 'Invalid category input' });
        }

        // Validate sum
        if (sum < 0) {
            return res.status(400).json({ error: 'Sum cannot be negative' });
        }

        // Validate month and day
        const validYear = year || new Date().getFullYear();
        const validMonth = month || new Date().getMonth() + 1; // Months are 0-indexed in JavaScript
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
            category: category.toLowerCase(), // Store category in lowercase for consistency
            sum,
            year: validYear,
            month: validMonth,
            day: validDay,
            id: costId,
        });

        // Save the cost to the database
        const savedCost = await newCost.save();

        // Create or update a computed report
        const reportName = `${validYear}${validMonth}${userid}`;
        const existingReport = await Report.findOne({ name: reportName });

        if (existingReport) {
            // Update the existing report
            existingReport.computedReport[category.toLowerCase()].push({
                day: validDay,
                description,
                sum,
            });
            await existingReport.save();
        } else {
            // Create a new computed report
            const newReport = {
                food: [],
                health: [],
                housing: [],
                sport: [],
                education: [],
                transportation: [],
                other: [],
            };

            newReport[category.toLowerCase()].push({
                day: validDay,
                description,
                sum,
            });

            const computedReport = new Report({
                name: reportName,
                computedReport: newReport,
            });
            await computedReport.save();
        }

        // Return success response
        res.status(201).json({ message: 'Cost added successfully', cost: savedCost });
    } catch (error) {
        console.error('Error adding cost:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
