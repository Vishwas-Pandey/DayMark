# DayMark

A personal productivity app: tasks, habits, goals, a calendar, a daily journal, analytics, and an AI chat assistant that uses your own data as context.

Live demo: https://day-mark-five.vercel.app

## What it does

- **Tasks**: create, edit, complete, archive and restore tasks; bulk update/delete; search.
- **Habits**: daily/weekly/monthly habits, completion tracking with undo, pause/resume, per-habit history and stats (streaks).
- **Goals, calendar events, journal entries**: CRUD with per-user ownership.
- **Analytics**: summary, trends and an activity heatmap built from your tasks and habits.
- **AI assistant**: chat that adds a summary of your open tasks, active habits and goals to the prompt and sends it to an LLM provider. The provider is set by `AI_PROVIDER` (Gemini, OpenAI, Anthropic, OpenRouter, or `MOCK` for offline development).
- **Auth**: register/login with bcrypt-hashed passwords, short-lived JWT access tokens and an httpOnly refresh-token cookie with rotation.

## Tech stack

| Layer | Tools |
| --- | --- |
| Frontend | React 18, Vite, React Router, TanStack Query, Tailwind CSS, Framer Motion, Recharts |
| Backend | Node.js 20, Express 5, Mongoose 9, Zod, Pino |
| Database | MongoDB |
| Tests | Vitest, Supertest, mongodb-memory-server |
| CI | GitHub Actions (backend tests + frontend build) |

## How it's organized

```
backend/src
  app.js                 Express app: helmet, CORS, rate limit (production), body limits, Mongo sanitize, routes, error handler
  server.js              Connects to MongoDB, initializes the AI provider, starts the HTTP server
  api/v1/index.js        Mounts every module under /api/v1
  common/                Error classes, ApiResponse envelope, validation middleware (Zod), request context + logging
  config/env.js          Validates environment variables with Zod at startup
  modules/<feature>/     routes -> controller -> service -> repository -> model, one folder per feature
  modules/ai/            Context collection, conversation manager, provider adapters
web/src
  api/                   Axios client and one file per backend module
  hooks/                 TanStack Query hooks wrapping the API
  pages/, features/      Screens and landing-page sections
```

Every request goes through a Zod `validate()` middleware, then an `authenticate` middleware that verifies the access token and loads the user. Every repository query is scoped by `userId`, so users can't read each other's data (covered by a test).

## Running locally

Requirements: Node 20+ and a MongoDB instance (local or Atlas).

```bash
# backend
cd backend
cp .env.example .env      # set MONGO_URI, JWT_SECRET, JWT_REFRESH_SECRET
npm install
npm run dev               # http://localhost:8000/api/v1

# frontend (new terminal)
cd web
npm install
npm run dev               # http://localhost:5173
```

The frontend reads `VITE_API_URL` and falls back to `http://localhost:8000/api/v1`.

With Docker: `JWT_SECRET=... JWT_REFRESH_SECRET=... docker compose up --build` starts MongoDB, the API on port 8000 and the frontend on port 80.

## Tests

```bash
cd backend
npm test
```

26 API tests run against an in-memory MongoDB, so no database setup is needed. They cover auth (register, login, refresh, `/me`, validation, wrong password), task CRUD and state changes, cross-user isolation, habits (create, complete, pause/resume, validation), the AI chat endpoints with the mock provider, the AI prompt context (only your own data), health checks and 404 handling.

## Known limitations

- AI conversations are kept in process memory, so they're lost on restart and not shared across instances. Next step: persist them in MongoDB.
- There are no frontend tests yet. CI only checks that the frontend builds.
- The ESLint configs use the legacy `.eslintrc` format, which ESLint 10 no longer reads. They need migrating to the flat `eslint.config.js`.
- Some backend modules (goals, calendar, journal, analytics) don't have tests yet.
