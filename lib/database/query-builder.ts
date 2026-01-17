/**
 * Query Builder Utilities
 *
 * Provides utility functions for building optimized database queries
 * with Prisma, including pagination, sorting, and filtering capabilities.
 */

/**
 * Pagination options interface
 */
export interface PaginationOptions {
  page?: number;
  limit?: number;
  skip?: number;
}

/**
 * Sort options interface
 */
export interface SortOptions {
  field: string;
  order?: 'asc' | 'desc';
}

/**
 * Filter options interface
 */
export interface FilterOptions {
  field: string;
  operator?: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'contains' | 'startsWith' | 'endsWith' | 'in';
  value: unknown;
}

/**
 * Query builder result interface
 */
export interface QueryBuilderResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

/**
 * Build pagination parameters for Prisma queries
 *
 * @param options - Pagination options
 * @returns Prisma pagination parameters
 */
export function buildPaginationParams(options: PaginationOptions = {}): {
  skip?: number;
  take?: number;
} {
  const { page = 1, limit = 10, skip } = options;

  if (skip !== undefined) {
    return { skip };
  }

  return {
    skip: (page - 1) * limit,
    take: limit,
  };
}

/**
 * Build sort parameters for Prisma queries
 *
 * @param sorts - Array of sort options
 * @returns Prisma sort parameters
 */
export function buildSortParams(sorts: SortOptions[]): Record<string, 'asc' | 'desc'> {
  const sortParams: Record<string, 'asc' | 'desc'> = {};

  for (const sort of sorts) {
    sortParams[sort.field] = sort.order || 'asc';
  }

  return sortParams;
}

/**
 * Build filter parameters for Prisma queries
 *
 * @param filters - Array of filter options
 * @returns Prisma where clause
 */
export function buildFilterParams(filters: FilterOptions[]): Record<string, unknown> {
  const whereParams: Record<string, unknown> = {};

  for (const filter of filters) {
    const { field, operator = 'eq', value } = filter;

    switch (operator) {
      case 'eq':
        whereParams[field] = value;
        break;
      case 'ne':
        whereParams[field] = { not: value };
        break;
      case 'gt':
        whereParams[field] = { gt: value };
        break;
      case 'gte':
        whereParams[field] = { gte: value };
        break;
      case 'lt':
        whereParams[field] = { lt: value };
        break;
      case 'lte':
        whereParams[field] = { lte: value };
        break;
      case 'contains':
        whereParams[field] = { contains: value as string, mode: 'insensitive' };
        break;
      case 'startsWith':
        whereParams[field] = { startsWith: value as string, mode: 'insensitive' };
        break;
      case 'endsWith':
        whereParams[field] = { endsWith: value as string, mode: 'insensitive' };
        break;
      case 'in':
        whereParams[field] = { in: value as unknown[] };
        break;
    }
  }

  return whereParams;
}

/**
 * Build complete query parameters with pagination, sorting, and filtering
 *
 * @param options - Query options
 * @returns Complete Prisma query parameters
 */
export function buildQueryParams(options: {
  pagination?: PaginationOptions;
  sort?: SortOptions[];
  filter?: FilterOptions[];
  select?: Record<string, boolean>;
  include?: Record<string, boolean | Record<string, boolean>>;
}): {
  skip?: number;
  take?: number;
  orderBy?: Record<string, 'asc' | 'desc'>;
  where?: Record<string, unknown>;
  select?: Record<string, boolean>;
  include?: Record<string, boolean | Record<string, boolean>>;
} {
  const { pagination, sort, filter, select, include } = options;

  const params: {
    skip?: number;
    take?: number;
    orderBy?: Record<string, 'asc' | 'desc'>;
    where?: Record<string, unknown>;
    select?: Record<string, boolean>;
    include?: Record<string, boolean | Record<string, boolean>>;
  } = {};

  if (pagination) {
    Object.assign(params, buildPaginationParams(pagination));
  }

  if (sort && sort.length > 0) {
    params.orderBy = buildSortParams(sort);
  }

  if (filter && filter.length > 0) {
    params.where = buildFilterParams(filter);
  }

  if (select) {
    params.select = select;
  }

  if (include) {
    params.include = include;
  }

  return params;
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
): {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
} {
  const totalPages = Math.ceil(total / limit);

  return {
    page,
    limit,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrevious: page > 1,
  };
}

/**
 * Execute a paginated query
 *
 * @param prisma - Prisma client
 * @param model - Prisma model name
 * @param options - Query options
 * @returns Paginated query result
 */
export async function executePaginatedQuery<T>(
  prisma: any,
  model: string,
  options: {
    pagination?: PaginationOptions;
    sort?: SortOptions[];
    filter?: FilterOptions[];
    select?: Record<string, boolean>;
    include?: Record<string, boolean | Record<string, boolean>>;
  }
): Promise<QueryBuilderResult<T>> {
  const { pagination = { page: 1, limit: 10 }, sort, filter, select, include } = options;
  const { page = 1, limit = 10 } = pagination;

  // Build query parameters
  const params = buildQueryParams({ pagination, sort, filter, select, include });

  // Execute count query
  const total = await prisma[model].count({
    where: filter ? buildFilterParams(filter) : undefined,
  });

  // Execute data query
  const data = await prisma[model].findMany(params);

  // Calculate pagination metadata
  const paginationMetadata = calculatePaginationMetadata(total, page, limit);

  return {
    data,
    pagination: paginationMetadata,
  };
}

/**
 * Build a query with relations to avoid N+1 issues
 *
 * @param relations - Array of relation names to include
 * @returns Prisma include clause
 */
export function buildIncludeClause(relations: string[]): Record<string, boolean> {
  const include: Record<string, boolean> = {};

  for (const relation of relations) {
    include[relation] = true;
  }

  return include;
}

/**
 * Build a nested include clause for deep relations
 *
 * @param relations - Nested relation structure
 * @returns Prisma include clause with nested relations
 */
export function buildNestedIncludeClause(relations: Record<string, boolean | Record<string, boolean>>): Record<string, boolean | Record<string, boolean>> {
  return relations;
}
