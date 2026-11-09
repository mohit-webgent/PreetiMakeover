const { PrismaClient } = require('@prisma/client');

// Single shared Prisma client (re-used across hot reloads in development).
const prisma =
  global.__prisma ||
  new PrismaClient({
    log: process.env.PRISMA_LOG ? ['query', 'error', 'warn'] : ['error', 'warn']
  });

if (process.env.NODE_ENV !== 'production') global.__prisma = prisma;

module.exports = prisma;
