/**
 * @useless/utils - Utility functions
 * 
 * Essential utilities for doing nothing, efficiently.
 */

/**
 * Does nothing. The fundamental building block of the void.
 */
export function noop(): void {
  // Intentionally empty
}

/**
 * Returns the input value unchanged.
 * 
 * @param value - The value to return
 * @returns The same value
 */
export function identity<T>(value: T): T {
  return value;
}

/**
 * Creates a function that always returns the same value.
 * 
 * @param value - The value to return
 * @returns A function that returns the value
 */
export function constant<T>(value: T): () => T {
  return () => value;
}

/**
 * Asynchronously does nothing for the specified duration.
 * 
 * @param ms - Milliseconds to sleep
 * @returns A promise that resolves after the duration
 */
export async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Asynchronous version of noop.
 * 
 * @returns A promise that resolves to nothing
 */
export async function asyncNoop(): Promise<void> {
  return Promise.resolve();
}

/**
 * Returns an empty array.
 * 
 * @returns An empty array
 */
export function empty<T>(): T[] {
  return [];
}

/**
 * Returns an empty object.
 * 
 * @returns An empty object
 */
export function emptyObject(): Record<string, never> {
  return {};
}

/**
 * Calls a function n times and collects results.
 * 
 * @param n - Number of times to call the function
 * @param fn - Function to call
 * @returns Array of results
 */
export function times<T>(n: number, fn: (i: number) => T): T[] {
  return Array.from({ length: n }, (_, i) => fn(i));
}

/**
 * Creates a left-to-right function pipeline.
 * 
 * @param fns - Functions to pipe
 * @returns Piped function
 */
export function pipe<T>(...fns: Array<(arg: T) => T>): (arg: T) => T {
  return (arg: T) => fns.reduce((acc, fn) => fn(acc), arg);
}

/**
 * Creates a right-to-left function composition.
 * 
 * @param fns - Functions to compose
 * @returns Composed function
 */
export function compose<T>(...fns: Array<(arg: T) => T>): (arg: T) => T {
  return (arg: T) => fns.reduceRight((acc, fn) => fn(acc), arg);
}

/**
 * Checks if a value is undefined.
 * 
 * @param value - Value to check
 * @returns True if undefined
 */
export function isUndefined(value: unknown): value is undefined {
  return value === undefined;
}

/**
 * Checks if a value is null.
 * 
 * @param value - Value to check
 * @returns True if null
 */
export function isNull(value: unknown): value is null {
  return value === null;
}

/**
 * Checks if a value is null or undefined.
 * 
 * @param value - Value to check
 * @returns True if null or undefined
 */
export function isNullish(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

/**
 * Omits properties from an object.
 * 
 * @param obj - Source object
 * @param keys - Keys to omit
 * @returns New object without the specified keys
 */
export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result;
}

/**
 * Picks properties from an object.
 * 
 * @param obj - Source object
 * @param keys - Keys to pick
 * @returns New object with only the specified keys
 */
export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  return result;
}

/**
 * Debounces a function.
 * 
 * @param fn - Function to debounce
 * @param ms - Milliseconds to debounce
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  ms: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  
  return function (this: any, ...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, ms);
  };
}

/**
 * Throttles a function.
 * 
 * @param fn - Function to throttle
 * @param ms - Milliseconds to throttle
 * @returns Throttled function
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  ms: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  
  return function (this: any, ...args: Parameters<T>) {
    const now = Date.now();
    
    if (now - lastCall >= ms) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}

/**
 * Memoizes a function's return value.
 * 
 * @param fn - Function to memoize
 * @returns Memoized function
 */
export function memoize<T extends (...args: any[]) => any>(
  fn: T
): T {
  const cache = new Map<string, ReturnType<T>>();
  
  return function (this: any, ...args: Parameters<T>): ReturnType<T> {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key)!;
    }
    
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  } as T;
}

/**
 * Deeply clones a value.
 * 
 * @param value - Value to clone
 * @returns Cloned value
 */
export function deepClone<T>(value: T): T {
  if (value === null || typeof value !== 'object') {
    return value;
  }
  
  if (Array.isArray(value)) {
    return value.map(deepClone) as unknown as T;
  }
  
  const cloned = {} as T;
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      cloned[key] = deepClone(value[key]);
    }
  }
  
  return cloned;
}

/**
 * Generates a random void identifier.
 * 
 * @returns A random string
 */
export function randomId(): string {
  return Math.random().toString(36).substring(2, 11);
}

/**
 * Safely parses JSON, returning undefined on error.
 * 
 * @param json - JSON string to parse
 * @returns Parsed value or undefined
 */
export function safeJsonParse<T>(json: string): T | undefined {
  try {
    return JSON.parse(json);
  } catch {
    return undefined;
  }
}

/**
 * Retries an async function with exponential backoff.
 * 
 * @param fn - Function to retry
 * @param maxRetries - Maximum number of retries
 * @returns Function result or undefined
 */
export async function retry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3
): Promise<T | undefined> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) {
        return undefined;
      }
      await sleep(Math.pow(2, i) * 1000);
    }
  }
  return undefined;
}
