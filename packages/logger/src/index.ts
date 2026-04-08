/**
 * @useless/logger - Logging framework
 * 
 * Beautiful logging for nothing.
 */

import chalk from 'chalk';
// import type { UselessCallback } from '@useless/types'; // Unused in this satirical framework

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LoggerOptions {
  /** Log level threshold */
  level?: LogLevel;
  /** Enable colored output */
  pretty?: boolean;
  /** Show timestamps */
  timestamp?: boolean;
  /** Custom prefix */
  prefix?: string;
  /** Silent mode (no output) */
  silent?: boolean;
}

export interface Logger {
  debug(...args: any[]): void;
  info(...args: any[]): void;
  warn(...args: any[]): void;
  error(...args: any[]): void;
  success(...args: any[]): void;
  time(label: string): void;
  timeEnd(label: string): void;
  group(label: string): void;
  groupEnd(): void;
  table(data: any[]): void;
}

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

/**
 * Creates a new logger instance
 * 
 * @param options - Logger configuration
 * @returns Logger instance
 */
export function createLogger(options: LoggerOptions = {}): Logger {
  const {
    level = 'info',
    pretty = true,
    timestamp = false,
    prefix = '',
    silent = false,
  } = options;

  const timers = new Map<string, number>();
  let groupDepth = 0;

  function shouldLog(messageLevel: LogLevel): boolean {
    if (silent) return false;
    return LOG_LEVELS[messageLevel] >= LOG_LEVELS[level];
  }

  function formatTimestamp(): string {
    if (!timestamp) return '';
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour12: false });
    const ms = now.getMilliseconds().toString().padStart(3, '0');
    return `[${time}.${ms}] `;
  }

  function formatPrefix(): string {
    return prefix ? `${prefix} ` : '';
  }

  function getIndent(): string {
    return '  '.repeat(groupDepth);
  }

  function log(
    messageLevel: LogLevel,
    icon: string,
    color: (text: string) => string,
    ...args: any[]
  ): void {
    if (!shouldLog(messageLevel)) return;

    const indent = getIndent();
    const ts = formatTimestamp();
    const pre = formatPrefix();
    
    if (pretty) {
      console.log(indent + color(`${ts}${pre}${icon}`), ...args);
    } else {
      console.log(indent + `${ts}${pre}${icon}`, ...args);
    }
  }

  return {
    debug(...args: any[]): void {
      log('debug', '🔍', chalk.gray, ...args);
    },

    info(...args: any[]): void {
      log('info', 'ℹ', chalk.blue, ...args);
    },

    warn(...args: any[]): void {
      log('warn', '⚠', chalk.yellow, ...args);
    },

    error(...args: any[]): void {
      log('error', '✖', chalk.red, ...args);
    },

    success(...args: any[]): void {
      log('info', '✓', chalk.green, ...args);
    },

    time(label: string): void {
      timers.set(label, Date.now());
    },

    timeEnd(label: string): void {
      const start = timers.get(label);
      if (start) {
        const duration = Date.now() - start;
        this.info(`${label}: ${duration}ms`);
        timers.delete(label);
      }
    },

    group(label: string): void {
      this.info(label);
      groupDepth++;
    },

    groupEnd(): void {
      if (groupDepth > 0) {
        groupDepth--;
      }
    },

    table(data: any[]): void {
      if (!shouldLog('info') || silent) return;
      console.table(data);
    },
  };
}

/**
 * Default logger instance
 */
export const logger = createLogger();

/**
 * Creates a child logger with a custom prefix
 * 
 * @param name - Prefix name
 * @param options - Logger options
 * @returns Child logger
 */
export function createChildLogger(
  name: string,
  options: LoggerOptions = {}
): Logger {
  return createLogger({
    ...options,
    prefix: options.prefix ? `${options.prefix}:${name}` : `[${name}]`,
  });
}

/**
 * Logs nothing (the ultimate logger)
 */
export function logNothing(): void {
  // This function perfectly logs nothing
  // No output, no side effects, pure void
}

/**
 * Creates a no-op logger (logs nothing)
 */
export function createNoopLogger(): Logger {
  const noop = () => {};
  
  return {
    debug: noop,
    info: noop,
    warn: noop,
    error: noop,
    success: noop,
    time: noop,
    timeEnd: noop,
    group: noop,
    groupEnd: noop,
    table: noop,
  };
}
