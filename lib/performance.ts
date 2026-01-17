/**
 * Performance Monitoring Utilities
 *
 * This module provides utilities for monitoring and tracking performance metrics
 * across the application, including API response times, database query tracking,
 * and general operation timing.
 */

/**
 * Performance metric data structure
 */
export interface PerformanceMetric {
  name: string;
  duration: number;
  timestamp: number;
  metadata?: Record<string, unknown>;
}

/**
 * Performance tracker class for measuring operation durations
 */
export class PerformanceTracker {
  private startTime: number;
  private name: string;
  private metadata?: Record<string, unknown>;

  /**
   * Creates a new performance tracker
   * @param name - Name of the operation being tracked
   * @param metadata - Optional metadata to attach to the metric
   */
  constructor(name: string, metadata?: Record<string, unknown>) {
    this.name = name;
    this.startTime = performance.now();
    this.metadata = metadata;
  }

  /**
   * Stops tracking and returns the performance metric
   * @returns The performance metric with duration
   */
  stop(): PerformanceMetric {
    const endTime = performance.now();
    const duration = endTime - this.startTime;

    const metric: PerformanceMetric = {
      name: this.name,
      duration,
      timestamp: Date.now(),
      metadata: this.metadata,
    };

    // Log the metric in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Performance] ${this.name}: ${duration.toFixed(2)}ms`, this.metadata || '');
    }

    return metric;
  }
}

/**
 * Performance metrics store for collecting and aggregating metrics
 */
class PerformanceMetricsStore {
  private metrics: PerformanceMetric[] = [];
  private maxMetrics = 1000;

  /**
   * Adds a metric to the store
   * @param metric - The metric to add
   */
  addMetric(metric: PerformanceMetric): void {
    this.metrics.push(metric);

    // Keep only the most recent metrics
    if (this.metrics.length > this.maxMetrics) {
      this.metrics.shift();
    }
  }

  /**
   * Gets all metrics
   * @returns Array of all stored metrics
   */
  getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  /**
   * Gets metrics by name
   * @param name - Name of the metric to filter by
   * @returns Array of matching metrics
   */
  getMetricsByName(name: string): PerformanceMetric[] {
    return this.metrics.filter((m) => m.name === name);
  }

  /**
   * Gets average duration for a metric name
   * @param name - Name of the metric
   * @returns Average duration in milliseconds
   */
  getAverageDuration(name: string): number {
    const metrics = this.getMetricsByName(name);
    if (metrics.length === 0) return 0;

    const total = metrics.reduce((sum, m) => sum + m.duration, 0);
    return total / metrics.length;
  }

  /**
   * Gets statistics for a metric name
   * @param name - Name of the metric
   * @returns Statistics object
   */
  getStatistics(name: string): {
    count: number;
    min: number;
    max: number;
    avg: number;
    p50: number;
    p95: number;
    p99: number;
  } | null {
    const metrics = this.getMetricsByName(name);
    if (metrics.length === 0) return null;

    const durations = metrics.map((m) => m.duration).sort((a, b) => a - b);
    const count = durations.length;
    const min = durations[0];
    const max = durations[count - 1];
    const avg = durations.reduce((sum, d) => sum + d, 0) / count;

    const p50Index = Math.floor(count * 0.5);
    const p95Index = Math.floor(count * 0.95);
    const p99Index = Math.floor(count * 0.99);

    return {
      count,
      min,
      max,
      avg,
      p50: durations[p50Index],
      p95: durations[p95Index],
      p99: durations[p99Index],
    };
  }

  /**
   * Clears all metrics
   */
  clear(): void {
    this.metrics = [];
  }
}

// Global performance metrics store instance
const performanceStore = new PerformanceMetricsStore();

/**
 * Starts tracking a performance metric
 * @param name - Name of the operation to track
 * @param metadata - Optional metadata to attach
 * @returns A performance tracker instance
 */
export function trackPerformance(name: string, metadata?: Record<string, unknown>): PerformanceTracker {
  return new PerformanceTracker(name, metadata);
}

/**
 * Measures an async operation and records its performance
 * @param name - Name of the operation
 * @param operation - The async operation to measure
 * @param metadata - Optional metadata to attach
 * @returns The result of the operation
 */
export async function measureAsync<T>(
  name: string,
  operation: () => Promise<T>,
  metadata?: Record<string, unknown>,
): Promise<T> {
  const tracker = trackPerformance(name, metadata);
  try {
    const result = await operation();
    const metric = tracker.stop();
    performanceStore.addMetric(metric);
    return result;
  } catch (error) {
    tracker.stop();
    throw error;
  }
}

/**
 * Measures a sync operation and records its performance
 * @param name - Name of the operation
 * @param operation - The sync operation to measure
 * @param metadata - Optional metadata to attach
 * @returns The result of the operation
 */
export function measureSync<T>(
  name: string,
  operation: () => T,
  metadata?: Record<string, unknown>,
): T {
  const tracker = trackPerformance(name, metadata);
  try {
    const result = operation();
    const metric = tracker.stop();
    performanceStore.addMetric(metric);
    return result;
  } catch (error) {
    tracker.stop();
    throw error;
  }
}

/**
 * Gets the performance metrics store
 * @returns The global performance metrics store
 */
export function getPerformanceStore(): PerformanceMetricsStore {
  return performanceStore;
}

/**
 * API response time tracking decorator
 * @param name - Name for the API endpoint
 * @returns A function that wraps the API handler
 */
export function trackApiResponseTime<T extends (...args: unknown[]) => Promise<unknown>>(
  name: string,
): (target: unknown, propertyKey: string, descriptor: TypedPropertyDescriptor<T>) => void {
  return function (
    _target: unknown,
    _propertyKey: string,
    descriptor: TypedPropertyDescriptor<T>,
  ): void {
    const originalMethod = descriptor.value;

    if (!originalMethod) {
      return;
    }

    descriptor.value = (async function (this: unknown, ...args: Parameters<T>): Promise<ReturnType<T>> {
      const tracker = trackPerformance(`api:${name}`, {
        method: (args[0] as Request)?.method || 'unknown',
        path: name,
      });

      try {
        const result = await originalMethod.apply(this, args);
        const metric = tracker.stop();
        performanceStore.addMetric(metric);

        // Add performance headers to response if it's a Next.js API response
        if (result && typeof result === 'object' && 'headers' in result) {
          const response = result as Response;
          response.headers.set('X-Response-Time', `${metric.duration.toFixed(2)}ms`);
        }

        return result as ReturnType<T>;
      } catch (error) {
        tracker.stop();
        throw error;
      }
    }) as T;
  };
}

/**
 * Database query tracking utility
 * @param queryName - Name of the query
 * @param query - The query function to execute
 * @param metadata - Optional metadata
 * @returns The result of the query
 */
export async function trackDbQuery<T>(
  queryName: string,
  query: () => Promise<T>,
  metadata?: Record<string, unknown>,
): Promise<T> {
  return measureAsync(`db:${queryName}`, query, metadata);
}

/**
 * Generates a performance report
 * @returns A formatted performance report
 */
export function generatePerformanceReport(): string {
  const metrics = performanceStore.getMetrics();
  const uniqueNames = [...new Set(metrics.map((m) => m.name))];

  let report = '=== Performance Report ===\n\n';
  report += `Total Metrics: ${metrics.length}\n`;
  report += `Unique Operations: ${uniqueNames.length}\n\n`;

  for (const name of uniqueNames) {
    const stats = performanceStore.getStatistics(name);
    if (stats) {
      report += `Operation: ${name}\n`;
      report += `  Count: ${stats.count}\n`;
      report += `  Min: ${stats.min.toFixed(2)}ms\n`;
      report += `  Max: ${stats.max.toFixed(2)}ms\n`;
      report += `  Avg: ${stats.avg.toFixed(2)}ms\n`;
      report += `  P50: ${stats.p50.toFixed(2)}ms\n`;
      report += `  P95: ${stats.p95.toFixed(2)}ms\n`;
      report += `  P99: ${stats.p99.toFixed(2)}ms\n\n`;
    }
  }

  return report;
}

/**
 * Web Vitals tracking utility
 */
export interface WebVitals {
  FCP?: number; // First Contentful Paint
  LCP?: number; // Largest Contentful Paint
  FID?: number; // First Input Delay
  CLS?: number; // Cumulative Layout Shift
  TTFB?: number; // Time to First Byte
}

/**
 * Tracks web vitals metrics
 * @param metric - The web vital metric
 */
export function trackWebVital(metric: {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}): void {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vital] ${metric.name}: ${metric.value} (${metric.rating})`);
  }

  const tracker = trackPerformance(`web-vital:${metric.name}`, {
    rating: metric.rating,
  });
  tracker.stop();
}

/**
 * Performance monitoring middleware for Next.js API routes
 */
export function withPerformanceMonitoring<T extends (...args: unknown[]) => Promise<unknown>>(
  handler: T,
  name?: string,
): T {
  return (async function (this: unknown, ...args: Parameters<T>): Promise<ReturnType<T>> {
    const operationName = name || handler.name || 'anonymous';
    const result = await measureAsync(`api:${operationName}`, () => handler.apply(this, args));
    return result as ReturnType<T>;
  }) as T;
}
