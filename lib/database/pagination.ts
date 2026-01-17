/**
 * Pagination Utilities
 *
 * Provides utilities for handling pagination in database queries and API responses.
 */

/**
 * Pagination parameters interface
 */
export interface PaginationParams {
  page: number;
  limit: number;
}

/**
 * Pagination metadata interface
 */
export interface PaginationMetadata {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  nextPage?: number;
  previousPage?: number;
}

/**
 * Pagination result interface
 */
export interface PaginatedResult<T> {
  data: T[];
  pagination: PaginationMetadata;
}

/**
 * Parse pagination parameters from query string
 *
 * @param query - Query parameters from request
 * @param defaultLimit - Default limit per page
 * @param maxLimit - Maximum limit allowed
 * @returns Parsed pagination parameters
 */
export function parsePaginationParams(
  query: Record<string, string | string[] | undefined>,
  defaultLimit: number = 10,
  maxLimit: number = 100
): PaginationParams {
  const pageParam = query.page;
  const limitParam = query.limit;

  let page = 1;
  let limit = defaultLimit;

  // Parse page
  if (typeof pageParam === 'string') {
    const parsedPage = parseInt(pageParam, 10);
    if (!isNaN(parsedPage) && parsedPage > 0) {
      page = parsedPage;
    }
  }

  // Parse limit
  if (typeof limitParam === 'string') {
    const parsedLimit = parseInt(limitParam, 10);
    if (!isNaN(parsedLimit) && parsedLimit > 0) {
      limit = Math.min(parsedLimit, maxLimit);
    }
  }

  return { page, limit };
}

/**
 * Calculate pagination metadata
 *
 * @param total - Total number of records
 * @param page - Current page number
 * @param limit - Number of records per page
 * @returns Pagination metadata
 */
export function calculatePaginationMetadata(
  total: number,
  page: number,
  limit: number
): PaginationMetadata {
  const totalPages = Math.ceil(total / limit);

  return {
    page,
    limit,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrevious: page > 1,
    nextPage: page < totalPages ? page + 1 : undefined,
    previousPage: page > 1 ? page - 1 : undefined,
  };
}

/**
 * Create a paginated result object
 *
 * @param data - Array of data items
 * @param total - Total number of records
 * @param page - Current page number
 * @param limit - Number of records per page
 * @returns Paginated result object
 */
export function createPaginatedResult<T>(
  data: T[],
  total: number,
  page: number,
  limit: number
): PaginatedResult<T> {
  return {
    data,
    pagination: calculatePaginationMetadata(total, page, limit),
  };
}

/**
 * Calculate offset from page and limit
 *
 * @param page - Page number (1-indexed)
 * @param limit - Number of records per page
 * @returns Offset for database query
 */
export function calculateOffset(page: number, limit: number): number {
  return (page - 1) * limit;
}

/**
 * Validate pagination parameters
 *
 * @param page - Page number
 * @param limit - Limit per page
 * @returns Error message if invalid, null if valid
 */
export function validatePaginationParams(
  page: number,
  limit: number
): string | null {
  if (page < 1) {
    return 'Page number must be greater than 0';
  }

  if (limit < 1) {
    return 'Limit must be greater than 0';
  }

  if (limit > 1000) {
    return 'Limit cannot exceed 1000';
  }

  return null;
}

/**
 * Get cursor-based pagination parameters
 *
 * @param cursor - Cursor from previous page
 * @param limit - Number of records per page
 * @returns Cursor-based pagination parameters
 */
export interface CursorPaginationParams {
  cursor?: string;
  limit: number;
}

/**
 * Parse cursor-based pagination parameters
 *
 * @param query - Query parameters from request
 * @param defaultLimit - Default limit per page
 * @returns Cursor-based pagination parameters
 */
export function parseCursorPaginationParams(
  query: Record<string, string | string[] | undefined>,
  defaultLimit: number = 10
): CursorPaginationParams {
  const cursorParam = query.cursor;
  const limitParam = query.limit;

  let limit = defaultLimit;

  // Parse limit
  if (typeof limitParam === 'string') {
    const parsedLimit = parseInt(limitParam, 10);
    if (!isNaN(parsedLimit) && parsedLimit > 0) {
      limit = Math.min(parsedLimit, 100);
    }
  }

  return {
    cursor: typeof cursorParam === 'string' ? cursorParam : undefined,
    limit,
  };
}

/**
 * Cursor-based pagination metadata
 */
export interface CursorPaginationMetadata {
  nextCursor?: string;
  previousCursor?: string;
  limit: number;
  hasMore: boolean;
}

/**
 * Create cursor-based pagination result
 *
 * @param data - Array of data items
 * @param limit - Number of records per page
 * @param hasMore - Whether there are more records
 * @param nextCursor - Cursor for next page
 * @returns Cursor-based paginated result
 */
export function createCursorPaginatedResult<T>(
  data: T[],
  limit: number,
  hasMore: boolean,
  nextCursor?: string
): {
  data: T[];
  pagination: CursorPaginationMetadata;
} {
  return {
    data,
    pagination: {
      nextCursor,
      limit,
      hasMore,
    },
  };
}
