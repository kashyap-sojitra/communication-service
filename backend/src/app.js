const express = require('express');
const cors = require('cors');
const messageRoutes = require('./routes/messageRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// --- Middleware ---
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Health Check ---
app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Communication Service API is running 🚀' });
});

// --- Routes ---
app.use('/api', messageRoutes);

// --- 404 Handler ---
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

// --- Global Error Handler ---
app.use(errorHandler);

module.exports = app;
