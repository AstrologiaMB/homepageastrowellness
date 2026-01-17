/**
 * Debugging Utilities
 *
 * This module provides utilities for debugging the application, including
 * logging, tracing, and inspection tools.
 */

/**
 * Log levels for debugging
 */
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  NONE = 4,
}

/**
 * Debug configuration
 */
interface DebugConfig {
  level: LogLevel;
  enableColors: boolean;
  enableTimestamps: boolean;
  enableTraces: boolean;
  prefix?: string;
}

/**
 * Default debug configuration
 */
const defaultConfig: DebugConfig = {
  level: process.env.NODE_ENV === 'production' ? LogLevel.WARN : LogLevel.DEBUG,
  enableColors: true,
  enableTimestamps: true,
  enableTraces: true,
};

/**
 * Current debug configuration
 */
let config: DebugConfig = { ...defaultConfig };

/**
 * ANSI color codes for console output
 */
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  gray: '\x1b[90m',
};

/**
 * Color mapping for log levels
 */
const levelColors: Record<LogLevel, string> = {
  [LogLevel.DEBUG]: colors.cyan,
  [LogLevel.INFO]: colors.green,
  [LogLevel.WARN]: colors.yellow,
  [LogLevel.ERROR]: colors.red,
  [LogLevel.NONE]: colors.reset,
};

/**
 * Level names
 */
const levelNames: Record<LogLevel, string> = {
  [LogLevel.DEBUG]: 'DEBUG',
  [LogLevel.INFO]: 'INFO',
  [LogLevel.WARN]: 'WARN',
  [LogLevel.ERROR]: 'ERROR',
  [LogLevel.NONE]: 'NONE',
};

/**
 * Formats a log message with color and timestamp
 * @param level - The log level
 * @param message - The message to format
 * @returns Formatted message string
 */
function formatMessage(level: LogLevel, message: string): string {
  let formatted = '';

  if (config.enableTimestamps) {
    const timestamp = new Date().toISOString();
    formatted += `${colors.gray}${timestamp}${colors.reset} `;
  }

  if (config.prefix) {
    formatted += `${colors.magenta}[${config.prefix}]${colors.reset} `;
  }

  if (config.enableColors) {
    formatted += `${levelColors[level]}[${levelNames[level]}]${colors.reset} `;
  } else {
    formatted += `[${levelNames[level]}] `;
  }

  formatted += message;

  return formatted;
}

/**
 * Logs a message at the specified level
 * @param level - The log level
 * @param message - The message to log
 * @param data - Optional data to log
 */
function log(level: LogLevel, message: string, ...data: unknown[]): void {
  if (level < config.level) {
    return;
  }

  const formatted = formatMessage(level, message);

  switch (level) {
    case LogLevel.DEBUG:
      console.debug(formatted, ...data);
      break;
    case LogLevel.INFO:
      console.info(formatted, ...data);
      break;
    case LogLevel.WARN:
      console.warn(formatted, ...data);
      break;
    case LogLevel.ERROR:
      console.error(formatted, ...data);
      break;
    default:
      console.log(formatted, ...data);
  }
}

/**
 * Debug logger class
 */
export class DebugLogger {
  private prefix: string;

  /**
   * Creates a new debug logger
   * @param prefix - Prefix for log messages
   */
  constructor(prefix: string) {
    this.prefix = prefix;
  }

  /**
   * Logs a debug message
   * @param message - The message to log
   * @param data - Optional data to log
   */
  debug(message: string, ...data: unknown[]): void {
    const oldPrefix = config.prefix;
    config.prefix = this.prefix;
    log(LogLevel.DEBUG, message, ...data);
    config.prefix = oldPrefix;
  }

  /**
   * Logs an info message
   * @param message - The message to log
   * @param data - Optional data to log
   */
  info(message: string, ...data: unknown[]): void {
    const oldPrefix = config.prefix;
    config.prefix = this.prefix;
    log(LogLevel.INFO, message, ...data);
    config.prefix = oldPrefix;
  }

  /**
   * Logs a warning message
   * @param message - The message to log
   * @param data - Optional data to log
   */
  warn(message: string, ...data: unknown[]): void {
    const oldPrefix = config.prefix;
    config.prefix = this.prefix;
    log(LogLevel.WARN, message, ...data);
    config.prefix = oldPrefix;
  }

  /**
   * Logs an error message
   * @param message - The message to log
   * @param data - Optional data to log
   */
  error(message: string, ...data: unknown[]): void {
    const oldPrefix = config.prefix;
    config.prefix = this.prefix;
    log(LogLevel.ERROR, message, ...data);
    config.prefix = oldPrefix;
  }
}

/**
 * Creates a new debug logger
 * @param prefix - Prefix for log messages
 * @returns A new debug logger instance
 */
export function createLogger(prefix: string): DebugLogger {
  return new DebugLogger(prefix);
}

/**
 * Sets the debug configuration
 * @param newConfig - New configuration to apply
 */
export function setDebugConfig(newConfig: Partial<DebugConfig>): void {
  config = { ...config, ...newConfig };
}

/**
 * Gets the current debug configuration
 * @returns Current debug configuration
 */
export function getDebugConfig(): DebugConfig {
  return { ...config };
}

/**
 * Resets debug configuration to defaults
 */
export function resetDebugConfig(): void {
  config = { ...defaultConfig };
}

/**
 * Traces function execution
 * @param name - Name of the function being traced
 * @returns A function that logs when called
 */
export function traceFunction<T extends (...args: unknown[]) => unknown>(name: string, fn: T): T {
  return ((...args: Parameters<T>) => {
    if (!config.enableTraces) {
      return fn(...args);
    }

    const logger = createLogger('TRACE');
    const argStr = args.map((arg) => JSON.stringify(arg, null, 2)).join(', ');

    logger.debug(`${name}(${argStr})`);

    const result = fn(...args);

    if (result instanceof Promise) {
      return result
        .then((value) => {
          logger.debug(`${name} -> Promise resolved:`, value);
          return value;
        })
        .catch((error) => {
          logger.error(`${name} -> Promise rejected:`, error);
          throw error;
        }) as unknown as ReturnType<T>;
    }

    logger.debug(`${name} ->`, result);
    return result;
  }) as T;
}

/**
 * Inspects an object and returns a formatted string
 * @param obj - The object to inspect
 * @param options - Inspection options
 * @returns Formatted string representation
 */
export function inspect(obj: unknown, options: { depth?: number; colors?: boolean } = {}): string {
  const { depth = 2, colors = config.enableColors } = options;

  const inspectOptions: InspectOptions = {
    depth,
    colors,
    showHidden: false,
    breakLength: 80,
  };

  return require('util').inspect(obj, inspectOptions);
}

/**
 * Type for Node.js inspect options
 */
interface InspectOptions {
  depth: number | null;
  colors: boolean;
  showHidden: boolean;
  breakLength: number;
}

/**
 * Measures and logs the execution time of a function
 * @param name - Name for the timing measurement
 * @param fn - The function to measure
 * @returns The result of the function
 */
export async function measureTime<T>(name: string, fn: () => Promise<T>): Promise<T> {
  const logger = createLogger('TIMING');
  const start = performance.now();

  logger.debug(`Starting: ${name}`);

  try {
    const result = await fn();
    const duration = performance.now() - start;
    logger.info(`Completed: ${name} (${duration.toFixed(2)}ms)`);
    return result;
  } catch (error) {
    const duration = performance.now() - start;
    logger.error(`Failed: ${name} (${duration.toFixed(2)}ms)`, error);
    throw error;
  }
}

/**
 * Synchronous version of measureTime
 * @param name - Name for the timing measurement
 * @param fn - The function to measure
 * @returns The result of the function
 */
export function measureTimeSync<T>(name: string, fn: () => T): T {
  const logger = createLogger('TIMING');
  const start = performance.now();

  logger.debug(`Starting: ${name}`);

  try {
    const result = fn();
    const duration = performance.now() - start;
    logger.info(`Completed: ${name} (${duration.toFixed(2)}ms)`);
    return result;
  } catch (error) {
    const duration = performance.now() - start;
    logger.error(`Failed: ${name} (${duration.toFixed(2)}ms)`, error);
    throw error;
  }
}

/**
 * Logs an error with stack trace
 * @param error - The error to log
 * @param context - Additional context information
 */
export function logError(error: Error, context?: Record<string, unknown>): void {
  const logger = createLogger('ERROR');

  logger.error(error.message);

  if (error.stack) {
    logger.debug('Stack trace:', error.stack);
  }

  if (context) {
    logger.debug('Context:', context);
  }
}

/**
 * Logs an API request
 * @param method - HTTP method
 * @param path - API path
 * @param data - Request data
 */
export function logApiRequest(method: string, path: string, data?: unknown): void {
  const logger = createLogger('API');
  logger.info(`${method} ${path}`, data || '');
}

/**
 * Logs an API response
 * @param method - HTTP method
 * @param path - API path
 * @param status - HTTP status code
 * @param data - Response data
 */
export function logApiResponse(method: string, path: string, status: number, data?: unknown): void {
  const logger = createLogger('API');

  const statusColor = status >= 200 && status < 300 ? colors.green : colors.red;
  const statusStr = `${statusColor}${status}${colors.reset}`;

  logger.info(`${method} ${path} -> ${statusStr}`, data || '');
}

/**
 * Logs a database query
 * @param operation - Database operation type
 * @param table - Table name
 * @param data - Query data
 */
export function logDbQuery(operation: string, table: string, data?: unknown): void {
  const logger = createLogger('DB');
  logger.debug(`${operation} ${table}`, data || '');
}

/**
 * Creates a debug group for related logs
 * @param title - Group title
 * @returns A function to end the group
 */
export function createDebugGroup(title: string): () => void {
  const logger = createLogger('GROUP');
  logger.info(`--- ${title} ---`);
  return () => {
    logger.info(`--- End ${title} ---`);
  };
}

/**
 * Asserts a condition and logs an error if false
 * @param condition - Condition to check
 * @param message - Error message if condition is false
 */
export function debugAssert(condition: boolean, message: string): void {
  if (!condition) {
    const logger = createLogger('ASSERT');
    logger.error(`Assertion failed: ${message}`);
    if (process.env.NODE_ENV === 'development') {
      throw new Error(`Assertion failed: ${message}`);
    }
  }
}

/**
 * Logs the current environment information
 */
export function logEnvironment(): void {
  const logger = createLogger('ENV');
  logger.info('Environment:', {
    NODE_ENV: process.env.NODE_ENV,
    platform: process.platform,
    arch: process.arch,
    nodeVersion: process.version,
  });
}

/**
 * Logs memory usage
 */
export function logMemoryUsage(): void {
  const logger = createLogger('MEMORY');
  const usage = process.memoryUsage();

  const formatBytes = (bytes: number): string => {
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)}KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)}MB`;
  };

  logger.info('Memory usage:', {
    rss: formatBytes(usage.rss),
    heapTotal: formatBytes(usage.heapTotal),
    heapUsed: formatBytes(usage.heapUsed),
    external: formatBytes(usage.external),
  });
}

/**
 * Creates a request ID for tracing
 * @returns A unique request ID
 */
export function createRequestId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
}

/**
 * Logs with request ID for tracing
 * @param requestId - Request ID
 * @param level - Log level
 * @param message - Message to log
 * @param data - Optional data
 */
export function logWithRequestId(
  requestId: string,
  level: LogLevel,
  message: string,
  ...data: unknown[]
): void {
  log(level, message, ...data);
}

/**
 * Default logger instance
 */
createLogger('APP');

// Export log level functions directly
export const debug = (message: string, ...data: unknown[]) => log(LogLevel.DEBUG, message, ...data);
export const info = (message: string, ...data: unknown[]) => log(LogLevel.INFO, message, ...data);
export const warn = (message: string, ...data: unknown[]) => log(LogLevel.WARN, message, ...data);
export const error = (message: string, ...data: unknown[]) => log(LogLevel.ERROR, message, ...data);
