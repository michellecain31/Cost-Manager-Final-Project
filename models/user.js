// Michelle Cain Segev Cohen

const mongoose = require('mongoose');

/**
 * @typedef {Object} User
 * @property {string} _id - The unique identifier for the user.
 * @property {string} first_name - The first name of the user.
 * @property {string} last_name - The last name of the user.
 * @property {Date} birthday - The user's date of birth.
 * @property {string} marital_status - The marital status of the user.
 */

/**
 * User Schema for MongoDB
 */
const UserSchema = new mongoose.Schema({
    _id: {
        type: String, // `_id` remains a string
        required: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    birthday: {
        type: Date,
        required: true,
    },
    marital_status: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('User', UserSchema);
