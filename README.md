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

## 2. Architecture

```
pm/
├── client/                      React 18 + Vite + Tailwind + Framer Motion (deployed on Vercel)
│   ├── src/pages/               Route pages (Home eager; Services, Bridal, Gallery, About, Contact, Admin lazy-loaded)
│   ├── src/components/          layout/ (header, tab bar, footer) · sections/ · booking/ (3-step BookingWizard) · common/ (Arch, PageHeader, Seo, Photo, dialogs) · admin/
│   ├── src/context/             SiteDataContext: loads CMS copy, settings, services, reviews, gallery once
│   ├── src/lib/                 business.js (phone/WhatsApp links, hours, open-now) · booking.js (days, slots, .ics)
│   ├── src/config/siteDefaults.js  Fallback business details + the single source of hero stats
│   ├── src/services/api.js      Single API client — every backend call goes through here
│   ├── scripts/optimize-images.mjs  `npm run images`: WebP versions of /public photos + og-preview.jpg share card
│   └── vercel.json              Proxies /api and /uploads to Render · cache + security headers
└── server/                      Express + Prisma + PostgreSQL (deployed on Render)
    ├── prisma/                  schema.prisma · migrations/ · seed.js
    ├── scripts/                 ensure-db.js (local Windows Postgres auto-start) · setup-admin.js
    ├── tests/api.test.js        End-to-end API tests (`npm test`)
    └── src/
        ├── index.js             Boot: validate config → (dev) start local DB → listen → graceful shutdown
        ├── app.js               Express app: helmet, CORS, trust proxy, rate limit, routes, errors
        ├── config/env.js        The ONLY place that reads process.env (validated, fails fast in prod)
        ├── db.js                Shared Prisma client
        ├── routes/              index.js → public.routes.js + admin.routes.js (auth applied once)
        ├── controllers/         Request handlers per domain (services, appointments, admin, content, upload…)
        ├── middleware/          auth · rateLimiters · upload (image whitelist) · errorHandler
        ├── services/            storage (Cloudinary/local) · notifier (owner email/Telegram alerts)
        │                        · settingsService (cached business settings) · cache (public read cache)
        └── utils/               validators · httpError (HttpError + asyncHandler) · whatsappHelper
```

**Single source of truth:** phone, WhatsApp, address, hours and weekly off day live in *Admin → Salon Settings*
and drive the whole site and the booking validation. Hero stats live in *Admin → Website Content → Stats*.

**Request flow:** `route → middleware (rate limit, auth, upload) → controller → Prisma`. Controllers throw
`HttpError` or call `next(err)`; `middleware/errorHandler.js` turns every error (incl. Prisma, Multer,
bad JSON) into a consistent `{ success: false, message }` response.

### Design system (client)
"Rose & gold": calm, eye-friendly, mobile-first. Tokens live in `client/tailwind.config.js`, shared component classes in `client/src/index.css`.

| Token | Value | Use |
|---|---|---|
| `paper` | `#FAF6F5` | page background (rose-tinted pearl, never stark white) |
| `ink` / `ink-soft` / `ink-faint` | `#2A1C24` / `#5E4A55` / `#8B7680` | text 15:1 · secondary 7.5:1 · placeholders only |
| `wine` | `#7D2E4A` | buttons, links, active states |
| `rose` / `line` | `#F1E4E6` / `#EADBDE` | tinted surfaces, hairline borders |
| `gold` | `#A8834F` | fine details from the logo (icons, stars, arch outline) |

- **Type:** Rozha One for large headings only (one weight, never faux-bold), Mukta for everything else. Body text is 17px with a 1.7 line height; nothing goes below 13px. Both fonts cover Hindi.
- **Signature:** the Mughal *jharokha* arch frame (`components/common/Arch.jsx`), used on the home and bridal hero photos only.
- **Mobile:** bottom tab bar (Home · Services · Book · Bridal · Gallery), call/WhatsApp in the header, swipeable rows, captions below photos.
- **Motion:** one hero entrance and feedback to taps (steps, sheets, accordions); everything respects reduced-motion settings.
- **Building blocks:** `container-x`, `section`, `title`, `lead`, `btn-primary` / `btn-secondary` / `btn-wa`, `chip`, `card`, `field`, `PageHeader`, `Photo`.
- The admin panel keeps its own layout; the legacy `salon-*` colour names are aliases of the tokens above.

### API overview
| Area | Public | Admin (Bearer JWT) |
|---|---|---|
| Services | `GET /api/services`, `/services/:slug` | `GET/POST/PUT/DELETE /api/admin/services`, `POST/PUT/DELETE /api/admin/categories` |
| Appointments | `POST /api/appointments` (idempotent per phone + service + day; alerts the owner) | `GET /api/admin/appointments?status=&search=&range=today\|upcoming`, `GET …/export.csv`, `PATCH …/:id/status` |
| Gallery | `GET /api/gallery` | `GET/POST/PUT/DELETE /api/admin/gallery` |
| Testimonials | `GET /api/testimonials`, `POST /api/testimonials` (held for approval) | `GET/POST/PUT/DELETE /api/admin/testimonials` |
| CMS content | `GET /api/content` | `GET /api/admin/content`, `PUT …/:key`, `PUT …/batch/save` |
| Settings | `GET /api/settings` | `PUT /api/admin/settings` |
| Media | – | `POST /api/admin/upload` (JPG/PNG/WebP/GIF, magic-byte checked) |
| Auth | `POST /api/admin/login` | `GET /api/admin/me`, `POST /api/admin/change-password` (revokes other sessions) |

---

## 3. Local Development

```bash
# Backend
cd server
npm install
cp .env.example .env          # set DATABASE_URL
npm run db:deploy             # apply migrations
npm run seed                  # services, settings, initial admin
npm run dev                   # http://localhost:5000  (auto-starts local Postgres on Windows)
npm test                      # end-to-end API tests

# Frontend
cd client
npm install
npm run dev                   # http://localhost:5173  (proxies /api and /uploads)
npm run images                # after adding/replacing photos in public/: regenerates WebP + share image
```

Schema changes: edit `prisma/schema.prisma`, then `npm run db:migrate -- --name <change>` and commit the new migration folder.

## 4. Deployment

**Render (server)** — Root directory `server`
- Build command: `npm install && npm run build` (runs `prisma generate` + a safe `prisma migrate deploy` that auto-baselines databases created with `db push`)
- Start command: `npm start`
- Env: `NODE_ENV=production`, `DATABASE_URL`, `JWT_SECRET` (≥32 chars), `CLIENT_URL` (Vercel URL), `CLOUDINARY_URL`
- **Owner alerts for new bookings** (configure at least one, see `.env.example`):
  - Email: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` (Gmail → App Password), `NOTIFY_EMAIL_TO`
  - Telegram: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`
  - Optional `ADMIN_PANEL_URL` (linked from alert emails)
- **Keep the API warm:** free Render instances sleep after inactivity. Add a free uptime ping
  (e.g. cron-job.org every 10 min) to `https://<render-app>/api/health` so the first visitor never waits.

**Vercel (client)** — Root directory `client`, framework Vite. No env vars needed.

---

## 5. Security & Compliance Rules
1. **Secrets:** `.env` files are ignored by git; secrets are never committed.
2. **Weekly Off Rule:** the weekly off day comes from Settings (Tuesday by default). The booking calendar disables it and the backend rejects it with HTTP 422. Same-day slots less than 30 minutes away and times outside opening hours are rejected too.
3. **No Fabricated Pricing:** Unverified services display as *"Price on Consultation"*.
4. **Enquiry vs Confirmation:** Appointment requests are logged as `PENDING` enquiries with WhatsApp follow-up link; no false slot guarantees.
5. **No Fabricated Social Proof:** only owner-approved reviews are shown (never placeholders). Bundled mood photos are labelled neutrally until the owner uploads the real portfolio.
