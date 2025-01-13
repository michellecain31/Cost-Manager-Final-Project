// Michelle Cain Segev Cohen

const express = require('express');
const router = express.Router();

// Array of developers
const developers = [
    { firstname: 'Michelle', lastname: 'Cain', id: 318005170, email: 'michellecainn@gmail.com' },
    { firstname: 'Segev', lastname: 'Cohen', id: 207296765, email: 'segevcohen98@gmail.com' }
];

// Endpoint for developers information
router.get('/', (req, res) => {
    res.json(developers);
});

module.exports = router;
