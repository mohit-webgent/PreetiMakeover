# Preeti Makeover — Premium Salon & Makeover Studio

> **Tagline:** Your Beauty Is Our Duty.  
> **Owner:** Preeti Mandal  
> **Location:** D/109, Gali No. 5, Prince Colony, Harinagar, Jaitpur, Badarpur, New Delhi – 110044  
> **Contact:** +91 88103 59438 | preetimakeoverpm@gmail.com  
> **Studio Hours:** 10:00 AM – 9:00 PM (Weekly off: Tuesday)  
> **Portfolio Product by:** Webgent

---

## 1. Project Overview

A production-ready web application and appointment enquiry platform for **Preeti Makeover**, designed with an editorial luxury aesthetic (Deep Plum, Champagne Gold, Warm Ivory, and Rose Blush).

### Architecture Stack
* **Frontend:** React 18, Vite, Tailwind CSS, Lucide React
* **Backend:** Node.js, Express.js, Helmet, CORS, Rate Limiter
* **Database & ORM:** PostgreSQL 18 with Prisma ORM 5.22
* **Validation & Security:** Strict Indian mobile format validation (`/^[6-9]\d{9}$/`), Tuesday appointment blackout enforcement, honeypot spam traps, IP rate limiting.

---

## 2. Directory Structure

```
pm/
├── client/              # React + Vite + Tailwind CSS frontend
│   ├── src/
│   │   ├── components/  # Reusable UI & section components
│   │   ├── App.jsx      # Root component
│   │   ├── main.jsx     # App entry
│   │   └── index.css    # Tailwind luxury tokens & custom styles
│   ├── index.html       # SEO metadata & Google Fonts
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
├── server/              # Express.js REST API & Prisma
│   ├── prisma/
│   │   ├── schema.prisma # PostgreSQL data models
│   │   └── seed.js       # Verified service catalog seed script
│   ├── src/
│   │   ├── app.js       # Express app configuration & middleware
│   │   └── index.js     # Server entry point
│   ├── .env.example     # Environment template with zero secrets
│   └── package.json
└── README.md
```

---

## 3. Local Development Setup

### Prerequisites
* Node.js v20+ (tested on Node.js v23.0.0)
* npm v10+
* PostgreSQL 16+ (tested on PostgreSQL 18.6)

### Server Setup
1. Open a terminal in `./server`:
   ```bash
   cd server
   npm install
   ```
2. Copy environment template:
   ```bash
   cp .env.example .env
   ```
3. Update `DATABASE_URL` in `.env` with your local PostgreSQL password:
   ```env
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/preeti_makeover?schema=public"
   ```
4. Run migrations and seed data (Phase 2):
   ```bash
   npx prisma migrate dev --name init
   npm run seed
   ```
5. Start development server:
   ```bash
   npm run dev
   # Server runs on http://localhost:5000
   # Health check at http://localhost:5000/api/health
   ```

### Client Setup
1. Open a terminal in `./client`:
   ```bash
   cd client
   npm install
   ```
2. Start Vite development server:
   ```bash
   npm run dev
   # Client runs on http://localhost:5173
   # Proxies /api requests to http://localhost:5000
   ```

---

## 4. Security & Compliance Rules
1. **Secrets:** `.env` files are ignored by git; secrets are never committed.
2. **Tuesday Blackout Rule:** Salon is closed on Tuesdays. Frontend blocks Tuesday selection; backend strictly rejects requests for Tuesday dates with HTTP 422.
3. **No Fabricated Pricing:** Unverified services display as *"Price on Consultation"*.
4. **Enquiry vs Confirmation:** Appointment requests are logged as `PENDING` enquiries with WhatsApp follow-up link; no false slot guarantees.
