const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Connect to MongoDB Atlas
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};
connectDB();

// Initialize Express app
const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Import routes
const userRoutes = require('./routes/userRoutes');
const costRoutes = require('./routes/costRoutes');

// Use routes
app.use('/api', userRoutes);
app.use('/api', costRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to Cost Manager!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

