# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Essential Commands
- `npm run dev` - Start development server on port 3000
- `npm run build` - Generate Prisma client and build for production
- `npm run start` - Run database migrations and start production server
- `npm run lint` / `npm run lint:fix` - Run ESLint (with/without auto-fix)
- `npm run format` / `npm run format:check` - Format code with Prettier

### Testing
- `npm run test` - Run all Vitest tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate coverage report
- `npm run test:unit` - Unit tests only
- `npm run test:integration` - Integration tests
- `npm run test:e2e` - End-to-end tests

### Database
- `npx prisma generate` - Generate Prisma client
- `npx prisma migrate dev` - Apply database migrations in development
- `npx prisma studio` - Open Prisma Studio GUI for database inspection
- `npx prisma seed` - Seed database with initial data

### Microservices
- `./start_services.sh` - Start all 4 Python microservices (ports 8001-8004)
- `./check_services.sh` - Health check all services

## Architecture Overview

**Framework Stack:**
- Next.js 15.2.4 with App Router
- React 19, TypeScript 5
- PostgreSQL with Prisma ORM
- NextAuth.js v4 (Google OAuth)
- Tailwind CSS + shadcn/ui components

**Microservices Architecture:**
The frontend communicates with 4 external Python (FastAPI) microservices:

| Service | Port | Purpose |
|---------|------|---------|
| calculo-carta-natal-api | 8001 | Tropical and Draconic natal charts |
| interpretador-sidebar | 8002 | AI interpretations (RAG + OpenAI) |
| calendario-personal-api | 8003 | Transits and progressed moon |
| astrogematria-api | 8004 | Numerological calculations |

Start services with `./start_services.sh` before development.

## Key Directories

```
app/                          # Next.js App Router
├── (auth)/                   # Authenticated route group
├── cartas/                   # Chart pages
│   ├── tropica/              # Tropical natal charts
│   ├── draconica/            # Draconic charts
│   └── horaria/              # Horary charts
├── calendario/               # Calendar pages
│   ├── general/
│   ├── personal/
│   └── lunar/
├── auth/                     # Login, register pages
├── upgrade/                  # Subscription/upgrade page
└── api/                      # API routes

components/
├── ui/                       # shadcn/ui base components (55 components)
├── landing/                  # Landing page components
├── charts/                   # Chart-specific components
├── forms/                    # Form components
└── client-layout.tsx         # Main layout wrapper

lib/                          # Utilities
├── utils.ts                  # cn() for class merging
├── auth.ts                   # NextAuth configuration
├── subscription.ts           # Subscription logic
└── api/                      # API utilities

services/                     # Business logic layer
prisma/                       # Database schema and migrations
docs/current/                 # Current documentation (start here)
```

## Important Patterns

**Authentication:**
- Client-side via NextAuth.js with Google OAuth
- JWT tokens for microservice communication
- Protected pages use `PremiumGate` and `ProtectedPage` components

**Data Fetching:**
- Server components for static data
- Client components for interactivity
- API routes in `app/api/` for backend integration
- Caching layer for expensive astrological calculations (96% performance improvement)

**Styling:**
- Tailwind CSS with custom animations (twinkle, float, shooting-star)
- Use `cn()` utility from `lib/utils.ts` for class merging
- CSS variables for theming
- Dark mode via `next-themes`

**Code Style:**
- 2-space indentation
- 100 character line limit
- Prettier: single quotes, semicolons, trailing commas (es5)
- ESLint auto-fix and organize imports on save

## Environment Variables

Required in `.env`:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - NextAuth secret
- `NEXTAUTH_URL` - App URL
- `API_CALCULO_CARTA` - Chart calculation service URL
- `API_INTERPRETADOR` - AI interpretation service URL
- `API_CALENDARIO` - Calendar service URL
- `API_ASTROGEMATRIA` - Astrogematria service URL
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` - OAuth credentials
- `AWS_SES_*` (dev) or `RESEND_*` (production) - Email service

## Documentation

- **Main index:** `docs/current/DOCUMENTACION_INDICE.md`
- **Integration guide:** `docs/current/INTEGRACION_SIDEBAR_CALCULO_API_ACTUALIZADA.md`
- **Services docs:** `docs/current/README_SERVICIOS.md`
