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

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating a schema for users in MongoDB
const UsersSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    marital_status: {
        type: String,
        required: true
    },
    totalCost: {
        type: Number,
        default: 0 // Computed total costs
    }
});

const User = mongoose.model('User', UsersSchema);

// Define default user properties
const defaultUser = {
    id: '123123',
    first_name: 'John',
    last_name: 'Doe',
    birthday: new Date('1990-01-01'),
    marital_status: 'Single',
    totalCost: 0
};

// Function to create a default user if it does not exist
async function createNewUser() {
    try {
        // Check if a user with the default ID exists
        const currentUser = await User.findOne({ id: defaultUser.id });
        if (currentUser) {
            console.log(`Current user: ${currentUser}`);
            return currentUser;
        }
        // If no user exists, create the default user
        const newUser = await User.create(defaultUser);
        console.log(`New user created: ${newUser}`);
    } catch (error) {
        console.error('Error creating user:', error);
    }
}

// Check for or create the default user when the program starts
createNewUser()
    .then(() => console.log('User check complete'))
    .catch((error) => console.error('User creation failed:', error));

module.exports = User;
