const net = require('net');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const PORT = 5432;
const HOST = '127.0.0.1';
// Local PostgreSQL 18 install (also registered as Windows service "postgresql-x64-18").
const PG_DATA = process.env.PG_DATA || 'D:\\Postgres\\data';
const PG_CTL = process.env.PG_CTL || 'D:\\Postgres\\bin\\pg_ctl.exe';
const PG_SERVICE = 'postgresql-x64-18';

function checkPort(port, host, timeout = 1000) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    let isConnected = false;

    socket.setTimeout(timeout);

    socket.once('connect', () => {
      isConnected = true;
      socket.destroy();
      resolve(true);
    });

    socket.once('timeout', () => {
      socket.destroy();
      resolve(false);
    });

    socket.once('error', () => {
      socket.destroy();
      resolve(false);
    });

    socket.connect(port, host);
  });
}

function cleanStalePid() {
  const pidFile = path.join(PG_DATA, 'postmaster.pid');
  if (fs.existsSync(pidFile)) {
    try {
      const content = fs.readFileSync(pidFile, 'utf8');
      const pid = parseInt(content.split('\n')[0].trim(), 10);
      if (pid) {
        try {
          // Check if process with that pid is actually alive
          process.kill(pid, 0);
          // If kill(0) succeeds, process is alive
          return;
        } catch {
          // Process not found, stale pid file
          console.log('[Database] Removing stale postmaster.pid...');
          fs.unlinkSync(pidFile);
        }
      }
    } catch {
      // Ignore read/unlink errors
    }
  }
}

function startPostgres() {
  // Prefer the Windows service; fall back to pg_ctl if that fails (e.g. no admin rights).
  try {
    execSync(`net start ${PG_SERVICE}`, { stdio: 'inherit', windowsHide: true, timeout: 20000 });
    return true;
  } catch {
    console.warn(`[Database] Could not start service ${PG_SERVICE}; trying pg_ctl...`);
  }
  if (!fs.existsSync(PG_CTL)) {
    console.warn(`[Database] pg_ctl not found at: ${PG_CTL}`);
    return false;
  }
  if (!fs.existsSync(PG_DATA)) {
    console.warn(`[Database] pgdata directory not found at: ${PG_DATA}`);
    return false;
  }

  cleanStalePid();

  console.log(`[Database] Starting PostgreSQL server on port ${PORT}...`);
  try {
    execSync(`"${PG_CTL}" -D "${PG_DATA}" start`, {
      stdio: 'inherit',
      windowsHide: true,
      timeout: 15000
    });
    return true;
  } catch (err) {
    console.error('[Database] Failed to execute pg_ctl start:', err.message);
    return false;
  }
}

function shouldManageLocalPostgres() {
  if (process.env.NODE_ENV === 'production' || process.platform !== 'win32') return false;
  try {
    const { hostname } = new URL(process.env.DATABASE_URL || '');
    return ['localhost', '127.0.0.1', '::1'].includes(hostname);
  } catch {
    return false;
  }
}

async function ensureDatabaseRunning() {
  if (!shouldManageLocalPostgres()) {
    // Remote / production database: nothing to start locally.
    return true;
  }

  const isAlreadyRunning = await checkPort(PORT, HOST, 800);
  if (isAlreadyRunning) {
    console.log(`[Database] PostgreSQL is ready on port ${PORT}.`);
    return true;
  }

  console.log(`[Database] PostgreSQL is not running on port ${PORT}. Auto-starting...`);
  startPostgres();

  // Poll until ready (up to 12 seconds)
  const startTime = Date.now();
  const maxWaitMs = 12000;

  while (Date.now() - startTime < maxWaitMs) {
    await new Promise((r) => setTimeout(r, 600));
    const ready = await checkPort(PORT, HOST, 600);
    if (ready) {
      console.log(`[Database] PostgreSQL started and accepting connections on port ${PORT}.`);
      return true;
    }
  }

  console.error(`[Database] Timed out waiting for PostgreSQL on port ${PORT}.`);
  return false;
}

if (require.main === module) {
  ensureDatabaseRunning().then((success) => {
    process.exit(success ? 0 : 1);
  });
}

module.exports = { ensureDatabaseRunning };

