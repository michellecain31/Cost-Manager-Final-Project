// Michelle Cain Segev Cohen

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Load environment variables
dotenv.config();

const app = express();

/**
 * Middleware setup
 */
app.use(logger('dev')); // Log HTTP requests
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded request bodies
app.use(cookieParser()); // Parse cookies

/**
 * Connect to MongoDB Atlas
 */
mongoose
    .connect(process.env.MONGO_URI) // Ensure the connection URI is set in the .env file
    .then(() => console.log('MongoDB Connected'))
    .catch((error) => {
        console.error('MongoDB Connection Error:', error.message);
        process.exit(1);
    });

// Import routes
const userRoutes = require('./routes/userRoutes');       // User-related routes
const aboutRoutes = require('./routes/aboutRoutes');     // Developer team information routes
const costRoutes = require('./routes/costRoutes');       // Cost management routes
const reportRoutes = require('./routes/reportRoutes');   // Report generation routes

/**
 * Route for the home page
 */
app.get('/', (req, res) => {
    res.send('Welcome to the Cost Manager API!');
});

// Use routes
app.use('/api/users', userRoutes);       // User-related endpoints
app.use('/api/about', aboutRoutes);     // Developers' information endpoint
app.use('/api/addcost', costRoutes);    // Cost addition endpoints
app.use('/api/report', reportRoutes);   // Monthly report endpoints

/**
 * Catch 404 and forward to error handler
 */
app.use((req, res, next) => {
    next(createError(404)); // Create a 404 error if route not found
});

/**
 * Error handler
 * @param {Object} err - Error object
 * @param {Object} req - HTTP request object
 * @param {Object} res - HTTP response object
 * @param {Function} next - Next middleware function
 */
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.json({ error: res.locals.message });
});

// Export the app for testing
module.exports = app;

/**
 * Start the server if not in test mode
 */
if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}
