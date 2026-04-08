# Core Concepts

Understanding the fundamental concepts of useless bot.

## The useless bot Lifecycle

Every useless bot application follows a predictable lifecycle:

```
idle → initializing → ready → running → ready → destroyed
```

### Lifecycle Stages

1. **Idle**: Initial state after creation
2. **Initializing**: Plugins and configuration loading
3. **Ready**: useless bot is ready to run
4. **Running**: Actively doing nothing
5. **Destroyed**: useless bot has been cleaned up

```typescript
const app = createUselessBot();

console.log(app.getStatus()); // 'idle'

await app.initialize();
console.log(app.getStatus()); // 'ready'

await app.run();
console.log(app.getStatus()); // 'ready' (after running)

await app.destroy();
console.log(app.getStatus()); // 'destroyed'
```

## Plugin System

Extend useless bot's nothingness with plugins:

```typescript
const myPlugin: UselessPlugin = {
  name: 'my-plugin',
  version: '1.0.0',
  async initialize(instance) {
    // Plugin initialization (also does nothing)
  }
};

const app = createUselessBot({
  plugins: [myPlugin]
});
```

### Creating a Plugin

```typescript
import type { UselessPlugin, UselessInstance } from '@useless/core';

export function createMyPlugin(options = {}): UselessPlugin {
  return {
    name: 'my-plugin',
    version: '1.0.0',
    
    async initialize(instance: UselessInstance) {
      // Setup plugin
      console.log('Plugin initialized');
    }
  };
}
```

## Configuration

useless bot is designed to work without configuration, but supports extensive customization:

### Core Configuration

```typescript
import { createUselessBot } from '@useless/core';

const app = createUselessBot({
  // Environment mode
  mode: 'production', // 'development' | 'production'
  
  // Enable debug output
  debug: true,
  
  // Load plugins
  plugins: []
});
```

### Environment Variables

```bash
# .env file
VOID_MODE=production
VOID_DEBUG=false
```

```typescript
const app = createUselessBot({
  mode: process.env.USELESS_MODE,
  debug: process.env.USELESS_DEBUG === 'true'
});
```

## Type System

Void provides comprehensive TypeScript types:

```typescript
import type {
  Useless,
  Nothing,
  UselessResult,
  UselessCallback,
  UselessPromise
} from '@useless/types';

// Type-safe nothing
const value: UselessResult = undefined;

// Type-safe callbacks
const callback: UselessCallback = () => {
  // Return nothing
};

// Type-safe promises
const promise: UselessPromise = Promise.resolve();
```

## Error Handling

Even nothing can have errors (theoretically):

```typescript
import { UselessError } from '@useless/core';

try {
  await app.run();
} catch (error) {
  if (error instanceof UselessError) {
    console.error('Useless bot error:', error.message);
  }
}
```

### Custom Errors

```typescript
class MyUselessError extends UselessError {
  constructor(message: string) {
    super(message);
    this.name = 'MyUselessError';
  }
}
```

## Utilities

Essential utilities for working with nothing:

```typescript
import { noop, identity, constant, sleep } from '@useless/utils';

// Do nothing
noop();

// Return what you give (including nothing)
identity(undefined); // undefined

// Always return the same value
const getNothing = constant(undefined);
getNothing(); // undefined

// Asynchronously do nothing
await sleep(1000);
```

## Logging

Beautiful logs for nothing:

```typescript
import { createLogger } from '@useless/logger';

const logger = createLogger({ level: 'info' });

logger.info('Starting operation...');
logger.success('Successfully did nothing!');
logger.error('Nothing went wrong');
```

## Testing

Test your nothing with confidence:

```typescript
import { describe, it, expect } from 'vitest';
import { createUselessBot } from '@useless/core';

describe('My Useless Bot App', () => {
  it('should do nothing', async () => {
    const app = createUselessBot();
    await app.initialize();
    await app.run();
    
    const result = app.getResult();
    expect(result).toBeUndefined();
  });
});
```

## Best Practices

### 1. Always Initialize

```typescript
// ✅ Good
await app.initialize();
await app.run();

// ❌ Bad
await app.run(); // Throws UselessError
```

### 2. Clean Up Resources

```typescript
const app = createUselessBot();

try {
  await app.initialize();
  await app.run();
} finally {
  await app.destroy();
}
```

### 3. Use TypeScript

```typescript
// ✅ Good - Type-safe
import type { UselessResult } from '@useless/types';
const result: UselessResult = app.getResult();

// ❌ Less good - No type safety
const result = app.getResult();
```

### 4. Handle Errors

```typescript
try {
  await app.run();
} catch (error) {
  if (error instanceof UselessError) {
    // Handle useless bot-specific errors
  }
  throw error;
}
```

## Advanced Topics

### Custom Implementations

You can create custom void implementations:

```typescript
import type { UselessInstance, UselessOptions } from '@useless/core';

export function createCustomUselessBot(options: UselessOptions): UselessInstance {
  // Your custom implementation
  return {
    async initialize() { /* ... */ },
    async run() { /* ... */ },
    async destroy() { /* ... */ },
    getResult() { return undefined; },
    getStatus() { return 'ready'; },
    getConfig() { return options; }
  };
}
```

### Performance Optimization

Tips for optimal nothing:

1. **Lazy Loading**: Load packages only when needed
2. **Memoization**: Cache nothing for faster access
3. **Tree Shaking**: Remove what's not used (everything)
4. **Code Splitting**: Split your nothing across chunks

### Debugging

Debug your void applications:

```typescript
const app = createUselessBot({ debug: true });

// Logs will show lifecycle events
await app.initialize(); // [Useless] Initialized successfully
await app.run();        // [Useless] Running...
                        // [Useless] Complete!
```

## Next Steps

- Explore the [API Reference](api-reference.md)
- Learn about [Plugin Development](plugin-development.md)
- Check out [Examples](../examples/)

---

*You will own nothing and be happy.*
