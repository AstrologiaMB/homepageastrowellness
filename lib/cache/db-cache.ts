/**
 * Database Cache Utilities
 *
 * Provides caching utilities specifically for database queries,
 * including query result caching, cache invalidation, and
 * cache warming strategies.
 */


/**
 * Cache configuration for database queries
 */
export interface DbCacheConfig {
  ttl: number; // Time to live in milliseconds
  key: string; // Cache key
  tags?: string[]; // Cache tags for invalidation
  staleWhileRevalidate?: number; // Serve stale content while revalidating
}

/**
 * Cache statistics
 */
export interface DbCacheStats {
  hits: number;
  misses: number;
  sets: number;
  deletes: number;
  size: number;
}

/**
 * In-memory cache storage for database queries
 */
const dbCache = new Map<string, { data: unknown; timestamp: number; config: DbCacheConfig; tags: string[] }>();

/**
 * Cache statistics tracker
 */
const cacheStats: DbCacheStats = {
  hits: 0,
  misses: 0,
  sets: 0,
  deletes: 0,
  size: 0,
};

/**
 * Tag to cache keys mapping for invalidation
 */
const tagIndex = new Map<string, Set<string>>();

/**
 * Default cache TTL in milliseconds (5 minutes)
 */
const DEFAULT_TTL = 5 * 60 * 1000;

/**
 * Get data from database cache
 *
 * @param key - Cache key
 * @returns Cached data or null if not found or expired
 */
export function getDbCache<T>(key: string): T | null {
  const entry = dbCache.get(key);

  if (!entry) {
    cacheStats.misses++;
    return null;
  }

  const now = Date.now();
  const age = now - entry.timestamp;

  // Check if cache entry has expired
  if (age > entry.config.ttl) {
    // Check if stale-while-revalidate is enabled
    if (entry.config.staleWhileRevalidate && age <= entry.config.ttl + entry.config.staleWhileRevalidate) {
      cacheStats.hits++;
      return entry.data as T;
    }

    dbCache.delete(key);
    cacheStats.misses++;
    return null;
  }

  cacheStats.hits++;
  return entry.data as T;
}

/**
 * Set data in database cache
 *
 * @param key - Cache key
 * @param data - Data to cache
 * @param config - Cache configuration
 */
export function setDbCache<T>(key: string, data: T, config: DbCacheConfig): void {
  const tags = config.tags || [];

  const entry = {
    data,
    timestamp: Date.now(),
    config,
    tags,
  };

  dbCache.set(key, entry);
  cacheStats.sets++;
  cacheStats.size = dbCache.size;

  // Update tag index
  for (const tag of tags) {
    if (!tagIndex.has(tag)) {
      tagIndex.set(tag, new Set());
    }
    tagIndex.get(tag)!.add(key);
  }
}

/**
 * Delete data from database cache
 *
 * @param key - Cache key
 * @returns True if key was found and deleted
 */
export function deleteDbCache(key: string): boolean {
  const entry = dbCache.get(key);

  if (entry) {
    // Remove from tag index
    for (const tag of entry.tags) {
      const keys = tagIndex.get(tag);
      if (keys) {
        keys.delete(key);
        if (keys.size === 0) {
          tagIndex.delete(tag);
        }
      }
    }

    dbCache.delete(key);
    cacheStats.deletes++;
    cacheStats.size = dbCache.size;
    return true;
  }

  return false;
}

/**
 * Invalidate cache by tag
 *
 * @param tag - Cache tag
 * @returns Number of entries invalidated
 */
export function invalidateByTag(tag: string): number {
  const keys = tagIndex.get(tag);

  if (!keys) {
    return 0;
  }

  let count = 0;
  for (const key of keys) {
    if (deleteDbCache(key)) {
      count++;
    }
  }

  return count;
}

/**
 * Invalidate multiple tags
 *
 * @param tags - Array of cache tags
 * @returns Total number of entries invalidated
 */
export function invalidateTags(tags: string[]): number {
  let total = 0;
  for (const tag of tags) {
    total += invalidateByTag(tag);
  }
  return total;
}

/**
 * Clear all database cache entries
 */
export function clearDbCache(): void {
  dbCache.clear();
  tagIndex.clear();
  cacheStats.size = 0;
}

/**
 * Get cache statistics
 *
 * @returns Cache statistics
 */
export function getDbCacheStats(): DbCacheStats {
  return { ...cacheStats };
}

/**
 * Reset cache statistics
 */
export function resetDbCacheStats(): void {
  cacheStats.hits = 0;
  cacheStats.misses = 0;
  cacheStats.sets = 0;
  cacheStats.deletes = 0;
  cacheStats.size = dbCache.size;
}

/**
 * Calculate cache hit rate
 *
 * @returns Cache hit rate as a percentage
 */
export function getCacheHitRate(): number {
  const total = cacheStats.hits + cacheStats.misses;
  return total > 0 ? (cacheStats.hits / total) * 100 : 0;
}

/**
 * Execute a cached database query
 *
 * @param key - Cache key
 * @param queryFn - Function that executes the database query
 * @param config - Cache configuration
 * @returns Query result
 */
export async function cachedDbQuery<T>(
  key: string,
  queryFn: () => Promise<T>,
  config: DbCacheConfig
): Promise<T> {
  // Try to get from cache
  const cached = getDbCache<T>(key);
  if (cached !== null) {
    return cached;
  }

  // Execute query
  const result = await queryFn();

  // Cache the result
  setDbCache(key, result, config);

  return result;
}

/**
 * Cache user query
 *
 * @param userId - User ID
 * @param queryFn - Query function
 * @param ttl - Time to live in milliseconds
 * @returns User data
 */
export async function cacheUserQuery<T>(
  userId: string,
  queryFn: () => Promise<T>,
  ttl: number = DEFAULT_TTL
): Promise<T> {
  const config: DbCacheConfig = {
    ttl,
    key: `user:${userId}`,
    tags: ['user', `user:${userId}`],
  };

  return cachedDbQuery(config.key, queryFn, config);
}

/**
 * Cache chart query
 *
 * @param userId - User ID
 * @param chartType - Chart type
 * @param queryFn - Query function
 * @param ttl - Time to live in milliseconds
 * @returns Chart data
 */
export async function cacheChartQuery<T>(
  userId: string,
  chartType: string,
  queryFn: () => Promise<T>,
  ttl: number = DEFAULT_TTL
): Promise<T> {
  const config: DbCacheConfig = {
    ttl,
    key: `chart:${userId}:${chartType}`,
    tags: ['chart', `chart:${userId}`, `chart:${chartType}`],
  };

  return cachedDbQuery(config.key, queryFn, config);
}

/**
 * Cache subscription query
 *
 * @param userId - User ID
 * @param queryFn - Query function
 * @param ttl - Time to live in milliseconds
 * @returns Subscription data
 */
export async function cacheSubscriptionQuery<T>(
  userId: string,
  queryFn: () => Promise<T>,
  ttl: number = DEFAULT_TTL
): Promise<T> {
  const config: DbCacheConfig = {
    ttl,
    key: `subscription:${userId}`,
    tags: ['subscription', `subscription:${userId}`],
  };

  return cachedDbQuery(config.key, queryFn, config);
}

/**
 * Cache calendar query
 *
 * @param userId - User ID
 * @param year - Calendar year
 * @param queryFn - Query function
 * @param ttl - Time to live in milliseconds
 * @returns Calendar data
 */
export async function cacheCalendarQuery<T>(
  userId: string,
  year: number,
  queryFn: () => Promise<T>,
  ttl: number = DEFAULT_TTL
): Promise<T> {
  const config: DbCacheConfig = {
    ttl,
    key: `calendar:${userId}:${year}`,
    tags: ['calendar', `calendar:${userId}`, `calendar:${year}`],
  };

  return cachedDbQuery(config.key, queryFn, config);
}

/**
 * Invalidate user cache
 *
 * @param userId - User ID
 * @returns Number of entries invalidated
 */
export function invalidateUserCache(userId: string): number {
  return invalidateTags(['user', `user:${userId}`]);
}

/**
 * Invalidate chart cache
 *
 * @param userId - User ID
 * @param chartType - Chart type (optional)
 * @returns Number of entries invalidated
 */
export function invalidateChartCache(userId: string, chartType?: string): number {
  const tags = ['chart', `chart:${userId}`];
  if (chartType) {
    tags.push(`chart:${chartType}`);
  }
  return invalidateTags(tags);
}

/**
 * Invalidate subscription cache
 *
 * @param userId - User ID
 * @returns Number of entries invalidated
 */
export function invalidateSubscriptionCache(userId: string): number {
  return invalidateTags(['subscription', `subscription:${userId}`]);
}

/**
 * Invalidate calendar cache
 *
 * @param userId - User ID
 * @param year - Calendar year (optional)
 * @returns Number of entries invalidated
 */
export function invalidateCalendarCache(userId: string, year?: number): number {
  const tags = ['calendar', `calendar:${userId}`];
  if (year) {
    tags.push(`calendar:${year}`);
  }
  return invalidateTags(tags);
}

/**
 * Clean up expired cache entries
 *
 * @returns Number of entries cleaned up
 */
export function cleanupExpiredDbCache(): number {
  let cleaned = 0;
  const now = Date.now();

  for (const [key, entry] of dbCache.entries()) {
    const age = now - entry.timestamp;

    // Check if expired (including stale-while-revalidate period)
    const maxAge = entry.config.staleWhileRevalidate
      ? entry.config.ttl + entry.config.staleWhileRevalidate
      : entry.config.ttl;

    if (age > maxAge) {
      deleteDbCache(key);
      cleaned++;
    }
  }

  return cleaned;
}

/**
 * Warm up cache with common queries
 *
 * @param warmupFn - Function that executes warmup queries
 */
export async function warmupCache(warmupFn: () => Promise<void>): Promise<void> {
  await warmupFn();
}

/**
 * Get all cache keys
 *
 * @returns Array of cache keys
 */
export function getDbCacheKeys(): string[] {
  return Array.from(dbCache.keys());
}

/**
 * Get cache entries by tag
 *
 * @param tag - Cache tag
 * @returns Array of cache keys with this tag
 */
export function getKeysByTag(tag: string): string[] {
  const keys = tagIndex.get(tag);
  return keys ? Array.from(keys) : [];
}

/**
 * Cache size in bytes (estimated)
 *
 * @returns Estimated cache size in bytes
 */
export function getCacheSizeBytes(): number {
  let size = 0;

  for (const [key, entry] of dbCache.entries()) {
    size += key.length * 2; // String character size
    size += JSON.stringify(entry.data).length * 2;
  }

  return size;
}
