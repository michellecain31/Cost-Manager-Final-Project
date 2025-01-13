const Cost = require('../models/cost');

// Add a cost item
exports.addCost = async (req, res) => {
    try {
        const cost = new Cost(req.body);
        const savedCost = await cost.save();
        res.status(201).json(savedCost);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get monthly report
exports.getMonthlyReport = async (req, res) => {
    try {
        const { id, year, month } = req.query;
        const costs = await Cost.find({
            userid: id,
            date: {
                $gte: new Date(year, month - 1, 1),
                $lt: new Date(year, month, 1),
            },
        });
        res.json(costs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

