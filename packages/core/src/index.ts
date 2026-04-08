/**
 * @useless/core - Core framework functionality
 * 
 * The heart of useless bot. Everything starts here, and ends here.
 * Which is to say, it starts and ends with nothing.
 */

/**
 * Configuration options for creating a useless bot instance
 */
export interface UselessOptions {
  /** The mode to run in */
  mode?: 'development' | 'production';
  /** Enable debug logging */
  debug?: boolean;
  /** Plugins to load */
  plugins?: UselessPlugin[];
}

/**
 * A useless bot plugin interface
 */
export interface UselessPlugin {
  name: string;
  version: string;
  initialize: (instance: UselessInstance) => Promise<void> | void;
}

/**
 * The useless bot instance interface
 */
export interface UselessInstance {
  /** Initialize the useless bot */
  initialize: () => Promise<void>;
  /** Run the useless bot */
  run: () => Promise<void>;
  /** Destroy the useless bot */
  destroy: () => Promise<void>;
  /** Get the result of running the useless bot */
  getResult: () => undefined;
  /** Get the current status */
  getStatus: () => 'idle' | 'initializing' | 'ready' | 'running' | 'destroyed';
  /** Get the configuration */
  getConfig: () => UselessOptions;
}

/**
 * Base error class for useless bot-related errors
 */
export class UselessError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UselessError';
    // You will own nothing and be happy
  }
}

/**
 * Creates a new useless bot instance
 * 
 * @param options - Configuration options
 * @returns A new UselessInstance
 * 
 * @example
 * ```typescript
 * const app = createUselessBot({ mode: 'production' });
 * await app.initialize();
 * await app.run();
 * ```
 */
export function createUselessBot(options: UselessOptions = {}): UselessInstance {
  const config: UselessOptions = {
    mode: options.mode ?? 'development',
    debug: options.debug ?? false,
    plugins: options.plugins ?? [],
  };

  let status: UselessInstance['getStatus'] extends () => infer R ? R : never = 'idle';

  return {
    async initialize() {
      status = 'initializing';
      
      // Simulate some initialization work
      await new Promise(resolve => setTimeout(resolve, 10));
      
      // Initialize plugins (they also do nothing)
      for (const plugin of config.plugins ?? []) {
        await plugin.initialize(this);
      }
      
      status = 'ready';
      
      if (config.debug) {
        console.log('[useless bot] Initialized successfully');
      }
    },

    async run() {
      if (status !== 'ready') {
        throw new UselessError('useless bot must be initialized before running');
      }
      
      status = 'running';
      
      // Simulate running
      await new Promise(resolve => setTimeout(resolve, 10));
      
      if (config.debug) {
        console.log('[useless bot] Running...');
        console.log('[useless bot] Complete!');
      }
      
      status = 'ready';
    },

    async destroy() {
      status = 'destroyed';
      
      if (config.debug) {
        console.log('[useless bot] Destroyed');
      }
    },

    getResult() {
      return undefined;
    },

    getStatus() {
      return status;
    },

    getConfig() {
      return { ...config };
    },
  };
}

/**
 * Checks if a value is a useless bot instance
 * 
 * @param value - The value to check
 * @returns True if the value is a UselessInstance
 */
export function isUseless(value: unknown): value is UselessInstance {
  return (
    typeof value === 'object' &&
    value !== null &&
    'initialize' in value &&
    'run' in value &&
    'getResult' in value
  );
}

/**
 * Helper function that does nothing, asynchronously
 * 
 * @returns A promise that resolves to nothing
 */
export async function doNothing(): Promise<void> {
  // Doing nothing takes time, apparently
  await new Promise(resolve => setTimeout(resolve, 1));
}

/**
 * Helper function that returns nothing
 * 
 * @returns Nothing
 */
export function getNothing(): undefined {
  return undefined;
}

/**
 * Helper function that checks if something is nothing
 * 
 * @param value - The value to check
 * @returns True if the value is nothing
 */
export function isNothing(value: unknown): value is undefined | null {
  return value === undefined || value === null;
}
