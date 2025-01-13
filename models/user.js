// Michelle Cain Segev Cohen
const mongoose = require('mongoose');

// User Schema
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

