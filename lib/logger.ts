/**
 * Structured Logging Utility
 * 
 * Provides a centralized logging interface with different log levels,
 * structured output, and request ID tracking.
 * 
 * @module lib/logger
 */

/**
 * Log levels
 */
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

/**
 * Log entry interface
 */
interface LogEntry {
  level: string;
  message: string;
  timestamp: string;
  context?: Record<string, unknown>;
  requestId?: string;
  userId?: string;
}

/**
 * Logger configuration
 */
interface LoggerConfig {
  level: LogLevel;
  enableConsole: boolean;
  enableFile?: boolean;
  enableRemote?: boolean;
  requestId?: string;
  userId?: string;
}

/**
 * Default logger configuration
 */
const defaultConfig: LoggerConfig = {
  level: process.env.NODE_ENV === 'production' ? LogLevel.INFO : LogLevel.DEBUG,
  enableConsole: true,
  enableFile: false,
  enableRemote: false,
};

/**
 * Current logger configuration
 */
let config: LoggerConfig = { ...defaultConfig };

/**
 * Logger class
 */
class Logger {
  /**
   * Set logger configuration
   */
  static configure(newConfig: Partial<LoggerConfig>): void {
    config = { ...config, ...newConfig };
  }

  /**
   * Set request context
   */
  static setRequestContext(requestId: string, userId?: string): void {
    config.requestId = requestId;
    config.userId = userId;
  }

  /**
   * Clear request context
   */
  static clearRequestContext(): void {
    config.requestId = undefined;
    config.userId = undefined;
  }

  /**
   * Log debug message
   */
  static debug(message: string, context?: Record<string, unknown>): void {
    this.log(LogLevel.DEBUG, message, context);
  }

  /**
   * Log info message
   */
  static info(message: string, context?: Record<string, unknown>): void {
    this.log(LogLevel.INFO, message, context);
  }

  /**
   * Log warning message
   */
  static warn(message: string, context?: Record<string, unknown>): void {
    this.log(LogLevel.WARN, message, context);
  }

  /**
   * Log error message
   */
  static error(message: string, context?: Record<string, unknown>): void {
    this.log(LogLevel.ERROR, message, context);
  }

  /**
   * Core logging method
   */
  private static log(
    level: LogLevel,
    message: string,
    context?: Record<string, unknown>
  ): void {
    // Skip if level is below configured level
    if (level < config.level) {
      return;
    }

    const entry: LogEntry = {
      level: LogLevel[level],
      message,
      timestamp: new Date().toISOString(),
      context,
      requestId: config.requestId,
      userId: config.userId,
    };

    // Log to console
    if (config.enableConsole) {
      this.logToConsole(entry);
    }

    // TODO: Log to file if enabled
    // if (config.enableFile) {
    //   this.logToFile(entry);
    // }

    // TODO: Log to remote service if enabled
    // if (config.enableRemote) {
    //   this.logToRemote(entry);
    // }
  }

  /**
   * Log to console with colors
   */
  private static logToConsole(entry: LogEntry): void {
    const { level, message, timestamp, context, requestId, userId } = entry;

    // Build log prefix
    const prefix = [
      `[${timestamp}]`,
      requestId ? `[${requestId}]` : '',
      userId ? `[User: ${userId}]` : '',
    ].filter(Boolean).join(' ');

    // Format context if present
    let contextStr = '';
    if (context && Object.keys(context).length > 0) {
      contextStr = `\n${JSON.stringify(context, null, 2)}`;
    }

    // Log with appropriate method and color
    switch (level) {
      case 'DEBUG':
        console.debug(`${prefix} ${message}${contextStr}`);
        break;
      case 'INFO':
        console.info(`${prefix} ${message}${contextStr}`);
        break;
      case 'WARN':
        console.warn(`${prefix} ${message}${contextStr}`);
        break;
      case 'ERROR':
        console.error(`${prefix} ${message}${contextStr}`);
        break;
    }
  }

  /**
   * Create a child logger with additional context
   */
  static child(context: Record<string, unknown>): ChildLogger {
    return new ChildLogger(context);
  }
}

/**
 * Child logger with pre-bound context
 */
class ChildLogger {
  constructor(private readonly context: Record<string, unknown>) {}

  debug(message: string, additionalContext?: Record<string, unknown>): void {
    Logger.debug(message, { ...this.context, ...additionalContext });
  }

  info(message: string, additionalContext?: Record<string, unknown>): void {
    Logger.info(message, { ...this.context, ...additionalContext });
  }

  warn(message: string, additionalContext?: Record<string, unknown>): void {
    Logger.warn(message, { ...this.context, ...additionalContext });
  }

  error(message: string, additionalContext?: Record<string, unknown>): void {
    Logger.error(message, { ...this.context, ...additionalContext });
  }
}

/**
 * Export logger instance
 */
export const logger = Logger;

/**
 * Export child logger type
 */
export type { ChildLogger };

/**
 * Helper function to create request-scoped logger
 */
export function createRequestLogger(requestId: string, userId?: string): ChildLogger {
  Logger.setRequestContext(requestId, userId);
  return Logger.child({ requestId, userId });
}

/**
 * Helper function to clear request context
 */
export function clearRequestLogger(): void {
  Logger.clearRequestContext();
}
