# Performance Guide

This guide provides best practices and techniques for optimizing the performance of the Astrowellness platform.

## Table of Contents

1. [Performance Monitoring](#performance-monitoring)
2. [Frontend Performance](#frontend-performance)
3. [Backend Performance](#backend-performance)
4. [Database Performance](#database-performance)
5. [API Performance](#api-performance)
6. [Build Optimization](#build-optimization)
7. [Performance Testing](#performance-testing)

## Performance Monitoring

### Using Performance Utilities

The project includes performance monitoring utilities in [`lib/performance.ts`](../lib/performance.ts):

```typescript
import {
  trackPerformance,
  measureAsync,
  measureSync,
  generatePerformanceReport,
} from '@/lib/performance';

// Track a performance metric
const tracker = trackPerformance('Operation Name');
// ... do work
const metric = tracker.stop();

// Measure async operations
const result = await measureAsync('Database Query', async () => {
  return await db.user.findMany();
});

// Generate performance report
console.log(generatePerformanceReport());
```

### Web Vitals

Track core web vitals for user experience:

```typescript
'use client';

import { trackWebVital } from '@/lib/performance';

export function WebVitals() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Track First Contentful Paint
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          trackWebVital({
            name: entry.name,
            value: entry.startTime,
            rating: entry.duration < 1800 ? 'good' : 'needs-improvement',
          });
        }
      });

      observer.observe({ entryTypes: ['paint'] });
    }
  }, []);

  return null;
}
```

## Frontend Performance

### Code Splitting

Use dynamic imports for code splitting:

```typescript
// Good: Dynamic import
const ChartComponent = dynamic(() => import('@/components/features/astrology/Chart'), {
  loading: () => <ChartSkeleton />,
});

// Bad: Static import
import ChartComponent from '@/components/features/astrology/Chart';
```

### Image Optimization

Use Next.js Image component for optimized images:

```typescript
import Image from 'next/image';

// Good: Optimized image
<Image
  src="/chart.png"
  alt="Astrology Chart"
  width={800}
  height={600}
  priority={false}
  loading="lazy"
/>

// Bad: Unoptimized image
<img src="/chart.png" alt="Astrology Chart" />
```

### Lazy Loading Components

Lazy load components that are not immediately visible:

```typescript
import { lazy, Suspense } from 'react';

const Modal = lazy(() => import('@/components/ui/Modal'));

function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Modal />
    </Suspense>
  );
}
```

### Memoization

Use React.memo and useMemo for expensive computations:

```typescript
import { memo, useMemo } from 'react';

// Memoize component
const ExpensiveChart = memo(function ExpensiveChart({ data }) {
  return <div>{/* Chart rendering */}</div>;
});

// Memoize computed values
function ChartList({ charts }) {
  const sortedCharts = useMemo(() => {
    return charts.sort((a, b) => a.date - b.date);
  }, [charts]);

  return <div>{sortedCharts.map(/* ... */)}</div>;
}
```

### Debouncing and Throttling

Use debouncing for user inputs:

```typescript
import { useState, useEffect } from 'react';

function SearchInput() {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      // Make API call after 300ms
      search(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return <input onChange={(e) => setQuery(e.target.value)} />;
}
```

## Backend Performance

### Caching Strategies

Implement caching for expensive operations:

```typescript
import { unstable_cache } from 'next/cache';

// Cache expensive calculations
const getCachedChart = unstable_cache(
  async (birthDate: string) => {
    return await calculateChart(birthDate);
  },
  ['chart-calculation'],
  {
    revalidate: 3600, // 1 hour
    tags: ['charts'],
  }
);

export async function GET(request: NextRequest) {
  const { birthDate } = await request.json();
  const chart = await getCachedChart(birthDate);
  return NextResponse.json(chart);
}
```

### Stream Responses

Use streaming for large responses:

```typescript
import { StreamingTextResponse } from 'ai';

export async function POST(request: NextRequest) {
  const { prompt } = await request.json();

  const stream = await generateInterpretation(prompt);

  return new StreamingTextResponse(stream);
}
```

### Parallel Requests

Execute independent requests in parallel:

```typescript
// Good: Parallel requests
const [user, charts, settings] = await Promise.all([
  getUser(userId),
  getUserCharts(userId),
  getUserSettings(userId),
]);

// Bad: Sequential requests
const user = await getUser(userId);
const charts = await getUserCharts(userId);
const settings = await getUserSettings(userId);
```

## Database Performance

### Query Optimization

Select only needed fields:

```typescript
// Good: Select specific fields
const users = await db.user.findMany({
  select: {
    id: true,
    name: true,
    email: true,
  },
});

// Bad: Select all fields
const users = await db.user.findMany();
```

### Pagination

Implement pagination for large datasets:

```typescript
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');

  const [users, total] = await Promise.all([
    db.user.findMany({
      skip: (page - 1) * limit,
      take: limit,
    }),
    db.user.count(),
  ]);

  return NextResponse.json({
    users,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
}
```

### Indexing

Add indexes to frequently queried fields:

```prisma
// prisma/schema.prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  createdAt DateTime @default(now())

  @@index([email])
  @@index([createdAt])
}
```

### Connection Pooling

Configure Prisma connection pool:

```typescript
// lib/prisma.ts
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

export default prisma;
```

## API Performance

### Response Compression

Enable gzip compression:

```javascript
// next.config.mjs
const nextConfig = {
  compress: true,
};
```

### Response Headers

Add caching headers for GET requests:

```typescript
export async function GET(request: NextRequest) {
  const data = await getData();

  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=60',
      'CDN-Cache-Control': 'public, s-maxage=86400',
    },
  });
}
```

### Request Validation

Validate requests early to fail fast:

```typescript
import { z } from 'zod';

const ChartRequestSchema = z.object({
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  birthTime: z.string().regex(/^\d{2}:\d{2}$/),
  location: z.object({
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
  }),
});

export async function POST(request: NextRequest) {
  // Validate early
  const body = await request.json();
  const validated = ChartRequestSchema.parse(body);

  // Process request
  const chart = await calculateChart(validated);
  return NextResponse.json(chart);
}
```

## Build Optimization

### Bundle Analysis

Analyze bundle size:

```bash
pnpm analyze
```

### Tree Shaking

Ensure unused code is removed:

```typescript
// Good: Import specific functions
import { formatDate, formatTime } from '@/lib/utils/date.utils';

// Bad: Import entire library
import * as dateUtils from '@/lib/utils/date.utils';
```

### Minification

Enable minification in production:

```javascript
// next.config.mjs
const nextConfig = {
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
};
```

### Code Splitting Configuration

Configure webpack for optimal splitting:

```javascript
// next.config.mjs
const nextConfig = {
  webpack: (config) => {
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: /node_modules/,
          priority: 20,
        },
        common: {
          name: 'common',
          minChunks: 2,
          priority: 10,
          reuseExistingChunk: true,
        },
      },
    };
    return config;
  },
};
```

## Performance Testing

### Load Testing

Use tools like k6 or Artillery for load testing:

```javascript
// load-test.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
  const res = http.get('http://localhost:3000/api/charts');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });
  sleep(1);
}
```

Run load test:

```bash
k6 run load-test.js
```

### Performance Budgets

Set performance budgets in next.config.mjs:

```javascript
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  // ... config
};

module.exports = withBundleAnalyzer(nextConfig);
```

### Lighthouse Audits

Run Lighthouse for performance audits:

```bash
npm install -g lighthouse
lighthouse http://localhost:3000 --view
```

## Performance Best Practices

1. **Monitor Continuously**
   - Track key metrics
   - Set up alerts for performance degradation
   - Review performance reports regularly

2. **Optimize Critical Path**
   - Identify and optimize slow operations
   - Focus on user-facing performance
   - Prioritize high-impact improvements

3. **Use Caching Strategically**
   - Cache expensive computations
   - Use CDN for static assets
   - Implement cache invalidation

4. **Measure Before Optimizing**
   - Establish baseline metrics
   - Measure impact of changes
   - Avoid premature optimization

5. **Keep Dependencies Updated**
   - Regular updates for performance improvements
   - Monitor bundle size impact
   - Remove unused dependencies

## Performance Metrics

### Key Metrics to Track

- **First Contentful Paint (FCP)**: < 1.8s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **First Input Delay (FID)**: < 100ms
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Time to First Byte (TTFB)**: < 600ms
- **API Response Time**: < 500ms (P95)
- **Database Query Time**: < 100ms (P95)

### Performance Goals

- **Page Load Time**: < 2s
- **API Response Time**: < 500ms
- **Database Query Time**: < 100ms
- **Bundle Size**: < 200KB (gzipped)

## Additional Resources

- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing)
- [React Performance](https://react.dev/learn/render-and-commit#optimizing-performance)
- [Web Vitals](https://web.dev/vitals/)
- [Prisma Performance](https://www.prisma.io/docs/guides/performance-and-optimization)
- [Performance Monitoring](../lib/performance.ts)
- [Debugging Guide](DEBUGGING.md)
