# Database Documentation

## Table of Contents

1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Database Schema](#database-schema)
4. [Models](#models)
5. [Relationships](#relationships)
6. [Indexes](#indexes)
7. [Migrations](#migrations)
8. [Best Practices](#best-practices)

---

## Overview

The Astrowellness platform uses PostgreSQL as the primary database, managed through Prisma ORM. The database stores user information, subscription data, chart calculations, and other application data.

### Key Features
- **PostgreSQL**: Robust relational database
- **Prisma ORM**: Type-safe database access
- **Migrations**: Version-controlled schema changes
- **Connection Pooling**: Efficient connection management

---

## Technology Stack

### Database
- **Database**: PostgreSQL 14+
- **ORM**: Prisma
- **Migration Tool**: Prisma Migrate

### Prisma Configuration

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

---

## Database Schema

### Complete Schema

```prisma
model User {
  id                String   @id @default(cuid())
  email             String   @unique
  emailVerified     DateTime?
  name              String?
  password          String?
  image             String?
  role              Role     @default(USER)
  subscription      Subscription?
  accounts          Account[]
  sessions          Session[]
  natalData         NatalData?
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  @@map("users")
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@map("accounts")
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("sessions")
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
  @@map("verification_tokens")
}

model Subscription {
  id                String    @id @default(cuid())
  userId            String    @unique
  stripeCustomerId  String?   @unique
  stripeSubscriptionId String? @unique
  stripePriceId     String?
  status            SubscriptionStatus @default(INACTIVE)
  currentPeriodEnd  DateTime?
  cancelAtPeriodEnd Boolean   @default(false)
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("subscriptions")
}

model NatalData {
  id              String   @id @default(cuid())
  userId          String   @unique
  birthDate       DateTime
  location        String
  latitude        Float?
  longitude       Float?
  timezone        String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("natal_data")
}

model ChartCache {
  id              String   @id @default(cuid())
  userId          String?
  chartType       ChartType
  chartData       Json
  interpretation  String?  @db.Text
  createdAt       DateTime @default(now())
  expiresAt       DateTime

  @@index([userId, chartType])
  @@index([expiresAt])
  @@map("chart_cache")
}
```

---

## Models

### User

Represents a user of the application.

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Unique identifier (CUID) |
| `email` | String | User email (unique) |
| `emailVerified` | DateTime? | Email verification timestamp |
| `name` | String? | User display name |
| `password` | String? | Hashed password |
| `image` | String? | Profile image URL |
| `role` | Role | User role (USER, ADMIN) |
| `subscription` | Subscription? | User subscription |
| `accounts` | Account[] | OAuth accounts |
| `sessions` | Session[] | User sessions |
| `natalData` | NatalData? | Birth information |
| `createdAt` | DateTime | Creation timestamp |
| `updatedAt` | DateTime | Last update timestamp |

### Account

Represents an OAuth account linked to a user.

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Unique identifier (CUID) |
| `userId` | String | Reference to User |
| `type` | String | OAuth provider type |
| `provider` | String | OAuth provider name |
| `providerAccountId` | String | Provider account ID |
| `refresh_token` | String? | OAuth refresh token |
| `access_token` | String? | OAuth access token |
| `expires_at` | Int? | Token expiration timestamp |
| `token_type` | String? | Token type |
| `scope` | String? | Token scope |
| `id_token` | String? | ID token |
| `session_state` | String? | Session state |

### Session

Represents a user session.

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Unique identifier (CUID) |
| `sessionToken` | String | Session token (unique) |
| `userId` | String | Reference to User |
| `expires` | DateTime | Session expiration |

### VerificationToken

Represents an email verification token.

| Field | Type | Description |
|-------|------|-------------|
| `identifier` | String | Email address |
| `token` | String | Verification token |
| `expires` | DateTime | Token expiration |

### Subscription

Represents a user's subscription.

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Unique identifier (CUID) |
| `userId` | String | Reference to User (unique) |
| `stripeCustomerId` | String? | Stripe customer ID |
| `stripeSubscriptionId` | String? | Stripe subscription ID |
| `stripePriceId` | String? | Stripe price ID |
| `status` | SubscriptionStatus | Subscription status |
| `currentPeriodEnd` | DateTime? | Current period end |
| `cancelAtPeriodEnd` | Boolean | Cancel at period end flag |
| `createdAt` | DateTime | Creation timestamp |
| `updatedAt` | DateTime | Last update timestamp |

### NatalData

Represents a user's birth information.

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Unique identifier (CUID) |
| `userId` | String | Reference to User (unique) |
| `birthDate` | DateTime | Date and time of birth |
| `location` | String | Birth location |
| `latitude` | Float? | Latitude coordinate |
| `longitude` | Float? | Longitude coordinate |
| `timezone` | String? | Timezone |
| `createdAt` | DateTime | Creation timestamp |
| `updatedAt` | DateTime | Last update timestamp |

### ChartCache

Represents cached chart calculations.

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Unique identifier (CUID) |
| `userId` | String? | Reference to User (optional) |
| `chartType` | ChartType | Type of chart |
| `chartData` | Json | Chart calculation data |
| `interpretation` | String? | Chart interpretation |
| `createdAt` | DateTime | Creation timestamp |
| `expiresAt` | DateTime | Cache expiration |

---

## Relationships

### User Relationships

```
User (1) ─── (N) Account
User (1) ─── (N) Session
User (1) ─── (1) Subscription
User (1) ─── (1) NatalData
```

### Relationship Details

#### User → Account (One-to-Many)
- A user can have multiple OAuth accounts
- Accounts are deleted when user is deleted (Cascade)

#### User → Session (One-to-Many)
- A user can have multiple active sessions
- Sessions are deleted when user is deleted (Cascade)

#### User → Subscription (One-to-One)
- A user can have at most one subscription
- Subscription is deleted when user is deleted (Cascade)

#### User → NatalData (One-to-One)
- A user can have at most one natal data record
- Natal data is deleted when user is deleted (Cascade)

---

## Indexes

### User Indexes
- `email`: Unique index on email field

### Account Indexes
- `[provider, providerAccountId]`: Unique composite index

### Session Indexes
- `sessionToken`: Unique index on session token

### VerificationToken Indexes
- `[identifier, token]`: Unique composite index

### Subscription Indexes
- `userId`: Unique index on user ID
- `stripeCustomerId`: Unique index on Stripe customer ID
- `stripeSubscriptionId`: Unique index on Stripe subscription ID

### NatalData Indexes
- `userId`: Unique index on user ID

### ChartCache Indexes
- `[userId, chartType]`: Composite index for user/chart type lookups
- `expiresAt`: Index for cache expiration queries

---

## Enums

### Role

```prisma
enum Role {
  USER
  ADMIN
}
```

### SubscriptionStatus

```prisma
enum SubscriptionStatus {
  INACTIVE
  ACTIVE
  CANCELLED
  PAST_DUE
  TRIALING
}
```

### ChartType

```prisma
enum ChartType {
  TROPICAL
  DRACONIC
  HORARY
  SYNASTRY
  PROGRESSED
  SOLAR_RETURN
}
```

---

## Migrations

### Migration Commands

```bash
# Create a new migration
npx prisma migrate dev --name <migration_name>

# Apply migrations in production
npx prisma migrate deploy

# Reset database (development only)
npx prisma migrate reset

# Generate Prisma Client
npx prisma generate

# Open Prisma Studio
npx prisma studio
```

### Migration Files

Migration files are stored in `prisma/migrations/` directory.

Each migration includes:
- Migration SQL file
- Migration lock file

### Example Migration

```sql
-- CreateIndex
CREATE INDEX "chart_cache_userId_chartType_idx" ON "chart_cache"("userId", "chartType");

-- DropIndex
DROP INDEX IF EXISTS "chart_cache_userId_chartType_idx";
```

---

## Best Practices

### Query Optimization

1. **Use Selective Queries**
   ```typescript
   // ✅ Good - Select only needed fields
   const user = await prisma.user.findUnique({
     where: { id: userId },
     select: { id: true, name: true, email: true }
   });

   // ❌ Bad - Select all fields
   const user = await prisma.user.findUnique({
     where: { id: userId }
   });
   ```

2. **Use Indexes**
   ```typescript
   // ✅ Good - Query uses index
   const users = await prisma.user.findMany({
     where: { email: 'user@example.com' }
   });

   // ❌ Bad - Query doesn't use index
   const users = await prisma.user.findMany({
     where: { name: { contains: 'John' } }
   });
   ```

3. **Batch Operations**
   ```typescript
   // ✅ Good - Batch insert
   await prisma.user.createMany({
     data: users
   });

   // ❌ Bad - Individual inserts
   for (const user of users) {
     await prisma.user.create({ data: user });
   }
   ```

### Transaction Management

```typescript
// ✅ Good - Use transactions for related operations
await prisma.$transaction(async (tx) => {
  const user = await tx.user.create({ data: userData });
  await tx.subscription.create({
    data: { userId: user.id, ...subscriptionData }
  });
});
```

### Error Handling

```typescript
// ✅ Good - Handle Prisma errors
try {
  const user = await prisma.user.create({ data: userData });
} catch (error) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      // Unique constraint violation
      throw new ValidationError('Email already exists');
    }
  }
  throw error;
}
```

### Connection Management

```typescript
// ✅ Good - Use singleton Prisma Client
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

---

## Database Connection

### Connection String

```
postgresql://USER:PASSWORD@HOST:PORT/DATABASE
```

### Environment Variables

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/astrowellness"
```

### Connection Pooling

```typescript
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});
```

---

## Backup and Recovery

### Backup Commands

```bash
# Create backup
pg_dump -U user -d astrowellness > backup.sql

# Restore backup
psql -U user -d astrowellness < backup.sql
```

### Automated Backups

For production, use:
- Managed database backups (e.g., Fly.io, AWS RDS)
- Point-in-time recovery
- Cross-region replication

---

## Security

### Best Practices

1. **Never store plain text passwords**
   - Always hash passwords using bcrypt
   - Use a strong salt

2. **Use parameterized queries**
   - Prisma automatically handles this
   - Never concatenate SQL strings

3. **Principle of least privilege**
   - Database user should have minimum required permissions
   - Separate read/write users if needed

4. **Encrypt sensitive data**
   - Consider encryption for sensitive fields
   - Use application-level encryption

5. **Regular security updates**
   - Keep PostgreSQL updated
   - Keep Prisma updated

---

## Database Utilities

The platform provides utility functions for building optimized database queries, pagination, and caching.

### Query Builder

The query builder utilities ([`lib/database/query-builder.ts`](../lib/database/query-builder.ts)) provide functions for building optimized Prisma queries.

```typescript
import { buildPaginationParams, buildSortParams, buildFilterParams } from '@/lib/database/query-builder';

// Build pagination parameters
const pagination = buildPaginationParams({ page: 1, limit: 10 });

// Build sort parameters
const sort = buildSortParams([
  { field: 'createdAt', order: 'desc' },
]);

// Build filter parameters
const filter = buildFilterParams([
  { field: 'email', operator: 'eq', value: 'user@example.com' },
]);

// Build complete query parameters
const params = buildQueryParams({
  pagination,
  sort,
  filter,
  select: { id: true, name: true, email: true },
});
```

### Pagination

The pagination utilities ([`lib/database/pagination.ts`](../lib/database/pagination.ts)) provide functions for handling paginated queries.

```typescript
import { parsePaginationParams, createPaginatedResult } from '@/lib/database/pagination';

// Parse pagination from request
const { page, limit } = parsePaginationParams(request.query, 10, 100);

// Create paginated result
const result = createPaginatedResult(data, total, page, limit);
```

### Database Caching

The database caching utilities ([`lib/database/cache.ts`](../lib/database/cache.ts) and [`lib/cache/db-cache.ts`](../lib/cache/db-cache.ts)) provide caching for database queries.

```typescript
import { cachedDbQuery, cacheUserQuery } from '@/lib/cache/db-cache';

// Cache a database query
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

// Cache user query with helper
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

### Cache Invalidation

```typescript
import {
  invalidateUserCache,
  invalidateChartCache,
  invalidateSubscriptionCache,
} from '@/lib/cache/db-cache';

// Invalidate user cache
await invalidateUserCache(userId);

// Invalidate chart cache
await invalidateChartCache(userId, 'tropical');

// Invalidate subscription cache
await invalidateSubscriptionCache(userId);
```

---

## Performance Optimization

### Query Optimization Strategies

1. **Use Selective Queries**
   ```typescript
   // ✅ Good - Select only needed fields
   const user = await prisma.user.findUnique({
     where: { id: userId },
     select: { id: true, name: true, email: true }
   });
   ```

2. **Use Indexes**
   ```typescript
   // ✅ Good - Query uses index
   const users = await prisma.user.findMany({
     where: { email: 'user@example.com' }
   });
   ```

3. **Use Include for Relations**
   ```typescript
   // ✅ Good - Avoid N+1 queries
   const user = await prisma.user.findUnique({
     where: { id: userId },
     include: { subscription: true }
   });
   ```

4. **Use Batch Operations**
   ```typescript
   // ✅ Good - Batch insert
   await prisma.user.createMany({
     data: users
   });
   ```

### Cache Strategy

1. **Cache Frequently Accessed Data**
   ```typescript
   // Cache user profile data
   const user = await cacheUserQuery(userId, queryFn, 10 * 60 * 1000);
   ```

2. **Use Appropriate TTL**
   ```typescript
   // Static data: 1 hour
   // User data: 5 minutes
   // Subscription status: 1 minute
   ```

3. **Invalidate Cache on Changes**
   ```typescript
   async function updateUser(userId: string, data: any) {
     await prisma.user.update({ where: { id: userId }, data });
     await invalidateUserCache(userId); // Invalidate cache
   }
   ```

### Monitoring

```typescript
import { getDbCacheStats, getCacheHitRate } from '@/lib/cache/db-cache';

// Monitor cache performance
const stats = getDbCacheStats();
const hitRate = getCacheHitRate();

console.log('Cache hit rate:', hitRate, '%');
console.log('Cache hits:', stats.hits);
console.log('Cache misses:', stats.misses);
```

---

## Related Documentation

- [Architecture Documentation](./ARCHITECTURE.md)
- [API Documentation](./API.md)
- [Development Guide](./DEVELOPMENT.md)
- [Caching Documentation](./CACHING.md)
- [Prisma Documentation](https://www.prisma.io/docs)
