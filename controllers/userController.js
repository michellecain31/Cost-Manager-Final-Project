const User = require('../models/user');
const Cost = require('../models/cost');

// Get user details
exports.getUserDetails = async (req, res) => {
    try {
        const user = await User.findOne({ id: req.params.id });
        if (!user) throw new Error('User not found');
        const totalCosts = await Cost.aggregate([
            { $match: { userid: req.params.id } },
            { $group: { _id: null, total: { $sum: '$sum' } } },
        ]);
        res.json({
            first_name: user.first_name,
            last_name: user.last_name,
            id: user.id,
            total: totalCosts[0]?.total || 0,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get developers info
exports.getDevelopers = (req, res) => {
    res.json([
        { first_name: 'Michelle', last_name: 'Cain' }, // Add more team members here
    ]);
};

