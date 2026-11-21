# Sweety — Blood Glucose Tracker

Sweety is a JavaScript full-stack app for recording personal blood glucose readings and reviewing daily, month-to-date, and previous-month reports. It uses React, Vite, Tailwind CSS, Express, PostgreSQL, and Prisma.

## Requirements

- Node.js 20 or later and npm
- Docker Desktop (for the included PostgreSQL service)

## Setup

1. Start PostgreSQL from the repository root:

   ```sh
   docker compose up -d
   ```

2. Configure and start the API:

   ```sh
   cd backend
   cp .env.example .env
   npm install
   npx prisma generate
   npx prisma migrate deploy
   npm run db:seed       # optional demo account and readings
   npm run dev
   ```

   On Windows PowerShell, use `Copy-Item .env.example .env` in place of `cp`.
   `DATABASE_URL` defaults to the local Docker database on host port `55432` (mapped to PostgreSQL's container port `5432`) to avoid conflicts with other local Postgres servers. Set `JWT_SECRET` to a long random value in production. The development server creates an ephemeral signing secret if none is configured; existing tokens then expire when the server restarts.

3. Configure and start the frontend in another terminal:

   ```sh
   cd frontend
   cp .env.example .env
   npm install
   npm run dev
   ```

   Open the Vite URL shown in the terminal, normally `http://localhost:5173`.

## Demo account

The optional seed creates `demo@sweety.health` with password `SweetyDemo2026!` and a few recent readings. Change the password before using seeded accounts outside local development.

## API overview

- `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- `GET|POST /api/readings`, `PUT|DELETE /api/readings/:id`
- `GET /api/reports/summary`, `GET /api/reports?date=YYYY-MM-DD`
- `GET /api/health`, `GET /api/health/db`

Authenticated endpoints require `Authorization: Bearer <token>`. Reading queries and mutations are scoped to the authenticated user. Reading values, supported time slots, duplicate daily slots, four-per-day limits, and future dates are validated by the API and database constraints.

## Tests and checks

There is no automated test suite in the starter project. Useful local checks:

```sh
cd backend
npm run db:check
```

```sh
cd frontend
npm run build
```

For a manual API walkthrough, register a new account, create four different time-slot readings on one date, try a duplicate and a fifth reading, change the date to tomorrow, edit and delete a reading, and review the daily/monthly reports. Create a second account to confirm reading histories remain isolated.

## Submission notes

- The frontend is JavaScript/JSX; the API and Prisma seed are JavaScript.
- Authentication is a bearer JWT. Signing out removes it from the browser; tokens expire according to `JWT_EXPIRES_IN`.
- Reports show empty states when a date range has no readings. All report queries are scoped to the signed-in account.
- For screenshots, capture the landing page, dashboard with summary cards, reading form/history, and reports with a chosen date. A short demo can show registration, adding/editing a reading, and switching report periods.
- Future improvements: automated integration tests, refresh-token rotation with secure cookies, and clinician-approved target ranges and interpretation.
