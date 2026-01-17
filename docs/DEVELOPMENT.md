# Development Guide

## Table of Contents

1. [Getting Started](#getting-started)
2. [Development Environment](#development-environment)
3. [Project Structure](#project-structure)
4. [Development Workflow](#development-workflow)
5. [Running the Application](#running-the-application)
6. [Testing](#testing)
7. [Debugging](#debugging)
8. [Code Style](#code-style)
9. [Common Tasks](#common-tasks)
10. [Troubleshooting](#troubleshooting)

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: 18.x or later
- **pnpm**: 8.x or later (recommended) or npm
- **PostgreSQL**: 14.x or later
- **Git**: Latest version

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd homepageastrowellness
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your values
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma Client
   pnpm prisma generate

   # Run migrations
   pnpm prisma migrate dev

   # Seed the database (optional)
   pnpm prisma db seed
   ```

5. **Start the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

6. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## Development Environment

### Required Environment Variables

Create a `.env` file in the project root:

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/astrowellness"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email
EMAIL_SERVER_HOST="smtp.example.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="your-email@example.com"
EMAIL_SERVER_PASSWORD="your-email-password"
EMAIL_FROM="noreply@astrowellness.com"

# External APIs
ASTROLOGY_API_KEY="your-astrology-api-key"
GEOCODING_API_KEY="your-geocoding-api-key"
```

### Recommended VS Code Extensions

- **ESLint**: Linting support
- **Prettier**: Code formatting
- **Prisma**: Database schema support
- **TypeScript Importer**: Auto import modules
- **Tailwind CSS IntelliSense**: Tailwind class suggestions
- **GitLens**: Git integration

---

## Project Structure

```
homepageastrowellness/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── cartas/            # Chart pages
│   ├── calendario/        # Calendar pages
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/                # Reusable UI components
│   ├── features/          # Feature-specific components
│   ├── layout/            # Layout components
│   └── providers/         # Context providers
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
│   ├── utils/             # Utility functions
│   ├── errors/            # Error handling
│   ├── constants/         # Application constants
│   ├── validation/        # Validation schemas
│   └── services/         # Business logic services
├── middleware/            # Middleware functions
├── services/              # Business logic services
├── types/                 # TypeScript type definitions
├── locales/               # Translation files
├── tests/                 # Test files
├── docs/                  # Documentation
├── prisma/                # Prisma ORM
│   ├── schema.prisma      # Database schema
│   └── migrations/        # Database migrations
└── public/                # Static assets
```

---

## Development Workflow

### Git Workflow

1. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes**
   - Write code following [Coding Standards](./CODING_STANDARDS.md)
   - Add tests for new functionality
   - Update documentation

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

4. **Push to remote**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a pull request**
   - Describe your changes
   - Link to related issues
   - Request review

### Commit Message Format

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Example:**
```
feat(auth): add password reset functionality

- Add forgot password page
- Implement password reset email
- Add reset password API endpoint

Closes #123
```

---

## Running the Application

### Development Server

```bash
pnpm dev
# or
npm run dev
```

The development server will start at [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

### Database Commands

```bash
# Generate Prisma Client
pnpm prisma generate

# Run migrations
pnpm prisma migrate dev

# Open Prisma Studio
pnpm prisma studio

# Reset database (development only)
pnpm prisma migrate reset

# Create a new migration
pnpm prisma migrate dev --name <migration_name>
```

### Linting and Formatting

```bash
# Run ESLint
pnpm lint

# Fix ESLint errors
pnpm lint:fix

# Format code with Prettier
pnpm format

# Check code style
pnpm format:check
```

---

## Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run unit tests only
pnpm test:unit

# Run integration tests only
pnpm test:integration
```

### Writing Tests

Tests are organized in the `tests/` directory:

```
tests/
├── unit/              # Unit tests
├── integration/       # Integration tests
├── e2e/              # End-to-end tests
├── helpers/           # Test helpers
└── mocks/             # Mock data
```

**Example Unit Test:**
```typescript
import { describe, it, expect } from 'vitest';
import { calculateChart } from '@/lib/astrology-utils';

describe('calculateChart', () => {
  it('should calculate chart for valid input', () => {
    const result = calculateChart({
      birthDate: new Date('1990-01-01'),
      location: 'New York, NY',
    });

    expect(result).toBeDefined();
    expect(result.planets).toHaveLength(10);
  });
});
```

---

## Debugging

### Using VS Code Debugger

1. **Set breakpoints** in your code
2. **Press F5** or click "Run and Debug"
3. **Select** "Next.js: debug server-side"

### Console Debugging

```typescript
// Debug logging
console.log('Variable value:', variable);

// Debug with labels
console.debug('Debug info:', { data });

// Error logging
console.error('Error occurred:', error);
```

### Database Debugging

```typescript
// Enable Prisma query logging
const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'],
});
```

---

## Code Style

### ESLint

The project uses ESLint for code linting. Run:

```bash
pnpm lint
```

### Prettier

The project uses Prettier for code formatting. Run:

```bash
pnpm format
```

### TypeScript

The project uses strict TypeScript. Ensure all code is properly typed.

---

## Common Tasks

### Adding a New API Endpoint

1. **Create the route file**
   ```typescript
   // app/api/my-endpoint/route.ts
   import { NextRequest, NextResponse } from 'next/server';

   export async function GET(request: NextRequest) {
     // Your code here
     return NextResponse.json({ success: true, data: {} });
   }
   ```

2. **Add validation** (if needed)
   ```typescript
   import { z } from 'zod';

   const schema = z.object({
     param1: z.string(),
     param2: z.number(),
   });
   ```

3. **Add error handling**
   ```typescript
   try {
     // Your code here
   } catch (error) {
     return NextResponse.json(
       { success: false, error: { code: 'ERROR', message: 'Error message' } },
       { status: 500 }
     );
   }
   ```

### Adding a New Component

1. **Create the component file**
   ```typescript
   // components/features/my-component.tsx
   interface MyComponentProps {
     title: string;
     onAction: () => void;
   }

   export function MyComponent({ title, onAction }: MyComponentProps) {
     return (
       <div>
         <h1>{title}</h1>
         <button onClick={onAction}>Action</button>
       </div>
     );
   }
   ```

2. **Add JSDoc comments**
   ```typescript
   /**
    * My component description
    * @param props - Component props
    */
   export function MyComponent(props: MyComponentProps) {
     // ...
   }
   ```

### Adding a New Service

1. **Create the service file**
   ```typescript
   // services/my-service.ts
   import { prisma } from '@/lib/prisma';

   export const myService = {
     async getData(id: string) {
       return prisma.user.findUnique({ where: { id } });
     },

     async createData(data: any) {
       return prisma.user.create({ data });
     },
   };
   ```

2. **Export from barrel file**
   ```typescript
   // services/index.ts
   export { myService } from './my-service';
   ```

### Adding a New Translation

1. **Add to English translations**
   ```json
   // locales/en.json
   {
     "myFeature": {
       "title": "My Feature",
       "description": "Feature description"
     }
   }
   ```

2. **Add to Spanish translations**
   ```json
   // locales/es.json
   {
     "myFeature": {
       "title": "Mi Característica",
       "description": "Descripción de la característica"
     }
   }
   ```

3. **Use in code**
   ```typescript
   import { t } from '@/lib/i18n';

   const title = t('myFeature.title');
   ```

---

## Troubleshooting

### Common Issues

#### Database Connection Error

**Problem:** Cannot connect to database

**Solution:**
1. Check `DATABASE_URL` in `.env`
2. Ensure PostgreSQL is running
3. Verify database exists
4. Check firewall settings

#### Prisma Client Not Generated

**Problem:** Prisma Client not found

**Solution:**
```bash
pnpm prisma generate
```

#### Build Errors

**Problem:** TypeScript errors during build

**Solution:**
1. Run `pnpm lint` to check for linting errors
2. Check TypeScript strict mode violations
3. Ensure all types are properly defined

#### Environment Variables Not Loading

**Problem:** Environment variables not available

**Solution:**
1. Ensure `.env` file exists
2. Restart development server
3. Check variable names match

### Getting Help

- Check [Architecture Documentation](./ARCHITECTURE.md)
- Check [API Documentation](./API.md)
- Check [Database Documentation](./DATABASE.md)
- Check [Coding Standards](./CODING_STANDARDS.md)
- Open an issue on GitHub

---

## Related Documentation

- [Architecture Documentation](./ARCHITECTURE.md)
- [API Documentation](./API.md)
- [Database Documentation](./DATABASE.md)
- [Coding Standards](./CODING_STANDARDS.md)
- [Migration Guide](./MIGRATION_GUIDE.md)
