const { config, assertProductionConfig, isLocalDatabase } = require('./config/env');
const app = require('./app');
const prisma = require('./db');

async function startServer() {
  assertProductionConfig();

  // Only try to auto-start PostgreSQL for a local development database.
  if (!config.isProduction && isLocalDatabase()) {
    try {
      const { ensureDatabaseRunning } = require('../scripts/ensure-db');
      await ensureDatabaseRunning();
    } catch (err) {
      console.warn('[Database] Pre-flight DB check warning:', err.message);
    }
  }

  const server = app.listen(config.port, () => {
    console.log('===============================================');
    console.log(' Preeti Makeover Backend Service');
    console.log(` Running on:  http://localhost:${config.port}`);
    console.log(` Healthcheck: http://localhost:${config.port}/api/health`);
    console.log(` Environment: ${config.nodeEnv}`);
    console.log('===============================================');
  });

  const shutdown = (signal) => {
    console.log(`Received ${signal}. Shutting down gracefully...`);
    server.close(async () => {
      await prisma.$disconnect().catch(() => {});
      process.exit(0);
    });
    setTimeout(() => process.exit(1), 10000).unref();
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

startServer().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
