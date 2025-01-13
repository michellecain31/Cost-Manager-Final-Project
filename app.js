// Michelle Cain

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Load environment variables
dotenv.config();

const app = express();

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Connect to MongoDB Atlas
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch((error) => {
        console.error('MongoDB Connection Error:', error.message);
        process.exit(1);
    });

// Import routes
const indexRoutes = require('./routes/indexRoutes');
const userRoutes = require('./routes/userRoutes');
const costRoutes = require('./routes/costRoutes');
const reportRoutes = require('./routes/reportRoutes');
const aboutRoutes = require('./routes/aboutRoutes');

// Use routes
app.use('/', indexRoutes);
app.use('/api/users', userRoutes);
app.use('/api/addcost', costRoutes);
app.use('/api/report', reportRoutes);
app.use('/api/about', aboutRoutes);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Render the error page
    res.status(err.status || 500);
    res.json({ error: res.locals.message });
});

// Export the app for testing
module.exports = app;

// Start the server only if not in test mode
if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}
