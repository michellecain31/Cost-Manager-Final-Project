// Michelle Cain Segev Cohen

const express = require('express');
const router = express.Router();

// Building an array with objects that represent the developers
const developers = [
    { 'firstname': 'Michelle', 'lastname': 'Cain', 'id': 318005170, 'email': 'michellecainn@gmail.com' },
    { 'firstname': 'Segev', 'lastname': 'Cohen', 'id': 207296765, 'email': 'segevcohen98@gmail.com' }
];

// The request is sent using the GET method
router.get('/', (req, res) => {
    // The response is sent as a JSON object
    res.json(developers);
});

module.exports = router;
