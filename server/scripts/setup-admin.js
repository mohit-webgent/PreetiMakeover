/**
 * Preeti Makeover — Administrator Setup & Password Reset CLI
 * 
 * Usage:
 *   ADMIN_EMAIL="admin@preetimakeover.com" ADMIN_PASSWORD="your-strong-password" node scripts/setup-admin.js
 */
require('dotenv').config();
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const readline = require('readline');

const prisma = new PrismaClient();

function promptInput(question, isPassword = false) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function main() {
  console.log('========================================================');
  console.log(' Preeti Makeover — Secure Admin Account Setup / Reset');
  console.log('========================================================\n');

  let email = process.env.ADMIN_EMAIL || process.env.INITIAL_ADMIN_EMAIL;
  let password = process.env.ADMIN_PASSWORD || process.env.INITIAL_ADMIN_PASSWORD;

  if (!email && process.stdin.isTTY) {
    email = await promptInput('Enter Administrator Email: ');
  }
  if (!password && process.stdin.isTTY) {
    password = await promptInput('Enter New Admin Password (min 8 chars): ', true);
  }

  if (!email) {
    console.error('ERROR: Admin email must be provided via ADMIN_EMAIL environment variable or interactive prompt.');
    process.exit(1);
  }

  if (!password || password.length < 8) {
    console.error('ERROR: A password of at least 8 characters must be provided via ADMIN_PASSWORD environment variable.');
    process.exit(1);
  }

  const cleanEmail = email.trim().toLowerCase();
  console.log(`Configuring administrator account for: ${cleanEmail}`);

  // Hash password using 12 bcrypt salt rounds
  const passwordHash = await bcrypt.hash(password, 12);

  const admin = await prisma.adminUser.upsert({
    where: { email: cleanEmail },
    update: {
      passwordHash,
      role: 'admin',
      updatedAt: new Date()
    },
    create: {
      email: cleanEmail,
      name: 'Preeti Mandal',
      passwordHash,
      role: 'admin'
    }
  });

  console.log('\nSUCCESS: Administrator credentials configured successfully.');
  console.log(`Account ID: ${admin.id}`);
  console.log('Password hash updated using 12 rounds of bcrypt encryption.');
  console.log('No raw passwords or secrets were printed.\n');
}

main()
  .catch((err) => {
    console.error('Execution error:', err.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
