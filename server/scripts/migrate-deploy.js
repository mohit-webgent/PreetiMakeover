/**
 * Safe `prisma migrate deploy` for Render builds.
 * If the database already has tables but no migration history (created earlier with `prisma db push`),
 * Prisma fails with P3005. In that case we baseline the initial migration once and retry; later
 * migrations are written idempotently so they apply cleanly on top.
 */
const { execSync } = require('child_process');

const INIT_MIGRATION = '20261022073457_init';
const run = (cmd) => execSync(cmd, { stdio: 'pipe', encoding: 'utf8' });

function deploy() {
  const out = run('npx prisma migrate deploy');
  process.stdout.write(out);
}

try {
  deploy();
} catch (err) {
  const output = `${err.stdout || ''}${err.stderr || ''}`;
  if (!output.includes('P3005')) {
    process.stderr.write(output);
    process.exit(1);
  }
  console.log(`[migrate] Existing schema without migration history detected — baselining ${INIT_MIGRATION}...`);
  try {
    process.stdout.write(run(`npx prisma migrate resolve --applied ${INIT_MIGRATION}`));
    deploy();
  } catch (retryErr) {
    process.stderr.write(`${retryErr.stdout || ''}${retryErr.stderr || ''}`);
    process.exit(1);
  }
}
