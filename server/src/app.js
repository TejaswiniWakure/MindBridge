const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Initialize DB connection
connectDB();

const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors());

// Logging Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Request Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploads folder statically (if uploads are used)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Load Routes
const authRoutes = require('./routes/authRoutes');
const aiRoutes = require('./routes/aiRoutes');

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);

// Base Status Endpoint
app.get('/api/status', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'MindWell API Server is running smoothly.',
    timestamp: new Date(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Fallback Route Handler (404 Not Found)
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Resource not found: ${req.originalUrl}`
  });
});

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Global Error:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 MindWell Server listening on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode.`);
});

module.exports = app;
