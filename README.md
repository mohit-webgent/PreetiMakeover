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
├── client/                      React 18 + Vite + Tailwind (deployed on Vercel)
│   ├── src/pages/               Route pages (Home, Services, Bridal, Gallery, About, Contact, Admin)
│   ├── src/components/          layout/ · sections/ · common/ (animations) · admin/
│   ├── src/services/api.js      Single API client — every backend call goes through here
│   └── vercel.json              Proxies /api and /uploads to the Render backend
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
        ├── services/storage.js  Image storage: Cloudinary in prod, local ./uploads in dev
        └── utils/               validators · httpError (HttpError + asyncHandler) · whatsappHelper
```

**Request flow:** `route → middleware (rate limit, auth, upload) → controller → Prisma`. Controllers throw
`HttpError` or call `next(err)`; `middleware/errorHandler.js` turns every error (incl. Prisma, Multer,
bad JSON) into a consistent `{ success: false, message }` response.

### API overview
| Area | Public | Admin (Bearer JWT) |
|---|---|---|
| Services | `GET /api/services`, `/services/:slug` | `GET/POST/PUT/DELETE /api/admin/services`, `POST/PUT/DELETE /api/admin/categories` |
| Appointments | `POST /api/appointments` | `GET /api/admin/appointments`, `PATCH …/:id/status` |
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
```

Schema changes: edit `prisma/schema.prisma`, then `npm run db:migrate -- --name <change>` and commit the new migration folder.

## 4. Deployment

**Render (server)** — Root directory `server`
- Build command: `npm install && npm run build` (runs `prisma generate` + a safe `prisma migrate deploy` that auto-baselines databases created with `db push`)
- Start command: `npm start`
- Env: `NODE_ENV=production`, `DATABASE_URL`, `JWT_SECRET` (≥32 chars), `CLIENT_URL` (Vercel URL), `CLOUDINARY_URL`

**Vercel (client)** — Root directory `client`, framework Vite. No env vars needed.

---

## 5. Security & Compliance Rules
1. **Secrets:** `.env` files are ignored by git; secrets are never committed.
2. **Tuesday Blackout Rule:** Salon is closed on Tuesdays. Frontend blocks Tuesday selection; backend strictly rejects requests for Tuesday dates with HTTP 422.
3. **No Fabricated Pricing:** Unverified services display as *"Price on Consultation"*.
4. **Enquiry vs Confirmation:** Appointment requests are logged as `PENDING` enquiries with WhatsApp follow-up link; no false slot guarantees.
