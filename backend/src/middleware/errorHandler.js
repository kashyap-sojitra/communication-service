/**
 * Global error handling middleware
 */
const errorHandler = (err, req, res, next) => {
  console.error('🔴 Unhandled Error:', err.stack || err.message);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    error: err.message || 'Internal Server Error',
  });
};

module.exports = errorHandler;
