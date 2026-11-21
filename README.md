# Sweety – Blood Glucose Tracker

A modern healthcare web app that helps diabetes patients record blood glucose readings and monitor daily and monthly health trends.

**Language:** JavaScript throughout (`.js` / `.jsx` only — no TypeScript).

## Current milestone progress

- **Milestone 1:** Animated healthcare landing page
- **Milestone 2:** Authentication UI (login + registration screens with client-side validation)
- **Milestone 3:** Express backend initialization and PostgreSQL setup

Prisma schema, auth APIs, and frontend–backend auth wiring come in later milestones.

### Prerequisites

- Node.js 20+
- npm 9+
- Docker Desktop (recommended for local PostgreSQL)

### 1. Start PostgreSQL

Make sure **Docker Desktop is running**, then from the project root:

```bash
docker compose up -d
```

This starts a Postgres 16 container named `sweety-postgres` with:

- Database: `sweety_db`
- User: `sweety`
- Password: `sweety_dev_password`
- Port: `5432`

Stop it later with:

```bash
docker compose down
```

### 2. Run the backend

```bash
cd backend
copy .env.example .env
npm install
npm run dev
```

API base URL: `http://localhost:5000`

Useful checks:

- `GET http://localhost:5000/api/health` — API is up
- `GET http://localhost:5000/api/health/db` — PostgreSQL connection
- `npm run db:check` — CLI connection test

### 3. Run the frontend

```bash
cd frontend
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

### Production frontend build check

```bash
cd frontend
npm run build
```
