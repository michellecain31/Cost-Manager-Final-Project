// Michelle Cain Segev Cohen

const express = require('express');
const router = express.Router();
const Report = require('../models/computedreports');

// GET request to retrieve a monthly report
router.get('/', (req, res) => {
    const { year, month, user_id } = req.query; // Extract query parameters

    // Validate required query parameters
    if (!year || !month || !user_id) {
        return res.status(400).json({ error: 'One or more of the required properties are missing' });
    }

    // Create a name for the computed report
    const reportName = `${year}${month}${user_id}`;

    // Check if a computed report exists for this date
    Report.findOne({ name: reportName }, (error, report) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        if (report) {
            // Return the computed report if it exists
            return res.json(report.computedReport);
        }
        // Respond with an error if no report exists
        return res.status(400).json({ error: 'No costs found for the specified date' });
    });
});

module.exports = router;
