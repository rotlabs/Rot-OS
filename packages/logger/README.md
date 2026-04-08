# @useless/logger

Beautiful logging for nothing. Log your useless bot operations with style.

## Installation

```bash
npm install @useless/logger
```

## Usage

```typescript
import { createLogger } from '@useless/logger';

const logger = createLogger({
  level: 'info',
  pretty: true
});

logger.info('Starting useless bot operation...');
logger.debug('Debugging nothing');
logger.warn('Warning: Something might not happen');
logger.error('Error: Nothing went wrong');
logger.success('Successfully did nothing!');
```

## API

### `createLogger(options?)`

Creates a new logger instance.

```typescript
const logger = createLogger({
  level: 'debug',  // 'debug' | 'info' | 'warn' | 'error'
  pretty: true,    // Enable colors
  timestamp: true, // Show timestamps
  prefix: '[useless bot]' // Custom prefix
});
```

### Log Levels

- `debug()` - Debug messages (gray)
- `info()` - Informational messages (blue)
- `warn()` - Warning messages (yellow)
- `error()` - Error messages (red)
- `success()` - Success messages (green)

### Methods

```typescript
// Basic logging
logger.info('Message');
logger.info('Message with', 'multiple', 'args');

// With data
logger.info('User data', { id: 1, name: 'void' });

// Timing operations
logger.time('operation');
// ... do nothing ...
logger.timeEnd('operation'); // "operation: 42ms"

// Grouping
logger.group('Group Name');
logger.info('Inside group');
logger.groupEnd();

// Table output
logger.table([
  { name: 'void', value: undefined },
  { name: 'null', value: null }
]);
```

## Examples

### Basic Usage

```typescript
import { createLogger } from '@useless/logger';

const logger = createLogger();

logger.info('Initializing void...');
await initializeVoid();
logger.success('Void initialized!');
```

### With Timestamps

```typescript
const logger = createLogger({
  timestamp: true,
  pretty: true
});

logger.info('Operation started');
// [2026-03-02 10:30:45] ℹ Operation started
```

### Custom Prefix

```typescript
const logger = createLogger({
  prefix: '[MY-APP]'
});

logger.info('Starting');
// [MY-APP] ℹ Starting
```

### Conditional Logging

```typescript
const logger = createLogger({
  level: process.env.NODE_ENV === 'production' ? 'error' : 'debug'
});

// Only logs in development
logger.debug('Debug info');
```

## License

MIT © The Void Team
