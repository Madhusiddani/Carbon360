const express = require('express');
const cors = require('cors');
const carbonRouter = require('./routes/carbon');

const app = express();

// CORS middleware
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

// Body parser
app.use(express.json());

// Routes
app.use('/api/carbon', carbonRouter);

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'CarbonWise 360 API is running' });
});

// Global error handler
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});

module.exports = app;
