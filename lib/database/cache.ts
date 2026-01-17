/**
 * Database Cache Utilities
 *
 * Provides caching utilities for database queries to improve performance
 * and reduce database load.
 */


/**
 * Cache entry interface
 */
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

/**
 * In-memory cache storage
 */
const memoryCache = new Map<string, CacheEntry<unknown>>();

/**
 * Default cache TTL in milliseconds (5 minutes)
 */
const DEFAULT_CACHE_TTL = 5 * 60 * 1000;

/**
 * Cache configuration options
 */
export interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
  key?: string; // Custom cache key
  skipCache?: boolean; // Skip caching for this query
}

/**
 * Generate a cache key from query parameters
 *
 * @param prefix - Cache key prefix (e.g., 'user', 'chart')
 * @param params - Query parameters
 * @returns Generated cache key
 */
export function generateCacheKey(prefix: string, params: Record<string, unknown>): string {
  const sortedParams = Object.keys(params)
    .sort()
    .map((key) => `${key}:${JSON.stringify(params[key])}`)
    .join('|');

  return `${prefix}:${sortedParams}`;
}

/**
 * Get data from cache
 *
 * @param key - Cache key
 * @returns Cached data or null if not found or expired
 */
export function getFromCache<T>(key: string): T | null {
  const entry = memoryCache.get(key);

  if (!entry) {
    return null;
  }

  // Check if cache entry has expired
  if (Date.now() - entry.timestamp > entry.ttl) {
    memoryCache.delete(key);
    return null;
  }

  return entry.data as T;
}

/**
 * Set data in cache
 *
 * @param key - Cache key
 * @param data - Data to cache
 * @param ttl - Time to live in milliseconds
 */
export function setCache<T>(key: string, data: T, ttl: number = DEFAULT_CACHE_TTL): void {
  const entry: CacheEntry<T> = {
    data,
    timestamp: Date.now(),
    ttl,
  };

  memoryCache.set(key, entry);
}

/**
 * Delete data from cache
 *
 * @param key - Cache key
 * @returns True if key was found and deleted
 */
export function deleteCache(key: string): boolean {
  return memoryCache.delete(key);
}

/**
 * Clear all cache entries
 */
export function clearCache(): void {
  memoryCache.clear();
}

/**
 * Clear cache entries matching a pattern
 *
 * @param pattern - Pattern to match (e.g., 'user:*')
 */
export function clearCachePattern(pattern: string): void {
  const regex = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$');

  for (const key of memoryCache.keys()) {
    if (regex.test(key)) {
      memoryCache.delete(key);
    }
  }
}

/**
 * Execute a cached database query
 *
 * @param key - Cache key
 * @param queryFn - Function that executes the database query
 * @param options - Cache options
 * @returns Query result
 */
export async function cachedQuery<T>(
  key: string,
  queryFn: () => Promise<T>,
  options: CacheOptions = {}
): Promise<T> {
  const { ttl = DEFAULT_CACHE_TTL, skipCache = false } = options;

  // Skip cache if requested
  if (skipCache) {
    return await queryFn();
  }

  // Try to get from cache
  const cached = getFromCache<T>(key);
  if (cached !== null) {
    return cached;
  }

  // Execute query
  const result = await queryFn();

  // Cache the result
  setCache(key, result, ttl);

  return result;
}

/**
 * Cache user data
 *
 * @param userId - User ID
 * @param queryFn - Function that executes the database query
 * @param options - Cache options
 * @returns User data
 */
export async function cacheUser<T>(
  userId: string,
  queryFn: () => Promise<T>,
  options: CacheOptions = {}
): Promise<T> {
  const key = `user:${userId}`;
  return cachedQuery(key, queryFn, options);
}

/**
 * Cache chart data
 *
 * @param userId - User ID
 * @param chartType - Chart type
 * @param queryFn - Function that executes the database query
 * @param options - Cache options
 * @returns Chart data
 */
export async function cacheChart<T>(
  userId: string,
  chartType: string,
  queryFn: () => Promise<T>,
  options: CacheOptions = {}
): Promise<T> {
  const key = `chart:${userId}:${chartType}`;
  return cachedQuery(key, queryFn, options);
}

/**
 * Invalidate user cache
 *
 * @param userId - User ID
 */
export function invalidateUserCache(userId: string): void {
  clearCachePattern(`user:${userId}*`);
}

/**
 * Invalidate chart cache
 *
 * @param userId - User ID
 * @param chartType - Chart type (optional)
 */
export function invalidateChartCache(userId: string, chartType?: string): void {
  if (chartType) {
    deleteCache(`chart:${userId}:${chartType}`);
  } else {
    clearCachePattern(`chart:${userId}*`);
  }
}

/**
 * Invalidate subscription cache
 *
 * @param userId - User ID
 */
export function invalidateSubscriptionCache(userId: string): void {
  clearCachePattern(`subscription:${userId}*`);
}

/**
 * Get cache statistics
 *
 * @returns Cache statistics
 */
export function getCacheStats(): {
  size: number;
  keys: string[];
} {
  return {
    size: memoryCache.size,
    keys: Array.from(memoryCache.keys()),
  };
}

/**
 * Clean up expired cache entries
 *
 * @returns Number of entries cleaned up
 */
export function cleanupExpiredCache(): number {
  let cleaned = 0;
  const now = Date.now();

  for (const [key, entry] of memoryCache.entries()) {
    if (now - entry.timestamp > entry.ttl) {
      memoryCache.delete(key);
      cleaned++;
    }
  }

  return cleaned;
}

/**
 * Prisma cache decorator for findUnique queries
 *
 * @param model - Prisma model
 * @param options - Cache options
 * @returns Decorated findUnique function
 */
export function createCachedFindUnique<T>(
  model: any,
  options: CacheOptions = {}
) {
  return async (where: Record<string, unknown>, select?: Record<string, boolean>): Promise<T | null> => {
    const key = generateCacheKey(model.modelName || model.name, { where, select });

    return cachedQuery(
      key,
      () => model.findUnique({ where, select }),
      options
    );
  };
}

/**
 * Prisma cache decorator for findMany queries
 *
 * @param model - Prisma model
 * @param options - Cache options
 * @returns Decorated findMany function
 */
export function createCachedFindMany<T>(
  model: any,
  options: CacheOptions = {}
) {
  return async (params: Record<string, unknown> = {}): Promise<T[]> => {
    const key = generateCacheKey(model.modelName || model.name, params);

    return cachedQuery(
      key,
      () => model.findMany(params),
      options
    );
  };
}

/**
 * Create a cache key for a specific entity
 *
 * @param entityType - Type of entity (user, chart, etc.)
 * @param entityId - ID of the entity
 * @returns Cache key
 */
export function createEntityCacheKey(entityType: string, entityId: string): string {
  return `${entityType}:${entityId}`;
}

/**
 * Batch cache operations
 */
export class BatchCache {
  private operations: Array<() => void> = [];

  /**
   * Add a set operation to the batch
   */
  set<T>(key: string, data: T, ttl?: number): void {
    this.operations.push(() => setCache(key, data, ttl));
  }

  /**
   * Add a delete operation to the batch
   */
  delete(key: string): void {
    this.operations.push(() => deleteCache(key));
  }

  /**
   * Execute all batched operations
   */
  execute(): void {
    for (const operation of this.operations) {
      operation();
    }
    this.operations = [];
  }

  /**
   * Clear all batched operations without executing
   */
  clear(): void {
    this.operations = [];
  }
}
