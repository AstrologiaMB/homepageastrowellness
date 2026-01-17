# Frequently Asked Questions (FAQ)

This document answers common questions about the Astrowellness platform development.

## Table of Contents

1. [Development Questions](#development-questions)
2. [Technical Questions](#technical-questions)
3. [Deployment Questions](#deployment-questions)
4. [Performance Questions](#performance-questions)
5. [Testing Questions](#testing-questions)
6. [Troubleshooting Questions](#troubleshooting-questions)

## Development Questions

### How do I set up my development environment?

Follow the [Onboarding Guide](ONBOARDING.md) for detailed setup instructions:

1. Clone the repository
2. Install dependencies with `pnpm install`
3. Copy `.env.example` to `.env` and configure variables
4. Run `pnpm prisma:generate` and `pnpm prisma:migrate`
5. Start development server with `pnpm dev`

### What's the recommended way to install dependencies?

We recommend using **pnpm** for faster installation and better disk space usage:

```bash
pnpm install
```

You can also use npm:

```bash
npm install
```

### How do I run the development server?

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

### How do I run tests?

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

### How do I lint and format code?

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

### How do I add a new feature?

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make your changes
3. Write tests for your changes
4. Run tests and linting
5. Commit with conventional commit message
6. Push and create a pull request

See [CONTRIBUTING.md](../CONTRIBUTING.md) for detailed guidelines.

## Technical Questions

### What technologies are used in this project?

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Testing**: Vitest and React Testing Library
- **Payment**: Stripe
- **Email**: AWS SES or Resend

### Why use Next.js App Router?

The App Router provides:

- Improved performance with React Server Components
- Better SEO and streaming support
- Simplified data fetching with async components
- Built-in layouts and error handling
- Better TypeScript support

### How do I add a new API route?

Create a new file in `app/api/`:

```typescript
// app/api/my-endpoint/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const data = await fetchData();
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = await processData(body);
  return NextResponse.json(result);
}
```

### How do I add a new page?

Create a new file in `app/`:

```typescript
// app/my-page/page.tsx
export default function MyPage() {
  return <div>My Page Content</div>;
}
```

### How do I use the performance monitoring?

Import utilities from [`lib/performance.ts`](../lib/performance.ts):

```typescript
import { trackPerformance, measureAsync } from '@/lib/performance';

// Track performance
const tracker = trackPerformance('Operation Name');
// ... do work
tracker.stop();

// Measure async operations
const result = await measureAsync('Database Query', async () => {
  return await db.user.findMany();
});
```

### How do I use the debug utilities?

Import utilities from [`lib/debug.ts`](../lib/debug.ts):

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

### How do I handle errors?

Use the error handling utilities from [`lib/errors/`](../lib/errors/):

```typescript
import { AppError, handleError } from '@/lib/errors';

try {
  // Your code here
} catch (error) {
  if (error instanceof AppError) {
    throw error;
  }
  throw new AppError('An unexpected error occurred', 500);
}
```

### How do I add internationalization?

Use the i18n utilities from [`lib/i18n.ts`](../lib/i18n.ts):

```typescript
import { useTranslation } from '@/lib/i18n';

export function MyComponent() {
  const { t } = useTranslation();

  return <div>{t('welcome_message')}</div>;
}
```

## Deployment Questions

### How do I deploy to production?

1. Set production environment variables
2. Run `pnpm build`
3. Deploy the `.next` folder and `public` folder
4. Run `pnpm start` on the production server

See the deployment platform's documentation for specific instructions.

### What environment variables are required?

Required variables:

```env
DATABASE_URL="postgresql://user:password@host:5432/dbname"
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="your-secret-key"
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
EMAIL_FROM="noreply@yourdomain.com"
```

### How do I set up database migrations in production?

```bash
# Generate Prisma client
pnpm prisma:generate

# Apply migrations
pnpm prisma migrate deploy
```

### How do I configure SSL for the database?

Update your `DATABASE_URL` to use SSL:

```env
DATABASE_URL="postgresql://user:password@host:5432/dbname?sslmode=require"
```

## Performance Questions

### How do I optimize page load times?

Follow the [Performance Guide](PERFORMANCE.md) for detailed optimization techniques:

- Use dynamic imports for code splitting
- Optimize images with Next.js Image component
- Implement caching strategies
- Use memoization for expensive computations
- Lazy load components

### How do I monitor application performance?

Use the performance monitoring utilities:

```typescript
import { generatePerformanceReport } from '@/lib/performance';

// Generate performance report
console.log(generatePerformanceReport());
```

### How do I reduce bundle size?

- Use dynamic imports
- Remove unused dependencies
- Enable tree shaking
- Analyze bundle with `pnpm analyze`

## Testing Questions

### What testing framework is used?

We use **Vitest** for unit and integration tests, and **React Testing Library** for component testing.

### How do I write a test?

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MyComponent } from '@/components/features/MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### How do I mock dependencies?

Use Vitest's mocking utilities:

```typescript
import { vi, describe, it, expect } from 'vitest';

vi.mock('@/lib/db', () => ({
  db: {
    user: {
      findMany: vi.fn(),
    },
  },
}));
```

### What's the target code coverage?

We aim for **>80% code coverage**. Critical paths should have near 100% coverage.

## Troubleshooting Questions

### Why is my build failing?

Check the following:

1. Run `pnpm type-check` to identify TypeScript errors
2. Run `pnpm lint` to identify linting issues
3. Ensure all dependencies are installed: `pnpm install`
4. Check for circular dependencies

See the [Troubleshooting Guide](TROUBLESHOOTING.md) for more details.

### Why is my database connection failing?

Common causes:

1. DATABASE_URL is not set correctly
2. PostgreSQL is not running
3. Database doesn't exist
4. Firewall blocking connection

Test your connection:

```bash
psql postgresql://user:password@localhost:5432/dbname
```

### Why are my tests failing?

Common causes:

1. Mocks not set up correctly
2. Test data doesn't match expectations
3. Async operations not handled properly
4. Dependencies not mocked

Check the [Debugging Guide](DEBUGGING.md) for debugging techniques.

### Why is hot reload not working?

Try the following:

1. Clear Next.js cache: `rm -rf .next`
2. Restart development server: `pnpm dev`
3. Check file watcher limits (Linux)

### Why is my page slow?

Common causes:

1. Large images not optimized
2. Expensive database queries
3. Unnecessary re-renders
4. Large bundle size

Use performance monitoring to identify bottlenecks:

```typescript
import { trackPerformance } from '@/lib/performance';

const tracker = trackPerformance('Page Load');
// ... page code
tracker.stop();
```

## Best Practices Questions

### How do I write clean code?

Follow the [Coding Standards](CODING_STANDARDS.md):

- Use meaningful variable and function names
- Keep functions small and focused
- Write self-documenting code
- Add JSDoc comments for public APIs
- Follow TypeScript best practices

### How do I ensure type safety?

- Enable strict mode in TypeScript
- Avoid `any` type
- Use proper type definitions
- Use type guards for runtime type checking
- Run `pnpm type-check` before committing

### How do I write secure code?

- Validate all input data
- Use parameterized queries to prevent SQL injection
- Never expose sensitive data in error messages
- Use environment variables for secrets
- Implement proper authentication and authorization

## Additional Resources

- [Onboarding Guide](ONBOARDING.md)
- [Troubleshooting Guide](TROUBLESHOOTING.md)
- [Debugging Guide](DEBUGGING.md)
- [Performance Guide](PERFORMANCE.md)
- [Contributing Guide](../CONTRIBUTING.md)
- [Coding Standards](CODING_STANDARDS.md)
- [Architecture Documentation](ARCHITECTURE.md)
- [API Documentation](API.md)

## Getting Help

If you can't find an answer here:

1. Search existing [GitHub Issues](../../issues)
2. Check the [Troubleshooting Guide](TROUBLESHOOTING.md)
3. Ask a question in [GitHub Discussions](../../discussions)
4. Create a new issue with detailed information
