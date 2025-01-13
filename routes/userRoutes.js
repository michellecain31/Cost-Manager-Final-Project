// Michelle Cain Segev Cohen

const express = require('express');
const router = express.Router();
const { getUserDetails, getDevelopers } = require('../controllers/userController');

// Endpoint to get user details by ID
router.get('/users/:id', getUserDetails);

// Endpoint to get developers information
router.get('/about', getDevelopers);

module.exports = router;
