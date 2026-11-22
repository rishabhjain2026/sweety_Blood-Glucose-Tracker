# Sweety – Blood Glucose Tracker

Sweety is a full-stack web application that helps users record, manage, and monitor their blood glucose readings. Users can securely create an account, log in, add glucose readings, update or delete records, and view reports based on their readings.

## Features

- User registration and login.
- Secure password hashing using bcrypt.
- JWT-based authentication.
- Add, view, update, and delete glucose readings.
- Four daily reading slots:
  - Morning (Fasting)
  - After Breakfast
  - After Lunch
  - After Dinner
- Glucose value validation (40–600 mg/dl).
- Prevention of duplicate readings for the same time slot and date.
- Maximum of four readings per day.
- Prevention of future-date entries.
- Daily, month-to-date, and previous-month reports.
- Highest, lowest, average, and total reading statistics.
- User-specific reading history.
- Responsive user interface.

## Technology Stack

**Frontend**
- React.js
- Vite
- JavaScript
- Tailwind CSS
- Framer Motion
- Lucide React

**Backend**
- Node.js
- Express.js
- JavaScript
- JWT
- bcrypt

**Database**
- PostgreSQL
- pgAdmin
- Prisma ORM
- Neon PostgreSQL (cloud database)

## Prerequisites

- Node.js 20 or later
- npm
- PostgreSQL
- pgAdmin
- Git

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/rishabhjain2026/sweety_Blood-Glucose-Tracker.git
cd sweety_Blood-Glucose-Tracker
```

### 2. Set up PostgreSQL

Install PostgreSQL and pgAdmin.

1. Start your PostgreSQL server.
2. Open pgAdmin.
3. Create a database named `sweety_db`.
4. Configure the database connection in the backend environment file.

Alternatively, you can use your Neon PostgreSQL database by copying its connection string from the Neon Console.

### 3. Configure and run the backend

Open a terminal and navigate to the backend directory:

```powershell
cd backend
```

Create the environment file:

```powershell
Copy-Item .env.example .env
```

Install dependencies:

```bash
npm install
```

Update `DATABASE_URL` in `backend/.env` with your PostgreSQL or Neon connection string.

Generate Prisma Client:

```bash
npx prisma generate
```

Apply database migrations:

```bash
npx prisma migrate deploy
```

Optionally, insert demo data:

```bash
npm run db:seed
```

Start the backend:

```bash
npm run dev
```

Backend API:

`http://localhost:5000`

### 4. Configure and run the frontend

Open another terminal:

```powershell
cd frontend
```

Create the environment file:

```powershell
Copy-Item .env.example .env
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

Frontend URL:

`http://localhost:5173`

## Environment Variables

### Backend – backend/.env

| Variable | Description |
|---|---|
| PORT | Backend server port |
| NODE_ENV | Application environment |
| DATABASE_URL | PostgreSQL connection string |
| CLIENT_URL | Frontend URL used for CORS |
| JWT_SECRET | Secret used to sign JWT tokens |
| JWT_EXPIRES_IN | JWT token expiration duration |

### Frontend – frontend/.env

| Variable | Description |
|---|---|
| VITE_API_URL | Backend API base URL |

Never commit actual `.env` files, database passwords, or JWT secrets to GitHub.

## Database Management

The project uses Prisma ORM to manage PostgreSQL database models and migrations.

Useful commands:

```bash
npx prisma generate
npx prisma migrate deploy
npx prisma studio
```

Check database connectivity:

```bash
npm run db:check
```

Prisma Studio provides a browser-based interface to view database tables and records.

## API Overview

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Log in |
| GET | /api/auth/me | Get authenticated user |
| GET | /api/readings | Get glucose readings |
| POST | /api/readings | Add a glucose reading |
| PUT | /api/readings/:id | Update a reading |
| DELETE | /api/readings/:id | Delete a reading |
| GET | /api/reports/summary | Get report summary |
| GET | /api/reports?date=YYYY-MM-DD | Get report for a selected date |
| GET | /api/health | Check API health |
| GET | /api/health/db | Check database health |

Protected endpoints require a valid JWT access token in the Authorization header.

## Validation Rules

- Glucose values must be whole numbers between 40 and 600 mg/dl.
- Only one reading is allowed per time slot per day for each user.
- A maximum of four readings can be added per day.
- Future dates are not allowed.
- Users can only access their own readings.

## Testing and Verification

The project does not currently include a dedicated automated test suite.

The following checks can be performed:

**Backend database connection:**

```bash
cd backend
npm run db:check
```

**Frontend production build:**

```bash
cd frontend
npm run build
```

**Manual testing:**

1. Register a new account.
2. Log in with the registered credentials.
3. Add readings for different time slots.
4. Try adding a duplicate reading.
5. Try entering an invalid glucose value.
6. Try adding more than four readings in one day.
7. Try selecting a future date.
8. Edit and delete an existing reading.
9. Check daily and monthly reports.
10. Register another account and verify that users cannot access each other's readings.

## Demo Account

The optional database seed script creates a demo account:

- Email: `demo@sweety.health`
- Password: `SweetyDemo2026!`

Use this account only for development and demonstration purposes.

## Author

**Rishabh Jain**

GitHub: https://github.com/rishabhjain2026
