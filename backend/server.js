require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📡 Health check: http://localhost:${PORT}/health`);
    console.log(`📨 Send API: POST http://localhost:${PORT}/api/send`);
    console.log(`📋 Messages: GET  http://localhost:${PORT}/api/messages`);
  });
};

startServer();
