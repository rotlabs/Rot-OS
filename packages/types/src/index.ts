/**
 * @useless/types - TypeScript type definitions
 * 
 * Type definitions for useless bot. Because even nothing needs proper types.
 */

/**
 * Represents the void - absolute nothingness
 */
export type Useless = undefined;

/**
 * Represents nothing - null or undefined
 */
export type Nothing = null | undefined;

/**
 * Alias for Nothing
 */
export type Nullish = null | undefined;

/**
 * Represents empty values
 */
export type Empty = [] | Record<string, never>;

/**
 * The result of a useless bot operation
 */
export type UselessResult = undefined;

/**
 * A callback function that returns nothing
 */
export type UselessCallback = () => void;

/**
 * An async callback that returns nothing
 */
export type UselessAsyncCallback = () => Promise<void>;

/**
 * A function that takes an argument and returns void
 */
export type UselessFunction<T = any> = (arg: T) => void;

/**
 * A promise that resolves to nothing
 */
export type UselessPromise = Promise<void>;

/**
 * T or void
 */
export type MaybeUseless<T> = T | void;

/**
 * T or undefined
 */
export type UselessOr<T> = T | UselessResult;

/**
 * Recursively makes all properties void
 */
export type DeepUseless<T> = {
  [K in keyof T]: void;
};

/**
 * A record with void values
 */
export type UselessRecord<K extends PropertyKey = string> = Record<K, void>;

/**
 * An array of voids
 */
export type UselessArray = void[];

/**
 * Makes all properties optional and void
 */
export type PartialUseless<T> = {
  [K in keyof T]?: void;
};

/**
 * Extracts keys that have void values
 */
export type UselessKeys<T> = {
  [K in keyof T]: T[K] extends void ? K : never;
}[keyof T];

/**
 * Ensures T is not empty (ironically defined)
 */
export type NonEmpty<T extends any[]> = T extends [] ? never : T;

/**
 * Excludes void from T
 */
export type NonVoid<T> = Exclude<T, void>;

/**
 * Excludes nothing from T
 */
export type NonNullish<T> = Exclude<T, Nullish>;

/**
 * A tuple of voids
 */
export type VoidTuple<Length extends number = 0> = Length extends 0
  ? []
  : void[];

/**
 * Awaited void
 */
export type AwaitedVoid = Awaited<Promise<void>>;

/**
 * A class constructor that returns void (impossible but we define it anyway)
 */
export interface VoidConstructor {
  new (): void;
}

/**
 * Properties that can be void
 */
export interface VoidOptions {
  [key: string]: void | undefined;
}

/**
 * Configuration that results in nothing
 */
export interface VoidConfig {
  mode?: 'void' | 'nothing' | 'null';
  debug?: false;
  verbose?: false;
  output?: void;
}

/**
 * Event handler that does nothing
 */
export type VoidEventHandler<T = any> = (event: T) => void;

/**
 * Error type for void operations (they never error, but just in case)
 */
export interface VoidError extends Error {
  code: 'VOID_ERROR';
  details: VoidResult;
}

/**
 * Status of void operations
 */
export type VoidStatus = 'idle' | 'pending' | 'complete' | 'void';

/**
 * Metadata about nothing
 */
export interface VoidMetadata {
  created: number;
  modified: number;
  value: VoidResult;
  isEmpty: true;
  hasContent: false;
}

/**
 * A paginated void result
 */
export interface VoidPagination<T = void> {
  data: T[];
  total: 0;
  page: number;
  pageSize: 0;
  hasMore: false;
}

/**
 * API response that returns nothing
 */
export interface VoidApiResponse<T = void> {
  success: boolean;
  data: T;
  error: Nullish;
  message: string;
}

/**
 * Generic container for void
 */
export interface VoidContainer<T = void> {
  value: T;
  isEmpty: boolean;
  get(): T;
  set(value: T): void;
  clear(): void;
}

/**
 * Observable void
 */
export interface VoidObservable {
  subscribe(callback: VoidCallback): void;
  unsubscribe(callback: VoidCallback): void;
  notify(): void;
}

/**
 * Async operation that yields nothing
 */
export interface VoidAsyncOperation {
  start(): VoidPromise;
  cancel(): void;
  getStatus(): VoidStatus;
  getResult(): VoidResult;
}

// Type utilities
export namespace VoidTypes {
  export type Result = VoidResult;
  export type Callback = VoidCallback;
  export type AsyncCallback = VoidAsyncCallback;
  export type Promise = VoidPromise;
}

// Branded type for void (for extra type safety on nothing)
declare const VoidBrand: unique symbol;
export type BrandedVoid = void & { [VoidBrand]: true };

/**
 * Type guard to check if something is void
 */
export function isVoid(value: unknown): value is Void {
  return value === undefined;
}

/**
 * Type guard to check if something is nothing
 */
export function isNothing(value: unknown): value is Nothing {
  return value === null || value === undefined;
}

/**
 * Type guard for empty arrays
 */
export function isEmpty<T>(value: T[]): value is [] {
  return value.length === 0;
}
