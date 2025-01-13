const express = require('express');
const { getUserDetails, getDevelopers } = require('../controllers/userController');
const router = express.Router();

router.get('/users/:id', getUserDetails);
router.get('/about', getDevelopers);

module.exports = router;

