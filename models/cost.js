 // Michelle Cain Segev Cohen

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating a schema for costs in MongoDB
const CostsSchema = new Schema({
    userid: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    sum: {
        type: Number,
        required: true
    },
    year: {
        type: Number, // Extracted from the date
        default: () => new Date().getFullYear()
    },
    month: {
        type: Number, // Extracted from the date
        default: () => new Date().getMonth() + 1 // Months are 0-indexed in JavaScript
    },
    day: {
        type: Number, // Extracted from the date
        default: () => new Date().getDate()
    },
    id: {
        type: String,
        default: mongoose.Types.ObjectId // Generate a unique ID for each cost
    },
});

const Cost = mongoose.model('Cost', CostsSchema);

module.exports = Cost;
