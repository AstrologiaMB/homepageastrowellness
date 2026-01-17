# Troubleshooting Guide

This guide provides solutions to common issues you may encounter while developing or deploying the Astrowellness platform.

## Table of Contents

1. [Installation Issues](#installation-issues)
2. [Development Server Issues](#development-server-issues)
3. [Database Issues](#database-issues)
4. [Build Issues](#build-issues)
5. [Testing Issues](#testing-issues)
6. [Performance Issues](#performance-issues)
7. [Deployment Issues](#deployment-issues)
8. [Common Error Messages](#common-error-messages)

## Installation Issues

### npm install fails

**Problem:** `npm install` fails with errors.

**Solutions:**

1. Clear npm cache:
   ```bash
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

2. Use pnpm instead (recommended):
   ```bash
   npm install -g pnpm
   rm -rf node_modules package-lock.json
   pnpm install
   ```

3. Check Node.js version:
   ```bash
   node --version  # Should be v20 or higher
   ```

### Prisma generation fails

**Problem:** `prisma generate` fails with errors.

**Solutions:**

1. Ensure DATABASE_URL is set in `.env`:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
   ```

2. Regenerate Prisma client:
   ```bash
   pnpm prisma:generate
   ```

3. Check Prisma schema syntax:
   ```bash
   pnpm prisma validate
   ```

## Development Server Issues

### Port 3000 already in use

**Problem:** `Error: listen EADDRINUSE: address already in use :::3000`

**Solutions:**

1. Kill the process using port 3000:
   ```bash
   # macOS/Linux
   lsof -ti:3000 | xargs kill -9

   # Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   ```

2. Use a different port:
   ```bash
   PORT=3001 pnpm dev
   ```

### Hot reload not working

**Problem:** Changes don't appear in browser without manual refresh.

**Solutions:**

1. Clear Next.js cache:
   ```bash
   rm -rf .next
   pnpm dev
   ```

2. Check if file watcher limit is reached (Linux):
   ```bash
   echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
   sudo sysctl -p
   ```

### Next.js compilation errors

**Problem:** TypeScript or compilation errors during development.

**Solutions:**

1. Run type check:
   ```bash
   pnpm type-check
   ```

2. Check for circular dependencies:
   ```bash
   pnpm madge --circular --extensions ts,tsx .
   ```

3. Clear Next.js cache:
   ```bash
   rm -rf .next
   pnpm dev
   ```

## Database Issues

### Connection refused

**Problem:** Database connection fails with "connection refused".

**Solutions:**

1. Check if PostgreSQL is running:
   ```bash
   # macOS with Homebrew
   brew services list
   brew services start postgresql

   # Linux
   sudo systemctl status postgresql
   sudo systemctl start postgresql
   ```

2. Verify DATABASE_URL in `.env`:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
   ```

3. Test connection:
   ```bash
   psql postgresql://user:password@localhost:5432/dbname
   ```

### Migration fails

**Problem:** Database migration fails with errors.

**Solutions:**

1. Reset database (WARNING: deletes all data):
   ```bash
   pnpm prisma migrate reset
   ```

2. Create migration manually:
   ```bash
   pnpm prisma db push
   ```

3. Check migration files for conflicts:
   ```bash
   pnpm prisma migrate status
   ```

### Prisma Studio won't open

**Problem:** Prisma Studio fails to start.

**Solutions:**

1. Ensure DATABASE_URL is set correctly
2. Try with explicit port:
   ```bash
   pnpm prisma:studio --port 5555
   ```
3. Check firewall settings

## Build Issues

### Build fails with TypeScript errors

**Problem:** `pnpm build` fails with TypeScript errors.

**Solutions:**

1. Run type check first:
   ```bash
   pnpm type-check
   ```

2. Check tsconfig.json configuration
3. Ensure all imports are correct:
   ```bash
   pnpm lint
   ```

### Out of memory during build

**Problem:** Build fails with "JavaScript heap out of memory".

**Solutions:**

1. Increase Node.js memory limit:
   ```bash
   NODE_OPTIONS=--max-old-space-size=4096 pnpm build
   ```

2. Build with reduced parallelism:
   ```bash
   pnpm build --no-lint
   ```

### Production build is slow

**Problem:** Build process takes too long.

**Solutions:**

1. Use incremental builds:
   ```bash
   pnpm build
   ```

2. Disable source maps for production:
   ```javascript
   // next.config.mjs
   productionBrowserSourceMaps: false
   ```

3. Analyze bundle size:
   ```bash
   pnpm analyze
   ```

## Testing Issues

### Tests fail with module not found

**Problem:** Tests fail with "Cannot find module" errors.

**Solutions:**

1. Ensure all dependencies are installed:
   ```bash
   pnpm install
   ```

2. Check import paths:
   ```typescript
   // Use @/ alias
   import { myFunction } from '@/lib/utils';
   ```

3. Clear Vitest cache:
   ```bash
   rm -rf node_modules/.vitest
   pnpm test
   ```

### Tests timeout

**Problem:** Tests fail with timeout errors.

**Solutions:**

1. Increase timeout in vitest.config.ts:
   ```typescript
   export default defineConfig({
     testTimeout: 10000,
   });
   ```

2. Check for async issues:
   ```typescript
   // Ensure promises are awaited
   await expect(asyncFunction()).resolves.toBe(value);
   ```

### Mock data not working

**Problem:** Tests fail because mocks aren't applied correctly.

**Solutions:**

1. Clear mock cache:
   ```bash
   vi.clearAllMocks();
   ```

2. Use proper mock syntax:
   ```typescript
   vi.mock('@/lib/db', () => ({
     db: {
       user: {
         findMany: vi.fn(),
       },
     },
   }));
   ```

## Performance Issues

### Slow page load times

**Problem:** Pages load slowly in development.

**Solutions:**

1. Check for large images:
   - Optimize images using [lib/performance.ts](../lib/performance.ts)

2. Use performance monitoring:
   ```typescript
   import { trackPerformance } from '@/lib/performance';

   const tracker = trackPerformance('Page Load');
   // ... page code
   tracker.stop();
   ```

3. Enable Next.js image optimization:
   ```javascript
   // next.config.mjs
   images: {
     unoptimized: false,
   }
   ```

### High memory usage

**Problem:** Application uses excessive memory.

**Solutions:**

1. Check for memory leaks:
   ```typescript
   import { logMemoryUsage } from '@/lib/debug';

   setInterval(() => {
     logMemoryUsage();
   }, 60000);
   ```

2. Optimize database queries:
   - Use pagination
   - Select only needed fields
   - Add indexes to database

3. Clear caches regularly:
   ```typescript
   // Clear Next.js cache
   rm -rf .next
   ```

## Deployment Issues

### Environment variables not set

**Problem:** Application fails in production due to missing environment variables.

**Solutions:**

1. Verify all required variables are set:
   ```bash
   # Check deployment platform's environment variables
   ```

2. Use `.env.production` for local testing:
   ```bash
   cp .env.example .env.production
   # Edit .env.production
   pnpm build
   ```

### Database connection fails in production

**Problem:** Database connection works locally but fails in production.

**Solutions:**

1. Check production DATABASE_URL:
   ```env
   DATABASE_URL="postgresql://user:password@production-host:5432/dbname"
   ```

2. Verify database is accessible from production server
3. Check firewall rules
4. Ensure SSL is enabled for remote connections

### Build fails on deployment

**Problem:** Build succeeds locally but fails during deployment.

**Solutions:**

1. Ensure Node.js version matches:
   ```json
   // package.json
   "engines": {
     "node": ">=20.0.0"
   }
   ```

2. Check platform-specific dependencies
3. Verify all environment variables are set before build

## Common Error Messages

### "Module not found: Can't resolve '@/...'"

**Cause:** Import path alias not configured correctly.

**Solution:** Ensure tsconfig.json has correct paths:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### "ReferenceError: process is not defined"

**Cause:** Using Node.js APIs in client-side code.

**Solution:** Check if code runs on server:
```typescript
if (typeof window === 'undefined') {
  // Server-side code
}
```

### "Error: NextAuth requires a secret"

**Cause:** NEXTAUTH_SECRET not set.

**Solution:** Add to `.env`:
```env
NEXTAUTH_SECRET="your-secret-key-here"
```

### "Error: Prisma Client is not configured"

**Cause:** Prisma client not generated.

**Solution:** Run:
```bash
pnpm prisma:generate
```

## Getting Additional Help

If you can't resolve your issue:

1. Check the [Debugging Guide](DEBUGGING.md) for more debugging techniques
2. Review the [Performance Guide](PERFORMANCE.md) for performance optimization
3. Search existing GitHub issues
4. Create a new issue with:
   - Error message
   - Steps to reproduce
   - Environment details (OS, Node.js version)
   - Relevant code snippets

## Recovery Procedures

### Full Reset

If you need to completely reset your development environment:

```bash
# Remove all generated files
rm -rf .next node_modules

# Clear caches
rm -rf node_modules/.cache
rm -rf node_modules/.vitest

# Reinstall dependencies
pnpm install

# Reset database (WARNING: deletes data)
pnpm prisma migrate reset

# Regenerate Prisma client
pnpm prisma:generate
```

### Database Recovery

If your database becomes corrupted:

```bash
# Create backup
pg_dump dbname > backup.sql

# Reset database
dropdb dbname
createdb dbname

# Restore from backup
psql dbname < backup.sql

# Run migrations
pnpm prisma migrate deploy
```
