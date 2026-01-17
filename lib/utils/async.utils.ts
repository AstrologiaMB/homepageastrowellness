/**
 * Async Utilities
 *
 * Utility functions for async operations.
 *
 * @module lib/utils/async.utils
 */

/**
 * Sleep for a specified duration
 *
 * @param ms - Milliseconds to sleep
 * @returns Promise that resolves after the specified duration
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Retry a function with exponential backoff
 *
 * @param fn - Function to retry
 * @param options - Retry options
 * @returns Promise that resolves when the function succeeds
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options: {
    maxAttempts?: number;
    initialDelay?: number;
    maxDelay?: number;
    backoffFactor?: number;
    shouldRetry?: (error: any) => boolean;
  } = {}
): Promise<T> {
  const {
    maxAttempts = 3,
    initialDelay = 1000,
    maxDelay = 30000,
    backoffFactor = 2,
    shouldRetry = () => true,
  } = options;

  let lastError: any;
  let delay = initialDelay;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (attempt >= maxAttempts || !shouldRetry(error)) {
        throw error;
      }

      await sleep(delay);
      delay = Math.min(delay * backoffFactor, maxDelay);
    }
  }

  throw lastError;
}

/**
 * Execute multiple promises in parallel and return all results
 *
 * @param promises - Array of promises to execute
 * @returns Promise that resolves to an array of results
 */
export async function all<T>(promises: Promise<T>[]): Promise<T[]> {
  return Promise.all(promises);
}

/**
 * Execute multiple promises in parallel and return the first to resolve
 *
 * @param promises - Array of promises to execute
 * @returns Promise that resolves to the first result
 */
export async function race<T>(promises: Promise<T>[]): Promise<T> {
  return Promise.race(promises);
}

/**
 * Execute multiple promises in parallel and return all results, including errors
 *
 * @param promises - Array of promises to execute
 * @returns Promise that resolves to an array of settled results
 */
export async function allSettled<T>(
  promises: Promise<T>[]
): Promise<Array<{ status: 'fulfilled' | 'rejected'; value?: T; reason?: any }>> {
  return Promise.allSettled(promises);
}

/**
 * Execute promises in sequence
 *
 * @param promises - Array of promises to execute in sequence
 * @returns Promise that resolves to an array of results
 */
export async function sequence<T>(promises: Array<() => Promise<T>>): Promise<T[]> {
  const results: T[] = [];

  for (const promiseFn of promises) {
    results.push(await promiseFn());
  }

  return results;
}

/**
 * Execute promises in parallel with concurrency limit
 *
 * @param tasks - Array of tasks to execute
 * @param concurrency - Maximum number of concurrent tasks
 * @returns Promise that resolves to an array of results
 */
export async function parallel<T>(
  tasks: Array<() => Promise<T>>,
  concurrency: number
): Promise<T[]> {
  const results: T[] = [];
  const executing: Promise<void>[] = [];

  for (const task of tasks) {
    const promise = task().then((result) => {
      results.push(result);
      executing.splice(executing.indexOf(promise), 1);
    });

    executing.push(promise);

    if (executing.length >= concurrency) {
      await Promise.race(executing);
    }
  }

  await Promise.all(executing);
  return results;
}

/**
 * Create a debounced function
 *
 * @param fn - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;

  return function (this: any, ...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      fn.apply(this, args);
      timeoutId = null;
    }, delay);
  };
}

/**
 * Create a throttled function
 *
 * @param fn - Function to throttle
 * @param limit - Minimum time between calls in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  let timeoutId: NodeJS.Timeout | null = null;

  return function (this: any, ...args: Parameters<T>) {
    const now = Date.now();
    const timeSinceLastCall = now - lastCall;

    if (timeSinceLastCall >= limit) {
      fn.apply(this, args);
      lastCall = now;
    } else if (!timeoutId) {
      timeoutId = setTimeout(() => {
        fn.apply(this, args);
        lastCall = Date.now();
        timeoutId = null;
      }, limit - timeSinceLastCall);
    }
  };
}

/**
 * Create a memoized async function
 *
 * @param fn - Function to memoize
 * @param keyFn - Function to generate cache key from arguments
 * @returns Memoized function
 */
export function memoize<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  keyFn?: (...args: Parameters<T>) => string
): T {
  const cache = new Map<string, Promise<any>>();

  return async function (this: any, ...args: Parameters<T>) {
    const key = keyFn ? keyFn(...args) : JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const promise = fn.apply(this, args).finally(() => {
      // Optionally remove from cache after some time
      // setTimeout(() => cache.delete(key), 60000);
    });

    cache.set(key, promise);
    return promise;
  } as T;
}

/**
 * Create a timeout for a promise
 *
 * @param promise - Promise to timeout
 * @param ms - Timeout in milliseconds
 * @param message - Timeout error message
 * @returns Promise that rejects if timeout is reached
 */
export function withTimeout<T>(
  promise: Promise<T>,
  ms: number,
  message: string = 'Operation timed out'
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => {
      setTimeout(() => reject(new Error(message)), ms);
    }),
  ]);
}

/**
 * Create a cancellable promise
 *
 * @param fn - Function to execute
 * @returns Object with promise and cancel function
 */
export function cancellable<T>(fn: (signal: AbortSignal) => Promise<T>): {
  promise: Promise<T>;
  cancel: () => void;
} {
  const controller = new AbortController();

  const promise = fn(controller.signal).catch((error) => {
    if (error.name === 'AbortError') {
      throw new Error('Operation was cancelled');
    }
    throw error;
  });

  return {
    promise,
    cancel: () => controller.abort(),
  };
}

/**
 * Execute a function with a timeout
 *
 * @param fn - Function to execute
 * @param timeout - Timeout in milliseconds
 * @returns Promise that resolves or rejects based on the function result
 */
export async function withTimeoutFn<T>(fn: () => Promise<T>, timeout: number): Promise<T> {
  return withTimeout(fn(), timeout);
}

/**
 * Poll a condition until it becomes true
 *
 * @param condition - Function that returns a boolean
 * @param options - Polling options
 * @returns Promise that resolves when condition is true
 */
export async function poll(
  condition: () => boolean | Promise<boolean>,
  options: {
    interval?: number;
    timeout?: number;
    errorMessage?: string;
  } = {}
): Promise<void> {
  const { interval = 1000, timeout = 30000, errorMessage = 'Polling timed out' } = options;

  const startTime = Date.now();

  while (Date.now() - startTime < timeout) {
    if (await condition()) {
      return;
    }
    await sleep(interval);
  }

  throw new Error(errorMessage);
}

/**
 * Queue tasks and execute them in order
 */
export class AsyncQueue<T = any> {
  private queue: Array<() => Promise<any>> = [];
  private processing = false;

  /**
   * Add a task to the queue
   */
  async add(task: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await task();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });

      this.process();
    });
  }

  /**
   * Process the queue
   */
  private async process(): Promise<void> {
    if (this.processing || this.queue.length === 0) {
      return;
    }

    this.processing = true;

    while (this.queue.length > 0) {
      const task = this.queue.shift();
      if (task) {
        await task();
      }
    }

    this.processing = false;
  }

  /**
   * Get the queue size
   */
  get size(): number {
    return this.queue.length;
  }

  /**
   * Clear the queue
   */
  clear(): void {
    this.queue = [];
  }
}

/**
 * Create a rate-limited function
 *
 * @param fn - Function to rate limit
 * @param limit - Maximum number of calls per period
 * @param period - Time period in milliseconds
 * @returns Rate-limited function
 */
export function rateLimit<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  limit: number,
  period: number
): T {
  const calls: number[] = [];

  return async function (this: any, ...args: Parameters<T>) {
    const now = Date.now();

    // Remove old calls outside the period
    const cutoff = now - period;
    const recentCalls = calls.filter((callTime) => callTime > cutoff);

    if (recentCalls.length >= limit) {
      const oldestCall = recentCalls[0];
      const waitTime = oldestCall + period - now;
      await sleep(waitTime);
    }

    calls.push(now);
    return fn.apply(this, args);
  } as T;
}

/**
 * Execute a function with a lock
 *
 * @param fn - Function to execute
 * @returns Promise that resolves when the function completes
 */
export class AsyncLock {
  private locked = false;
  private queue: Array<() => void> = [];

  /**
   * Acquire the lock and execute a function
   */
  async acquire<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      const release = () => {
        const next = this.queue.shift();
        if (next) {
          next();
        } else {
          this.locked = false;
        }
      };

      const task = async () => {
        try {
          const result = await fn();
          resolve(result);
        } catch (error) {
          reject(error);
        } finally {
          release();
        }
      };

      if (!this.locked) {
        this.locked = true;
        task();
      } else {
        this.queue.push(task);
      }
    });
  }

  /**
   * Check if the lock is held
   */
  isLocked(): boolean {
    return this.locked;
  }

  /**
   * Get the queue size
   */
  getQueueSize(): number {
    return this.queue.length;
  }
}

/**
 * Create a batch processor
 */
export class BatchProcessor<TInput, TOutput> {
  private queue: TInput[] = [];
  private processing = false;
  private timer: NodeJS.Timeout | null = null;

  constructor(
    private processor: (batch: TInput[]) => Promise<TOutput[]>,
    private options: {
      batchSize?: number;
      maxWaitTime?: number;
    } = {}
  ) {
    this.options = {
      batchSize: 10,
      maxWaitTime: 1000,
      ...options,
    };
  }

  /**
   * Add an item to the batch
   */
  async add(item: TInput): Promise<TOutput> {
    return new Promise((resolve, reject) => {
      const _index = this.queue.length;
      this.queue.push(item as any);

      const _processBatch = async () => {
        const batch = this.queue.splice(0, this.options.batchSize!);
        try {
          const results = await this.processor(batch);
          batch.forEach((_, i) => {
            const callback = (batch[i] as any)._callback;
            if (callback) {
              callback(results[i]);
            }
          });
        } catch (error) {
          batch.forEach((item) => {
            const callback = (item as any)._callback;
            if (callback) {
              callback(null, error);
            }
          });
        }
      };

      (item as any)._callback = (result: TOutput, error?: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      };

      if (this.queue.length >= this.options.batchSize!) {
        this.processBatch();
      } else if (!this.timer) {
        this.timer = setTimeout(() => {
          this.processBatch();
        }, this.options.maxWaitTime);
      }
    });
  }

  /**
   * Process the current batch
   */
  private async processBatch(): Promise<void> {
    if (this.processing || this.queue.length === 0) {
      return;
    }

    this.processing = true;

    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    const batch = this.queue.splice(0, this.options.batchSize!);

    try {
      const results = await this.processor(batch);
      batch.forEach((item, i) => {
        const callback = (item as any)._callback;
        if (callback) {
          callback(results[i]);
        }
      });
    } catch (error) {
      batch.forEach((item) => {
        const callback = (item as any)._callback;
        if (callback) {
          callback(null, error);
        }
      });
    }

    this.processing = false;

    // Process remaining items
    if (this.queue.length > 0) {
      this.processBatch();
    }
  }

  /**
   * Flush all pending items
   */
  async flush(): Promise<void> {
    while (this.queue.length > 0) {
      await this.processBatch();
    }
  }

  /**
   * Get the queue size
   */
  get size(): number {
    return this.queue.length;
  }
}

/**
 * Create a function that only runs once
 *
 * @param fn - Function to execute once
 * @returns Function that only executes once
 */
export function once<T extends (...args: any[]) => Promise<any>>(fn: T): T {
  let called = false;
  let result: any;
  let resultPromise: Promise<any> | null = null;

  return async function (this: any, ...args: Parameters<T>) {
    if (called) {
      return result;
    }

    if (resultPromise) {
      return resultPromise;
    }

    resultPromise = fn.apply(this, args);
    result = await resultPromise;
    called = true;
    resultPromise = null;

    return result;
  } as T;
}

/**
 * Execute a function with a fallback
 *
 * @param fn - Primary function to execute
 * @param fallback - Fallback function to execute if primary fails
 * @returns Promise that resolves to the result of either function
 */
export async function withFallback<T>(
  fn: () => Promise<T>,
  fallback: (error: any) => Promise<T>
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    return fallback(error);
  }
}

/**
 * Create a function that retries on specific errors
 *
 * @param fn - Function to execute
 * @param shouldRetry - Function that determines if error should trigger a retry
 * @param maxAttempts - Maximum number of attempts
 * @returns Function that retries on specific errors
 */
export function retryOn<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  shouldRetry: (error: any) => boolean,
  maxAttempts: number = 3
): T {
  return async function (this: any, ...args: Parameters<T>) {
    let lastError: any;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await fn.apply(this, args);
      } catch (error) {
        lastError = error;

        if (attempt >= maxAttempts || !shouldRetry(error)) {
          throw error;
        }
      }
    }

    throw lastError;
  } as T;
}
