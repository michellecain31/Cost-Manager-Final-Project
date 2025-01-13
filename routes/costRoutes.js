// Michelle Cain Segev Cohen

const express = require('express');
const router = express.Router();
const Cost = require('../models/cost');
const Report = require('../models/computedreports');

// POST request to add a new cost
router.post('/', async (req, res) => { // Endpoint for '/api/addcost'
    try {
        const user_id = req.body.userid || '123123'; // Default user_id if not provided
        const year = req.body.year || new Date().getFullYear();
        const month = req.body.month || new Date().getMonth() + 1; // Months are 0-indexed
        const day = req.body.day || new Date().getDate();
        const id = 'id' + Math.random().toString(16).slice(2); // Generate a unique ID for the cost
        const description = req.body.description;
        const category = req.body.category;
        const sum = req.body.sum;

        // Validate required properties
        if (!description || !category || !sum) {
            return res.status(400).json({ error: 'One or more required properties are missing' });
        }

        // Validate category input
        const validCategories = ['food', 'health', 'housing', 'sport', 'education', 'transportation', 'other'];
        if (!validCategories.includes(category)) {
            return res.status(400).json({ error: 'Invalid category input' });
        }

        // Validate sum
        if (sum < 0) {
            return res.status(400).json({ error: 'Sum cannot be negative' });
        }

        // Validate month and day
        if (month < 1 || month > 12) {
            return res.status(400).json({ error: 'Invalid month input' });
        }
        if (day < 1 || day > 31) {
            return res.status(400).json({ error: 'Invalid day input' });
        }

        // Build the cost object
        const newCost = new Cost({
            userid: user_id,
            year: year,
            month: month,
            day: day,
            id: id,
            description: description,
            category: category,
            sum: sum
        });

        // Save the cost to the database
        const savedCost = await Cost.create(newCost);

        // Create or update a computed report
        const reportName = `${year}${month}${user_id}`;
        const existingReport = await Report.findOne({ name: reportName });

        if (existingReport) {
            // Update the existing report
            existingReport.computedReport[category].push({
                day: day,
                description: description,
                sum: sum
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
                other: []
            };
            newReport[category].push({
                day: day,
                description: description,
                sum: sum
            });

            const computedReport = new Report({
                name: reportName,
                computedReport: newReport
            });
            await computedReport.save();
        }

        res.status(201).json({ message: 'Cost added successfully', cost: savedCost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
