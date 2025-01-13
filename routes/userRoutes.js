// Michelle Cain Segev Cohen

const express = require('express');
const router = express.Router();
const User = require('../models/user'); 
const Cost = require('../models/cost'); 

// Endpoint to get user details by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params; // Extract the user ID from the request
        const user = await User.findById(id); // Query the user using `_id`

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Aggregate total costs for the user
        const totalCosts = await Cost.aggregate([
            { $match: { userid: id } }, // Match costs by user ID
            { $group: { _id: null, total: { $sum: '$sum' } } }, // Sum the "sum" field
        ]);

        res.json({
            first_name: user.first_name,
            last_name: user.last_name,
            id: user._id, // Return `_id` as `id` for consistency in the response
            total: totalCosts[0]?.total || 0, // Default to 0 if no costs exist
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
