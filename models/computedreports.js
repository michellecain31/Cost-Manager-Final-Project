 // Michelle Cain Segev Cohen

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating a schema for computed reports in MongoDB
const ComputedReportsSchema = new Schema({
    name: {
        type: String,
        required: true // Ensure the report has a name
    },
    computedReport: {
        type: Object, // JSON-like structure
        required: true // Ensure the report contains data
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically add a timestamp when the report is created
    }
});

const Report = mongoose.model('computedreports', ComputedReportsSchema);

module.exports = Report;

