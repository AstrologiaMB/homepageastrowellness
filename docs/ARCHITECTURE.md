# Architecture Documentation

## Table of Contents

1. [Overview](#overview)
2. [System Architecture](#system-architecture)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Data Flow](#data-flow)
6. [Security](#security)
7. [Scalability](#scalability)
8. [Deployment](#deployment)

---

## Overview

The Astrowellness platform is a Next.js-based web application that provides astrology services including natal charts, draconic charts, horary charts, synastry charts, and astro-gematria analysis. The platform follows a modern architecture with clear separation of concerns between frontend, API, and data layers.

### Key Principles

- **Separation of Concerns**: Clear boundaries between layers (UI, API, Service, Data)
- **Type Safety**: Comprehensive TypeScript usage with strict type checking
- **Error Handling**: Standardized error handling across the application
- **Internationalization**: Multi-language support with i18n foundation
- **Scalability**: Modular architecture designed for growth
- **Maintainability**: Clean code practices and comprehensive documentation

---

## System Architecture

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         Frontend Layer                           │
├─────────────────────────────────────────────────────────────────┤
│  Client Components  │  UI Components  │  Custom Hooks            │
│  - Feature Pages    │  - Reusable UI  │  - Data Fetching         │
│  - Auth Pages       │  - Layout       │  - State Management      │
│  - Chart Pages      │  - Providers    │  - Form Handling         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                          API Layer                               │
├─────────────────────────────────────────────────────────────────┤
│  API Routes  │  Middleware  │  Validation  │  Response Utils    │
│  - Auth      │  - Auth       │  - Zod       │  - Standard Format │
│  - Charts    │  - Rate Limit │  - Schemas   │  - Error Handling  │
│  - Calendar  │  - Error      │              │  - Pagination      │
│  - Users     │  - Logging    │              │                    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Service Layer                             │
├─────────────────────────────────────────────────────────────────┤
│  Auth Service  │  Subscription Service  │  Astrology Service     │
│  - Login       │  - Create             │  - Calculate Chart     │
│  - Register    │  - Update             │  - Get Interpretation  │
│  - Reset Pwd   │  - Cancel             │  - Get Calendar        │
│                │  - Check Entitlement  │                        │
├─────────────────────────────────────────────────────────────────┤
│  User Service  │  Cache Service         │  Email Service         │
│  - Get User    │  - Get/Set             │  - Send Emails         │
│  - Update      │  - Invalidate         │  - Templates           │
│  - Delete      │                        │                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                         Data Layer                               │
├─────────────────────────────────────────────────────────────────┤
│  Prisma ORM  │  PostgreSQL Database  │  External APIs           │
│  - Models    │  - Users              │  - Astrology API        │
│  - Queries   │  - Subscriptions      │  - Geocoding API         │
│  - Migrations│  - Charts             │  - Stripe API           │
│              │  - Calendars          │                         │
└─────────────────────────────────────────────────────────────────┘
```

### Layer Responsibilities

#### Frontend Layer
- **Client Components**: Feature-specific page components that handle user interactions
- **UI Components**: Reusable UI components (buttons, cards, modals, etc.)
- **Custom Hooks**: Reusable logic for data fetching, state management, and form handling

#### API Layer
- **API Routes**: Next.js API route handlers that receive and respond to HTTP requests
- **Middleware**: Request processing (authentication, rate limiting, error handling)
- **Validation**: Input validation using Zod schemas
- **Response Utils**: Standardized response formatting and error handling

#### Service Layer
- **Business Logic**: Core application logic separated from API routes
- **Data Transformation**: Converting raw data to domain models
- **External API Integration**: Communicating with third-party services
- **Cache Management**: Managing application caching strategies

#### Data Layer
- **Prisma ORM**: Database access and query building
- **PostgreSQL**: Primary data storage
- **External APIs**: Integration with astrology, geocoding, and payment services

---

## Technology Stack

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Context, React Hooks
- **Forms**: React Hook Form
- **Internationalization**: Custom i18n implementation

### Backend
- **Runtime**: Node.js
- **API**: Next.js API Routes
- **Authentication**: NextAuth.js
- **Validation**: Zod
- **Email**: Nodemailer

### Database
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Migrations**: Prisma Migrate

### External Services
- **Payment**: Stripe
- **Astrology**: External astrology calculation API
- **Geocoding**: OpenStreetMap Nominatim API

### Development Tools
- **Package Manager**: npm/pnpm
- **Linting**: ESLint
- **Formatting**: Prettier
- **Testing**: Jest, React Testing Library, Vitest
- **Version Control**: Git

---

## Project Structure

```
homepageastrowellness/
├── app/                          # Next.js App Router
│   ├── api/                     # API routes
│   │   ├── auth/                # Authentication endpoints
│   │   ├── cartas/              # Chart calculation endpoints
│   │   ├── calendario/          # Calendar endpoints
│   │   ├── astrogematria/       # Astro-gematria endpoints
│   │   ├── user/                # User management endpoints
│   │   ├── stripe/              # Stripe payment endpoints
│   │   └── webhooks/            # Webhook handlers
│   ├── auth/                    # Authentication pages
│   ├── cartas/                  # Chart pages
│   ├── calendario/              # Calendar pages
│   ├── astrogematria/           # Astro-gematria pages
│   ├── components/              # Server components
│   └── layout.tsx               # Root layout
├── auth/                        # Authentication logic
│   ├── services/                # Auth service
│   ├── types/                   # Auth types
│   └── utils/                   # Auth utilities
├── components/                  # React components
│   ├── ui/                      # Reusable UI components
│   ├── features/                # Feature-specific components
│   ├── layout/                  # Layout components
│   └── providers/               # Context providers
├── hooks/                       # Custom React hooks
├── lib/                         # Utility libraries
│   ├── utils/                   # Utility functions
│   ├── errors/                  # Error handling
│   ├── constants/               # Application constants
│   ├── validation/              # Validation schemas
│   ├── services/                # Business logic services
│   └── [other libs]             # Other utility libraries
├── middleware/                  # Middleware functions
├── services/                    # Business logic services
├── types/                       # TypeScript type definitions
├── locales/                     # Translation files
├── tests/                       # Test files
├── docs/                        # Documentation
├── prisma/                      # Prisma ORM
│   ├── schema.prisma            # Database schema
│   └── migrations/              # Database migrations
├── public/                      # Static assets
├── plans/                       # Planning documents
└── [config files]               # Configuration files
```

---

## Data Flow

### Request Flow

```
Client Request
    │
    ▼
Middleware Layer
    │
    ├─► Authentication Check
    ├─► Rate Limiting
    ├─► Logging
    │
    ▼
Validation Layer
    │
    ├─► Input Validation (Zod)
    │
    ▼
API Route Handler
    │
    ├─► Cache Check (if applicable)
    │   │
    │   ├─► Cache Hit → Return Cached Data
    │   │
    │   └─► Cache Miss → Service Layer
    │
    ▼
Service Layer
    │
    ├─► Business Logic
    ├─► Data Transformation
    ├─► External API Calls
    │
    ▼
Data Layer
    │
    ├─► Prisma ORM
    ├─► Database Query
    │
    ▼
Response
    │
    ├─► Format Response
    ├─► Update Cache (if applicable)
    │
    ▼
Client Response
```

### Authentication Flow

```
User Login
    │
    ▼
POST /api/auth/[...nextauth]
    │
    ├─► Validate Credentials
    │   │
    │   ├─► Invalid → Return Error
    │   │
    │   └─► Valid → Create Session
    │
    ▼
NextAuth.js Session
    │
    ├─► Generate JWT Token
    ├─► Set Session Cookie
    │
    ▼
Redirect to Dashboard
```

### Chart Calculation Flow

```
User Request Chart
    │
    ▼
POST /api/cartas/tropical
    │
    ├─► Validate Input
    │   ├─► Birth Date
    │   ├─► Location
    │   └─► User Authentication
    │
    ▼
Service Layer
    │
    ├─► Check Subscription
    │   ├─► Free → Basic Chart
    │   └─► Premium → Full Chart
    │
    ├─► Call Astrology API
    │
    ├─► Process Response
    │
    ├─► Cache Result
    │
    ▼
Return Chart Data
```

---

## Security

### Authentication
- **NextAuth.js**: Session-based authentication
- **JWT Tokens**: Secure token-based authentication
- **Password Hashing**: bcrypt for password storage
- **Session Management**: Secure cookie handling

### Authorization
- **Role-Based Access Control**: User roles and permissions
- **Route Protection**: Middleware for protected routes
- **API Protection**: Authentication middleware for API routes

### Data Protection
- **Input Validation**: Zod schemas for all inputs
- **SQL Injection Prevention**: Prisma ORM parameterized queries
- **XSS Prevention**: React's built-in XSS protection
- **CSRF Protection**: NextAuth.js CSRF tokens

### Secrets Management
- **Environment Variables**: All sensitive data in environment variables
- **No Hardcoded Secrets**: No secrets in code
- **Secure Storage**: Secrets stored securely in deployment environment

### API Security
- **Rate Limiting**: Prevent abuse and DDoS attacks
- **CORS**: Configured for allowed origins only
- **HTTPS**: All communication over HTTPS
- **API Key Management**: Secure handling of third-party API keys

---

## Scalability

### Database Scalability
- **Connection Pooling**: Prisma connection pooling
- **Query Optimization**: Efficient queries and indexing
- **Caching**: Redis for frequently accessed data
- **Read Replicas**: Potential for read scaling

### Application Scalability
- **Stateless API**: API routes are stateless
- **Horizontal Scaling**: Can deploy multiple instances
- **Load Balancing**: Can be load balanced
- **CDN**: Static assets served via CDN

### Performance Optimization
- **Code Splitting**: Next.js automatic code splitting
- **Image Optimization**: Next.js Image component
- **Lazy Loading**: Components and routes loaded on demand
- **Caching**: Multiple caching layers (API, database, CDN)

---

## Deployment

### Deployment Strategy
- **Platform**: Fly.io (current deployment)
- **CI/CD**: GitHub Actions (to be implemented)
- **Environment**: Production, Staging, Development

### Deployment Process
1. Code pushed to main branch
2. Automated tests run
3. Build process creates production bundle
4. Deploy to Fly.io
5. Database migrations run
6. Health checks verify deployment

### Environment Variables
Required environment variables for production:
- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_SECRET`: NextAuth secret key
- `NEXTAUTH_URL`: Application URL
- `STRIPE_SECRET_KEY`: Stripe API secret key
- `STRIPE_WEBHOOK_SECRET`: Stripe webhook secret
- `EMAIL_*`: Email service configuration
- `ASTROLOGY_API_KEY`: External astrology API key

---

## Monitoring and Logging

### Logging
- **Structured Logging**: JSON-formatted logs
- **Log Levels**: Error, Warn, Info, Debug
- **Request Tracing**: Request IDs for tracing
- **Error Tracking**: Centralized error tracking (to be implemented)

### Monitoring
- **Health Checks**: Endpoint health monitoring
- **Performance Metrics**: Response times, error rates
- **Uptime Monitoring**: Service availability monitoring
- **Database Monitoring**: Query performance, connection pool

---

## Future Improvements

### Short Term
- Implement comprehensive test coverage
- Add API rate limiting
- Implement Redis caching
- Set up CI/CD pipeline
- Add error tracking (Sentry)

### Medium Term
- Implement GraphQL API
- Add real-time features (WebSocket)
- Implement advanced caching strategies
- Add performance monitoring (APM)
- Implement feature flags

### Long Term
- Microservices architecture for specific features
- Event-driven architecture
- Advanced analytics and reporting
- Machine learning integration for predictions
- Multi-region deployment

---

## Related Documentation

- [API Documentation](./API.md)
- [Database Documentation](./DATABASE.md)
- [Development Guide](./DEVELOPMENT.md)
- [Coding Standards](./CODING_STANDARDS.md)
- [Migration Guide](./MIGRATION_GUIDE.md)
