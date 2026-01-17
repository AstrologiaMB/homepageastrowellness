# Caching Documentation

## Table of Contents

1. [Overview](#overview)
2. [Caching Strategy](#caching-strategy)
3. [API Caching](#api-caching)
4. [Database Caching](#database-caching)
5. [Cache Invalidation](#cache-invalidation)
6. [Cache Configuration](#cache-configuration)
7. [Best Practices](#best-practices)

---

## Overview

The Astrowellness platform implements a multi-layered caching strategy to improve performance and reduce server load. Caching is applied at both the API response level and database query level.

### Key Features
- **API Response Caching**: Cache HTTP responses for GET requests
- **Database Query Caching**: Cache database query results
- **Tag-based Invalidation**: Organize cache entries by tags for efficient invalidation
- **TTL Management**: Configurable time-to-live for cached data
- **Stale-While-Revalidate**: Serve stale content while revalidating

---

## Caching Strategy

### Cache Layers

```
┌─────────────────┐
│   Client Cache  │ (Browser/CDN)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  API Response   │ (In-Memory)
│     Cache       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Database Query  │ (In-Memory)
│     Cache       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   PostgreSQL    │ (Database)
└─────────────────┘
```

### Cache Hierarchy

1. **Client Cache**: Browser and CDN caching (via HTTP headers)
2. **API Cache**: In-memory cache for API responses
3. **Database Cache**: In-memory cache for database queries
4. **Database**: PostgreSQL database

---

## API Caching

### Overview

API caching stores HTTP responses to avoid redundant processing. It's implemented in [`lib/cache/api-cache.ts`](../lib/cache/api-cache.ts).

### Usage

#### Basic Caching

```typescript
import { withApiCache } from '@/lib/cache/api-cache';

export async function GET(request: NextRequest) {
  return withApiCache(
    request,
    async (req) => {
      // Your API logic here
      return NextResponse.json({ data: 'result' });
    },
    {
      ttl: 5 * 60 * 1000, // 5 minutes
      varyHeaders: ['authorization'],
    }
  );
}
```

#### Cache Decorator

```typescript
import { cacheRoute } from '@/lib/cache/api-cache';

export const GET = cacheRoute({
  ttl: 10 * 60 * 1000, // 10 minutes
})(async function GET(request: NextRequest) {
  return NextResponse.json({ data: 'result' });
});
```

### Cache Headers

The API cache adds the following headers to responses:

| Header | Description |
|---------|-------------|
| `X-Cache` | `HIT` if served from cache, `MISS` otherwise |
| `Age` | Age of cached response in seconds |
| `Cache-Control` | Cache control directives |
| `ETag` | Entity tag for conditional requests |

### Conditional Requests

The cache supports conditional requests using `If-None-Match` headers:

```typescript
// Client sends:
If-None-Match: "abc123"

// If cache matches, returns 304 Not Modified
// Otherwise returns fresh data with new ETag
```

---

## Database Caching

### Overview

Database caching stores query results to avoid redundant database queries. It's implemented in [`lib/cache/db-cache.ts`](../lib/cache/db-cache.ts) and [`lib/database/cache.ts`](../lib/database/cache.ts).

### Usage

#### Basic Query Caching

```typescript
import { cachedDbQuery } from '@/lib/cache/db-cache';

const user = await cachedDbQuery(
  'user:123',
  async () => {
    return await prisma.user.findUnique({
      where: { id: '123' },
    });
  },
  {
    ttl: 5 * 60 * 1000, // 5 minutes
    tags: ['user', 'user:123'],
  }
);
```

#### User Query Caching

```typescript
import { cacheUserQuery } from '@/lib/cache/db-cache';

const user = await cacheUserQuery(
  userId,
  async () => {
    return await prisma.user.findUnique({
      where: { id: userId },
    });
  },
  10 * 60 * 1000 // 10 minutes
);
```

#### Chart Query Caching

```typescript
import { cacheChartQuery } from '@/lib/cache/db-cache';

const chart = await cacheChartQuery(
  userId,
  'tropical',
  async () => {
    return await prisma.cartaNatal.findFirst({
      where: { userId, tipo: 'tropical' },
    });
  },
  30 * 60 * 1000 // 30 minutes
);
```

#### Subscription Query Caching

```typescript
import { cacheSubscriptionQuery } from '@/lib/cache/db-cache';

const subscription = await cacheSubscriptionQuery(
  userId,
  async () => {
    return await prisma.userSubscription.findUnique({
      where: { userId },
    });
  },
  5 * 60 * 1000 // 5 minutes
);
```

#### Calendar Query Caching

```typescript
import { cacheCalendarQuery } from '@/lib/cache/db-cache';

const calendar = await cacheCalendarQuery(
  userId,
  2024,
  async () => {
    return await prisma.personalCalendarCache.findUnique({
      where: { userId_year: { userId, year: 2024 } },
    });
  },
  60 * 60 * 1000 // 1 hour
);
```

### Cache Statistics

```typescript
import { getDbCacheStats, getCacheHitRate } from '@/lib/cache/db-cache';

const stats = getDbCacheStats();
console.log('Cache hits:', stats.hits);
console.log('Cache misses:', stats.misses);
console.log('Cache hit rate:', getCacheHitRate(), '%');
```

---

## Cache Invalidation

### Overview

Cache invalidation ensures that stale data is removed from the cache. The platform supports tag-based invalidation for efficient cache management.

### Tag-based Invalidation

Cache entries can be tagged for organized invalidation:

```typescript
// Cache with tags
await cachedDbQuery(
  'user:123',
  queryFn,
  {
    tags: ['user', 'user:123', 'profile'],
  }
);

// Invalidate by tag
import { invalidateByTag } from '@/lib/cache/db-cache';
await invalidateByTag('user:123'); // Invalidates all entries with 'user:123' tag
```

### Pre-built Invalidation Functions

```typescript
import {
  invalidateUserCache,
  invalidateChartCache,
  invalidateSubscriptionCache,
  invalidateCalendarCache,
} from '@/lib/cache/db-cache';

// Invalidate all user-related cache
await invalidateUserCache(userId);

// Invalidate specific chart cache
await invalidateChartCache(userId, 'tropical');

// Invalidate all chart cache for user
await invalidateChartCache(userId);

// Invalidate subscription cache
await invalidateSubscriptionCache(userId);

// Invalidate calendar cache
await invalidateCalendarCache(userId, 2024);
```

### API Cache Invalidation

```typescript
import {
  invalidateRouteCache,
  clearApiCachePattern,
} from '@/lib/cache/api-cache';

// Invalidate specific route
await invalidateRouteCache('/api/user/profile');

// Invalidate pattern
await clearApiCachePattern('/api/user/*');
```

### Automatic Invalidation

Cache is automatically invalidated when:

1. **TTL Expires**: Cache entries expire after their TTL
2. **Manual Invalidation**: Explicitly called invalidation functions
3. **Cache Clear**: Entire cache is cleared

---

## Cache Configuration

### Default TTL Values

| Cache Type | Default TTL | Description |
|------------|--------------|-------------|
| API Response | 5 minutes | HTTP response caching |
| User Query | 5 minutes | User data queries |
| Chart Query | 5 minutes | Chart calculation queries |
| Subscription Query | 5 minutes | Subscription status queries |
| Calendar Query | 5 minutes | Calendar data queries |

### Configuration Options

#### API Cache Options

```typescript
interface ApiCacheOptions {
  ttl?: number; // Time to live in milliseconds
  key?: string; // Custom cache key
  skipCache?: boolean; // Skip caching for this request
  varyHeaders?: string[]; // Headers to vary cache by
  revalidate?: number; // Revalidate interval in seconds
  staleWhileRevalidate?: number; // Serve stale while revalidating
}
```

#### Database Cache Options

```typescript
interface DbCacheConfig {
  ttl: number; // Time to live in milliseconds
  key: string; // Cache key
  tags?: string[]; // Cache tags for invalidation
  staleWhileRevalidate?: number; // Serve stale while revalidating
}
```

### Environment Variables

```env
# Cache Configuration
CACHE_TTL_DEFAULT=300000 # 5 minutes in milliseconds
CACHE_MAX_SIZE=100 # Maximum number of cache entries
CACHE_ENABLED=true # Enable/disable caching
```

---

## Best Practices

### When to Cache

**Cache When:**
- Data doesn't change frequently
- Query is expensive (slow)
- Same data is requested multiple times
- Data can be slightly stale

**Don't Cache When:**
- Data changes frequently
- Data is user-specific and sensitive
- Query is fast and simple
- Data must always be fresh

### Cache Key Design

```typescript
// ✅ Good - Specific and predictable
`user:${userId}`
`chart:${userId}:${chartType}`
`calendar:${userId}:${year}`

// ❌ Bad - Too generic
`user`
`data`
```

### Tag Strategy

```typescript
// ✅ Good - Hierarchical tags
tags: ['user', 'user:123', 'profile', 'premium']

// ❌ Bad - No structure
tags: ['random', 'tag', 'names']
```

### TTL Selection

```typescript
// ✅ Good - Appropriate TTLs
// Static data (e.g., constants): 1 hour
// User profile: 5 minutes
// Chart calculations: 30 minutes
// Subscription status: 1 minute

// ❌ Bad - Too long or too short
// User profile: 24 hours (too long)
// Subscription status: 1 second (too short)
```

### Cache Invalidation

```typescript
// ✅ Good - Invalidate on data changes
async function updateUser(userId: string, data: any) {
  await prisma.user.update({ where: { id: userId }, data });
  await invalidateUserCache(userId); // Invalidate cache
}

// ❌ Bad - Never invalidates
async function updateUser(userId: string, data: any) {
  await prisma.user.update({ where: { id: userId }, data });
  // Cache not invalidated - stale data served
}
```

### Monitoring

```typescript
// Monitor cache hit rate
const hitRate = getCacheHitRate();

if (hitRate < 50) {
  console.warn('Low cache hit rate:', hitRate);
  // Consider adjusting TTL or cache strategy
}
```

---

## Cache Utilities

### API Cache Functions

| Function | Description |
|----------|-------------|
| `withApiCache()` | Wrap API handler with caching |
| `cacheRoute()` | Decorator for route caching |
| `getFromApiCache()` | Get cached API response |
| `setApiCache()` | Set cached API response |
| `invalidateRouteCache()` | Invalidate route cache |
| `clearApiCachePattern()` | Clear cache by pattern |

### Database Cache Functions

| Function | Description |
|----------|-------------|
| `cachedDbQuery()` | Execute cached database query |
| `cacheUserQuery()` | Cache user query |
| `cacheChartQuery()` | Cache chart query |
| `cacheSubscriptionQuery()` | Cache subscription query |
| `cacheCalendarQuery()` | Cache calendar query |
| `invalidateByTag()` | Invalidate by tag |
| `invalidateUserCache()` | Invalidate user cache |
| `invalidateChartCache()` | Invalidate chart cache |
| `invalidateSubscriptionCache()` | Invalidate subscription cache |
| `invalidateCalendarCache()` | Invalidate calendar cache |

---

## Troubleshooting

### Cache Not Working

1. **Check if caching is enabled**
   ```typescript
   console.log('Cache enabled:', process.env.CACHE_ENABLED);
   ```

2. **Verify cache key generation**
   ```typescript
   const key = generateCacheKey('user', { userId: '123' });
   console.log('Cache key:', key);
   ```

3. **Check cache statistics**
   ```typescript
   const stats = getDbCacheStats();
   console.log('Cache stats:', stats);
   ```

### Stale Data

1. **Verify TTL is appropriate**
   ```typescript
   // Check if TTL is too long
   ```

2. **Check invalidation logic**
   ```typescript
   // Ensure cache is invalidated on data changes
   ```

3. **Clear cache manually**
   ```typescript
   clearDbCache();
   clearApiCache();
   ```

### High Memory Usage

1. **Check cache size**
   ```typescript
   const size = getCacheSizeBytes();
   console.log('Cache size:', size, 'bytes');
   ```

2. **Reduce TTL**
   ```typescript
   // Use shorter TTL for frequently changing data
   ```

3. **Clean up expired entries**
   ```typescript
   const cleaned = cleanupExpiredDbCache();
   console.log('Cleaned entries:', cleaned);
   ```

---

## References

- [API Cache Implementation](../lib/cache/api-cache.ts)
- [Database Cache Implementation](../lib/cache/db-cache.ts)
- [Database Cache Utilities](../lib/database/cache.ts)
- [Rate Limiting Documentation](./RATE_LIMITING.md)
