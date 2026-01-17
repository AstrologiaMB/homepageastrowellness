# Rate Limiting Documentation

## Table of Contents

1. [Overview](#overview)
2. [Rate Limit Strategy](#rate-limit-strategy)
3. [Usage](#usage)
4. [Configuration](#configuration)
5. [Rate Limit Headers](#rate-limit-headers)
6. [Best Practices](#best-practices)

---

## Overview

The Astrowellness platform implements rate limiting to prevent abuse and ensure fair resource allocation. Rate limiting is implemented in [`middleware/rate-limit.middleware.ts`](../middleware/rate-limit.middleware.ts).

### Key Features
- **In-Memory Store**: Fast rate limit tracking
- **Customizable Limits**: Per-endpoint rate limit configuration
- **IP-based Tracking**: Track requests by IP address
- **Rate Limit Headers**: Inform clients about remaining requests
- **Flexible Configuration**: Skip rate limiting for certain requests

---

## Rate Limit Strategy

### Default Rate Limits

| Endpoint Type | Limit | Window | Description |
|--------------|--------|--------|-------------|
| General API | 100 requests | 1 minute | Standard API endpoints |
| Auth | 5 requests | 1 minute | Authentication endpoints |
| Chart | 10 requests | 1 minute | Chart calculation endpoints |
| Stripe | 50 requests | 1 minute | Stripe webhook endpoints |
| Admin | 200 requests | 1 minute | Admin endpoints |

### Rate Limit Flow

```
┌─────────────┐
│   Request   │
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│ Check Rate Limit   │
│   (IP + Path)     │
└──────┬──────────────┘
       │
       ├─► Within Limit ──► Process Request
       │
       └─► Exceeded ──► Return 429 Too Many Requests
```

---

## Usage

### Basic Middleware Usage

```typescript
import { createRateLimitMiddleware } from '@/middleware/rate-limit.middleware';

export async function GET(request: NextRequest) {
  const rateLimitResponse = await createRateLimitMiddleware({
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 100,
  })(request);

  if (rateLimitResponse) {
    return rateLimitResponse; // Rate limit exceeded
  }

  // Process request
  return NextResponse.json({ data: 'result' });
}
```

### Pre-configured Rate Limits

```typescript
import {
  authRateLimit,
  chartRateLimit,
  stripeRateLimit,
  adminRateLimit,
  generalRateLimit,
} from '@/middleware/rate-limit.middleware';

export async function GET(request: NextRequest) {
  // Check auth rate limit
  const rateLimitResponse = await authRateLimit(request);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  // Process request
  return NextResponse.json({ data: 'result' });
}
```

### withRateLimit Wrapper

```typescript
import { withRateLimit } from '@/middleware/rate-limit.middleware';

export const GET = withRateLimit(
  async function GET(request: NextRequest) {
    return NextResponse.json({ data: 'result' });
  },
  {
    windowMs: 60 * 1000,
    maxRequests: 100,
    message: 'Too many requests, please try again later.',
  }
);
```

### Rate Limit Decorator

```typescript
import { rateLimit } from '@/middleware/rate-limit.middleware';

class ApiController {
  @rateLimit({
    windowMs: 60 * 1000,
    maxRequests: 100,
  })
  async getData(request: NextRequest) {
    return NextResponse.json({ data: 'result' });
  }
}
```

### Custom Key Generator

```typescript
import { createRateLimitMiddleware } from '@/middleware/rate-limit.middleware';

const customRateLimit = createRateLimitMiddleware({
  windowMs: 60 * 1000,
  maxRequests: 100,
  keyGenerator: (request) => {
    // Custom key generation logic
    const userId = request.headers.get('x-user-id');
    return `user:${userId}`;
  },
});
```

### Skip Rate Limiting

```typescript
import { createRateLimitMiddleware } from '@/middleware/rate-limit.middleware';

const rateLimit = createRateLimitMiddleware({
  windowMs: 60 * 1000,
  maxRequests: 100,
  skip: (request) => {
    // Skip rate limiting for internal requests
    return request.headers.get('x-internal') === 'true';
  },
});
```

---

## Configuration

### Rate Limit Config Options

```typescript
interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum number of requests per window
  keyGenerator?: (request: NextRequest) => string; // Custom key generator
  skipSuccessfulRequests?: boolean; // Don't count successful requests
  skipFailedRequests?: boolean; // Don't count failed requests
  skip?: (request: NextRequest) => boolean; // Skip rate limiting
  message?: string; // Custom error message
  statusCode?: number; // Custom status code
  headers?: boolean; // Add rate limit headers to response
}
```

### Configuration Examples

#### Strict Rate Limiting

```typescript
const strictRateLimit = createRateLimitMiddleware({
  windowMs: 60 * 1000,
  maxRequests: 10,
  message: 'Rate limit exceeded. Please wait before trying again.',
  statusCode: 429,
  headers: true,
});
```

#### Lenient Rate Limiting

```typescript
const lenientRateLimit = createRateLimitMiddleware({
  windowMs: 60 * 1000,
  maxRequests: 1000,
  message: 'Too many requests. Please slow down.',
  statusCode: 429,
  headers: true,
});
```

#### User-based Rate Limiting

```typescript
const userRateLimit = createRateLimitMiddleware({
  windowMs: 60 * 1000,
  maxRequests: 100,
  keyGenerator: (request) => {
    const userId = request.headers.get('x-user-id');
    return userId || 'anonymous';
  },
});
```

#### Skip Successful Requests

```typescript
const skipSuccessfulRateLimit = createRateLimitMiddleware({
  windowMs: 60 * 1000,
  maxRequests: 100,
  skipSuccessfulRequests: true, // Only count failed requests
});
```

---

## Rate Limit Headers

### Response Headers

The rate limiting middleware adds the following headers to responses:

| Header | Description | Example |
|--------|-------------|----------|
| `X-RateLimit-Limit` | Maximum requests per window | `100` |
| `X-RateLimit-Remaining` | Remaining requests in window | `95` |
| `X-RateLimit-Reset` | Unix timestamp when window resets | `1704110400` |
| `Retry-After` | Seconds until retry is allowed | `30` |

### Example Response

```http
HTTP/1.1 200 OK
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1704110400
Content-Type: application/json

{
  "data": "result"
}
```

### Rate Limit Exceeded Response

```http
HTTP/1.1 429 Too Many Requests
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1704110400
Retry-After: 30
Content-Type: application/json

{
  "error": "Too many requests, please try again later."
}
```

### Client-Side Handling

```javascript
// Check rate limit headers
fetch('/api/data')
  .then(response => {
    const limit = response.headers.get('X-RateLimit-Limit');
    const remaining = response.headers.get('X-RateLimit-Remaining');
    const reset = response.headers.get('X-RateLimit-Reset');

    console.log(`Rate limit: ${remaining}/${limit}`);
    console.log(`Resets at: ${new Date(reset * 1000)}`);

    if (response.status === 429) {
      const retryAfter = response.headers.get('Retry-After');
      console.log(`Retry after ${retryAfter} seconds`);
    }
  });
```

---

## Best Practices

### Choose Appropriate Limits

```typescript
// ✅ Good - Appropriate for endpoint type
const authLimit = createRateLimitMiddleware({
  windowMs: 60 * 1000,
  maxRequests: 5, // Strict for auth
});

const dataLimit = createRateLimitMiddleware({
  windowMs: 60 * 1000,
  maxRequests: 100, // Lenient for data
});

// ❌ Bad - Too strict or too lenient
const strictLimit = createRateLimitMiddleware({
  windowMs: 60 * 1000,
  maxRequests: 1, // Too strict
});

const lenientLimit = createRateLimitMiddleware({
  windowMs: 60 * 1000,
  maxRequests: 10000, // Too lenient
});
```

### Use Meaningful Error Messages

```typescript
// ✅ Good - Clear and helpful
const rateLimit = createRateLimitMiddleware({
  windowMs: 60 * 1000,
  maxRequests: 100,
  message: 'Rate limit exceeded. Please wait 60 seconds before trying again.',
});

// ❌ Bad - Vague
const rateLimit = createRateLimitMiddleware({
  windowMs: 60 * 1000,
  maxRequests: 100,
  message: 'Error',
});
```

### Add Rate Limit Headers

```typescript
// ✅ Good - Include headers
const rateLimit = createRateLimitMiddleware({
  windowMs: 60 * 1000,
  maxRequests: 100,
  headers: true, // Add rate limit headers
});

// ❌ Bad - No headers
const rateLimit = createRateLimitMiddleware({
  windowMs: 60 * 1000,
  maxRequests: 100,
  headers: false, // No rate limit headers
});
```

### Use Custom Key Generators

```typescript
// ✅ Good - User-based rate limiting
const userRateLimit = createRateLimitMiddleware({
  windowMs: 60 * 1000,
  maxRequests: 100,
  keyGenerator: (request) => {
    const userId = request.headers.get('x-user-id');
    return userId || 'anonymous';
  },
});

// ❌ Bad - Only IP-based
const ipRateLimit = createRateLimitMiddleware({
  windowMs: 60 * 1000,
  maxRequests: 100,
  // No custom key generator - only IP-based
});
```

### Skip Rate Limiting for Internal Requests

```typescript
// ✅ Good - Skip internal requests
const rateLimit = createRateLimitMiddleware({
  windowMs: 60 * 1000,
  maxRequests: 100,
  skip: (request) => {
    return request.headers.get('x-internal') === 'true';
  },
});

// ❌ Bad - No skip logic
const rateLimit = createRateLimitMiddleware({
  windowMs: 60 * 1000,
  maxRequests: 100,
  // No skip logic - internal requests also rate limited
});
```

---

## Rate Limit Functions Reference

| Function | Description |
|----------|-------------|
| `createRateLimitMiddleware()` | Create custom rate limit middleware |
| `withRateLimit()` | Wrap handler with rate limiting |
| `rateLimit()` | Decorator for rate limiting |
| `getRateLimitStatus()` | Get rate limit status for request |
| `resetRateLimit()` | Reset rate limit for request |
| `clearAllRateLimits()` | Clear all rate limits (testing) |

### Pre-configured Rate Limits

| Function | Limit | Window | Usage |
|----------|--------|--------|--------|
| `authRateLimit` | 5 requests | 1 minute | Authentication endpoints |
| `chartRateLimit` | 10 requests | 1 minute | Chart calculation endpoints |
| `stripeRateLimit` | 50 requests | 1 minute | Stripe webhook endpoints |
| `adminRateLimit` | 200 requests | 1 minute | Admin endpoints |
| `generalRateLimit` | 100 requests | 1 minute | General API endpoints |

---

## Troubleshooting

### Rate Limit Not Working

1. **Check middleware configuration**
   ```typescript
   // Verify rate limit is applied correctly
   ```

2. **Check key generation**
   ```typescript
   const key = generateRateLimitKey(request);
   console.log('Rate limit key:', key);
   ```

3. **Check rate limit status**
   ```typescript
   const status = await getRateLimitStatus(request, config);
   console.log('Rate limit status:', status);
   ```

### Rate Limit Too Strict

1. **Increase maxRequests**
   ```typescript
   const rateLimit = createRateLimitMiddleware({
     windowMs: 60 * 1000,
     maxRequests: 200, // Increased from 100
   });
   ```

2. **Increase window size**
   ```typescript
   const rateLimit = createRateLimitMiddleware({
     windowMs: 5 * 60 * 1000, // 5 minutes instead of 1
     maxRequests: 100,
   });
   ```

3. **Use custom key generator**
   ```typescript
   const rateLimit = createRateLimitMiddleware({
     windowMs: 60 * 1000,
     maxRequests: 100,
     keyGenerator: (request) => {
       // More granular key generation
       return `${ip}:${path}`;
     },
   });
   ```

### Rate Limit Headers Not Showing

1. **Enable headers**
   ```typescript
   const rateLimit = createRateLimitMiddleware({
     windowMs: 60 * 1000,
     maxRequests: 100,
     headers: true, // Ensure headers are enabled
   });
   ```

2. **Check response object**
   ```typescript
   // Verify response headers are set
   console.log('Response headers:', response.headers);
   ```

---

## References

- [Rate Limiting Implementation](../middleware/rate-limit.middleware.ts)
- [Caching Documentation](./CACHING.md)
- [API Documentation](./API.md)
