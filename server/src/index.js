require('dotenv').config();
const app = require('./app');
const { ensureDatabaseRunning } = require('../scripts/ensure-db');

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await ensureDatabaseRunning();
  } catch (err) {
    console.warn('[Database] Pre-flight DB check warning:', err.message);
  }

  const server = app.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(` Preeti Makeover Backend Service`);
    console.log(` Running on: http://localhost:${PORT}`);
    console.log(` Healthcheck: http://localhost:${PORT}/api/health`);
    console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`===============================================`);
  });

  // Graceful Shutdown
  const handleShutdown = (signal) => {
    console.log(`Received ${signal}. Shutting down server gracefully...`);
    server.close(() => {
      console.log('HTTP server closed.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => handleShutdown('SIGTERM'));
  process.on('SIGINT', () => handleShutdown('SIGINT'));
}

startServer();
