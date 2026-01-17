# Developer Onboarding Guide

Welcome to the Astrowellness astrology platform! This guide will help you get started with development.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Project Structure](#project-structure)
4. [Development Workflow](#development-workflow)
5. [Common Tasks](#common-tasks)
6. [Testing](#testing)
7. [Debugging](#debugging)
8. [Resources](#resources)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20 or higher)
- **npm** or **pnpm** (we recommend pnpm)
- **Git**
- **VS Code** (recommended) with the extensions listed in [`.vscode/extensions.json`](../.vscode/extensions.json)
- **Docker** (for containerized deployment)

## Environment Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd homepageastrowellness
```

### 2. Install Dependencies

```bash
pnpm install
# or
npm install
```

### 3. Set Up Environment Variables

Copy the example environment file and configure your variables:

```bash
cp .env.example .env
```

Required environment variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/astrowellness"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Email (AWS SES or Resend)
EMAIL_FROM="noreply@astrowellness.com"
AWS_SES_REGION="us-east-1"
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Set Up the Database

Generate Prisma client and run migrations:

```bash
pnpm prisma:generate
pnpm prisma:migrate
```

### 5. Start the Development Server

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
homepageastrowellness/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── cartas/           # Chart calculation pages
│   └── calendario/        # Calendar pages
├── components/            # React components
│   ├── features/          # Feature-specific components
│   ├── layout/            # Layout components
│   ├── providers/         # Context providers
│   └── ui/               # Reusable UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
│   ├── constants/         # Application constants
│   ├── errors/            # Error handling utilities
│   ├── utils/             # Utility functions
│   ├── performance.ts      # Performance monitoring
│   └── debug.ts          # Debugging utilities
├── services/             # Business logic layer
├── types/                # TypeScript type definitions
├── tests/                # Test files
│   ├── unit/             # Unit tests
│   ├── integration/       # Integration tests
│   └── e2e/             # End-to-end tests
├── prisma/               # Database schema and migrations
├── docs/                 # Documentation
└── public/               # Static assets
```

## Development Workflow

### Code Quality Tools

This project uses automated code quality tools:

- **ESLint** - Linting and code quality checks
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Pre-commit file checks

### Pre-Commit Hooks

Before committing, the following checks run automatically:

1. ESLint fixes any issues
2. Prettier formats staged files

### Pre-Push Hooks

Before pushing, the following checks run:

1. TypeScript type checking
2. All tests must pass

### Making Changes

1. Create a new branch for your feature:

```bash
git checkout -b feature/your-feature-name
```

2. Make your changes

3. Run tests and linting:

```bash
pnpm test
pnpm lint
pnpm type-check
```

4. Commit your changes:

```bash
git add .
git commit -m "feat: add new feature"
```

5. Push and create a pull request

## Common Tasks

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run specific test suites
pnpm test:unit
pnpm test:integration
pnpm test:e2e
```

### Linting and Formatting

```bash
# Check for linting issues
pnpm lint

# Fix linting issues
pnpm lint:fix

# Format code
pnpm format

# Check formatting
pnpm format:check
```

### Database Operations

```bash
# Generate Prisma client
pnpm prisma:generate

# Create and run migrations
pnpm prisma:migrate

# Open Prisma Studio
pnpm prisma:studio

# Seed database
pnpm prisma:seed
```

### Building for Production

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## Testing

### Unit Tests

Unit tests are located in `tests/unit/` and test individual functions and components.

```typescript
// Example unit test
import { describe, it, expect } from 'vitest';
import { formatDate } from '@/lib/utils/date.utils';

describe('formatDate', () => {
  it('should format date correctly', () => {
    const date = new Date('2024-01-01');
    expect(formatDate(date)).toBe('January 1, 2024');
  });
});
```

### Integration Tests

Integration tests are located in `tests/integration/` and test API routes and database interactions.

### End-to-End Tests

E2E tests are located in `tests/e2e/` and test complete user flows.

## Debugging

### Using VS Code Debugger

1. Set breakpoints in your code
2. Select a debug configuration from `.vscode/launch.json`
3. Press F5 to start debugging

### Debug Utilities

The project includes debugging utilities in [`lib/debug.ts`](../lib/debug.ts):

```typescript
import { createLogger, measureTime } from '@/lib/debug';

const logger = createLogger('MyComponent');

logger.debug('Debug message');
logger.info('Info message');
logger.warn('Warning message');
logger.error('Error message');

await measureTime('Operation name', async () => {
  // Your async operation here
});
```

### Performance Monitoring

Use the performance utilities in [`lib/performance.ts`](../lib/performance.ts):

```typescript
import { trackPerformance, measureAsync } from '@/lib/performance';

// Track performance
const tracker = trackPerformance('API Request');
// ... do work
tracker.stop();

// Measure async operation
const result = await measureAsync('Database Query', async () => {
  return await db.user.findMany();
});
```

## Resources

### Documentation

- [Architecture Overview](ARCHITECTURE.md)
- [API Documentation](API.md)
- [Database Schema](DATABASE.md)
- [Development Guide](DEVELOPMENT.md)
- [Component Documentation](COMPONENTS.md)
- [Coding Standards](CODING_STANDARDS.md)
- [Migration Guide](MIGRATION_GUIDE.md)
- [Troubleshooting Guide](TROUBLESHOOTING.md)
- [Debugging Guide](DEBUGGING.md)
- [Performance Guide](PERFORMANCE.md)

### External Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## Getting Help

If you encounter any issues:

1. Check the [Troubleshooting Guide](TROUBLESHOOTING.md)
2. Search existing GitHub issues
3. Create a new issue with detailed information

## Next Steps

Now that you're set up, explore the codebase and start contributing! Check the [Contributing Guidelines](../CONTRIBUTING.md) for more information on how to contribute.
