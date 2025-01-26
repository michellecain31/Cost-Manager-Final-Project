// Michelle Cain Segev Cohen

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Allowed categories for cost items
 * @constant {string[]}
 */
const validCategories = ['food', 'health', 'housing', 'sport', 'education'];

/**
 * Cost Schema for MongoDB
 * @typedef {Object} Cost
 * @property {string} userid - ID of the user associated with the cost (required).
 * @property {string} description - Description of the cost (required).
 * @property {string} category - Category of the cost. Must be one of the valid categories (required).
 * @property {number} sum - Amount of the cost (required).
 * @property {number} year - Year of the cost. Defaults to the current year.
 * @property {number} month - Month of the cost. Defaults to the current month.
 * @property {number} day - Day of the cost. Defaults to the current day.
 * @property {string} id - Unique ID of the cost. Defaults to a generated ObjectId.
 */
const CostsSchema = new Schema({
    userid: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: validCategories, // Validate category against allowed values
    },
    sum: {
        type: Number,
        required: true,
    },
    year: {
        type: Number, // Extracted from the date
        default: () => new Date().getFullYear(),
    },
    month: {
        type: Number, // Extracted from the date
        default: () => new Date().getMonth() + 1, // Months are 0-indexed in JavaScript
    },
    day: {
        type: Number, // Extracted from the date
        default: () => new Date().getDate(),
    },
    id: {
        type: String,
        default: mongoose.Types.ObjectId, // Generate a unique ID for each cost
    },
});

/**
 * Cost Model for MongoDB
 * @type {mongoose.Model<Cost>}
 */
const Cost = mongoose.model('Cost', CostsSchema);

module.exports = Cost;
