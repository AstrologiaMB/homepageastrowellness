# Debugging Guide

This guide provides comprehensive debugging techniques and tools for the Astrowellness platform.

## Table of Contents

1. [Debugging Tools](#debugging-tools)
2. [VS Code Debugging](#vs-code-debugging)
3. [Browser Debugging](#browser-debugging)
4. [Server-Side Debugging](#server-side-debugging)
5. [API Debugging](#api-debugging)
6. [Database Debugging](#database-debugging)
7. [Performance Debugging](#performance-debugging)
8. [Common Debugging Scenarios](#common-debugging-scenarios)

## Debugging Tools

### Built-in Debug Utilities

The project includes debugging utilities in [`lib/debug.ts`](../lib/debug.ts):

```typescript
import { createLogger, measureTime, logError, inspect } from '@/lib/debug';

// Create a logger for a specific component
const logger = createLogger('MyComponent');

// Log at different levels
logger.debug('Debug message');
logger.info('Info message');
logger.warn('Warning message');
logger.error('Error message');

// Measure execution time
await measureTime('Operation name', async () => {
  // Your async operation here
});

// Log errors with context
logError(error, { userId, action });

// Inspect objects
console.log(inspect(myObject, { depth: 3 }));
```

### Performance Monitoring

Use performance utilities from [`lib/performance.ts`](../lib/performance.ts):

```typescript
import { trackPerformance, measureAsync, generatePerformanceReport } from '@/lib/performance';

// Track a performance metric
const tracker = trackPerformance('API Request');
// ... do work
const metric = tracker.stop();

// Measure async operations
const result = await measureAsync('Database Query', async () => {
  return await db.user.findMany();
});

// Generate performance report
console.log(generatePerformanceReport());
```

## VS Code Debugging

### Setting Up Debugging

1. Install recommended extensions from [`.vscode/extensions.json`](../.vscode/extensions.json)
2. Open the project in VS Code
3. Select a debug configuration from the Run and Debug panel

### Available Debug Configurations

The project includes the following debug configurations in [`.vscode/launch.json`](../.vscode/launch.json):

- **Next.js: debug server-side** - Debug server-side code
- **Next.js: debug client-side** - Debug client-side code
- **Next.js: debug full stack** - Debug both client and server
- **Next.js: debug current file** - Debug the currently open file
- **Jest: All tests** - Run and debug all tests
- **Jest: Current file** - Run and debug current test file
- **Vitest: All tests** - Run and debug all Vitest tests
- **Vitest: Current file** - Run and debug current test file

### Breakpoints

Set breakpoints by:

1. Click in the gutter next to the line number
2. Press `F9` to toggle breakpoint
3. Right-click and select "Add Conditional Breakpoint" for conditional breakpoints

### Debugging Techniques

#### Step Through Code

- **F5** - Start debugging
- **F10** - Step over
- **F11** - Step into
- **Shift+F11** - Step out
- **F9** - Toggle breakpoint

#### Inspect Variables

- **Variables Panel** - View local and global variables
- **Watch Panel** - Add expressions to watch
- **Debug Console** - Execute code in debug context

#### Call Stack

- **Call Stack Panel** - View the current call stack
- Click on frames to navigate to that point in code

## Browser Debugging

### Chrome DevTools

Open DevTools with `F12` or `Cmd+Option+I` (Mac).

#### Console

```javascript
// Log messages
console.log('Message');
console.warn('Warning');
console.error('Error');

// Inspect objects
console.table(data);
console.dir(object);

// Measure performance
console.time('Operation');
// ... code
console.timeEnd('Operation');
```

#### Network Tab

Monitor API requests:

1. Open Network tab
2. Filter by "Fetch/XHR"
3. Click on request to view:
   - Request headers
   - Request payload
   - Response headers
   - Response body
   - Timing information

#### React DevTools

1. Install React DevTools extension
2. Open Components tab
3. Inspect component tree
4. View props and state
5. Trace component updates

### Firefox DevTools

Similar to Chrome DevTools with additional features:

- **Inspector** - Examine HTML/CSS
- **Debugger** - Set breakpoints and step through code
- **Network Monitor** - Monitor network activity
- **Performance** - Profile application performance

## Server-Side Debugging

### Debugging API Routes

Use the debug utilities in API routes:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createLogger, logApiRequest, logApiResponse } from '@/lib/debug';

const logger = createLogger('API');

export async function GET(request: NextRequest) {
  logApiRequest('GET', '/api/users');

  try {
    // Your API logic here
    logger.debug('Processing request');

    const data = await getUsers();

    logApiResponse('GET', '/api/users', 200, data);
    return NextResponse.json(data);
  } catch (error) {
    logApiResponse('GET', '/api/users', 500);
    logError(error, { endpoint: '/api/users' });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

### Debugging Server Actions

```typescript
'use server';

import { createLogger } from '@/lib/debug';

const logger = createLogger('ServerAction');

export async function myAction(formData: FormData) {
  logger.debug('Action called', { formData });

  try {
    // Your action logic here
    const result = await processData(formData);

    logger.info('Action completed', { result });
    return { success: true, result };
  } catch (error) {
    logger.error('Action failed', error);
    return { success: false, error: error.message };
  }
}
```

### Debugging Middleware

```typescript
import { createLogger } from '@/lib/debug';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const logger = createLogger('Middleware');

export function middleware(request: NextRequest) {
  logger.debug('Middleware called', {
    path: request.nextUrl.pathname,
    method: request.method,
  });

  // Your middleware logic here

  return NextResponse.next();
}
```

## API Debugging

### Using Request IDs

Track requests across the system with unique IDs:

```typescript
import { createRequestId, logWithRequestId, LogLevel } from '@/lib/debug';

export async function GET(request: NextRequest) {
  const requestId = createRequestId();

  logWithRequestId(requestId, LogLevel.INFO, 'Processing request');

  try {
    const data = await fetchData();
    logWithRequestId(requestId, LogLevel.INFO, 'Request completed');

    return NextResponse.json(data, {
      headers: {
        'X-Request-ID': requestId,
      },
    });
  } catch (error) {
    logWithRequestId(requestId, LogLevel.ERROR, 'Request failed', error);
    throw error;
  }
}
```

### Debugging API Responses

Add debugging headers to responses:

```typescript
export async function GET(request: NextRequest) {
  const startTime = performance.now();

  try {
    const data = await fetchData();
    const duration = performance.now() - startTime;

    return NextResponse.json(data, {
      headers: {
        'X-Response-Time': `${duration.toFixed(2)}ms`,
        'X-Debug-Mode': process.env.NODE_ENV === 'development' ? 'true' : 'false',
      },
    });
  } catch (error) {
    const duration = performance.now() - startTime;

    return NextResponse.json(
      { error: error.message },
      {
        status: 500,
        headers: {
          'X-Response-Time': `${duration.toFixed(2)}ms`,
        },
      },
    );
  }
}
```

## Database Debugging

### Debugging Prisma Queries

```typescript
import { createLogger, logDbQuery } from '@/lib/debug';

const logger = createLogger('Database');

export async function getUser(id: string) {
  logDbQuery('SELECT', 'User', { id });

  try {
    const user = await db.user.findUnique({
      where: { id },
    });

    logger.debug('User found', { user });
    return user;
  } catch (error) {
    logError(error, { operation: 'getUser', id });
    throw error;
  }
}
```

### Using Prisma Studio

```bash
# Open Prisma Studio to inspect database
pnpm prisma:studio
```

### Logging SQL Queries

Enable query logging in development:

```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development'
    ? ['query', 'info', 'warn', 'error']
    : ['error'],
});

export default prisma;
```

## Performance Debugging

### Identifying Slow Operations

```typescript
import { trackPerformance, getPerformanceStore } from '@/lib/performance';

// Track a slow operation
const tracker = trackPerformance('Slow Operation');
// ... operation
tracker.stop();

// Get statistics
const store = getPerformanceStore();
const stats = store.getStatistics('Slow Operation');
console.log(`P95: ${stats?.p95}ms`);
```

### Profiling Components

```typescript
'use client';

import { useEffect } from 'react';
import { trackPerformance } from '@/lib/performance';

export function MyComponent() {
  useEffect(() => {
    const tracker = trackPerformance('MyComponent Render');
    return () => tracker.stop();
  });

  return <div>Content</div>;
}
```

### Memory Profiling

```typescript
import { logMemoryUsage } from '@/lib/debug';

// Log memory usage periodically
setInterval(() => {
  logMemoryUsage();
}, 60000); // Every minute
```

## Common Debugging Scenarios

### Scenario 1: Component Not Rendering

**Problem:** Component doesn't appear in the UI.

**Debug Steps:**

1. Check for render errors in browser console
2. Verify component is imported correctly
3. Add debug logging:

```typescript
export function MyComponent() {
  console.log('MyComponent rendering');
  return <div>Content</div>;
}
```

4. Check React DevTools to see if component exists in tree

### Scenario 2: State Not Updating

**Problem:** State changes don't trigger re-renders.

**Debug Steps:**

1. Add logging to state updates:

```typescript
const [count, setCount] = useState(0);

useEffect(() => {
  console.log('Count changed:', count);
}, [count]);
```

2. Verify state is being updated correctly
3. Check for stale closures

### Scenario 3: API Returns 500 Error

**Problem:** API route returns internal server error.

**Debug Steps:**

1. Check server logs for error details
2. Add error logging to API route:

```typescript
try {
  // API logic
} catch (error) {
  console.error('API Error:', error);
  console.error('Stack:', error.stack);
  throw error;
}
```

3. Test API independently with curl or Postman

### Scenario 4: Database Query Returns No Results

**Problem:** Query returns empty array when data should exist.

**Debug Steps:**

1. Log the query parameters:

```typescript
console.log('Query params:', { id, email });
const user = await db.user.findUnique({ where: { id } });
console.log('Query result:', user);
```

2. Check Prisma Studio to verify data exists
3. Verify query conditions match data format

### Scenario 5: Infinite Loop

**Problem:** Application hangs or crashes with infinite loop.

**Debug Steps:**

1. Add loop counter:

```typescript
let iterations = 0;
while (condition) {
  iterations++;
  if (iterations > 1000) {
    console.error('Possible infinite loop detected');
    break;
  }
  // Loop logic
}
```

2. Use debugger statement:

```typescript
debugger; // Execution will pause here
```

3. Check for recursive function calls without base case

## Best Practices

1. **Use appropriate log levels:**
   - `debug` - Detailed information for development
   - `info` - General informational messages
   - `warn` - Warning messages
   - `error` - Error messages

2. **Remove debug code before committing:**
   - Remove console.log statements
   - Remove debugger statements
   - Keep debug utilities for conditional logging

3. **Use performance monitoring:**
   - Track critical operations
   - Monitor API response times
   - Profile slow components

4. **Document debugging steps:**
   - Keep notes on how to reproduce issues
   - Document solutions for future reference
   - Share debugging insights with team

## Additional Resources

- [VS Code Debugging Documentation](https://code.visualstudio.com/docs/nodejs/nodejs-debugging)
- [Chrome DevTools Documentation](https://developer.chrome.com/docs/devtools/)
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [Prisma Debugging](https://www.prisma.io/docs/guides/debugging)
- [Next.js Debugging](https://nextjs.org/docs/app/building-your-application/debugging)
