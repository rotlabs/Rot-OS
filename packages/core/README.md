# @useless/core

The core framework functionality for useless bot. This package provides the fundamental building blocks for creating nothing.

## Installation

```bash
npm install @useless/core
# or
yarn add @useless/core
# or
pnpm add @useless/core
```

## Usage

```typescript
import { createUselessBot, UselessOptions } from '@useless/core';

// Create a new useless bot instance
const app = createUselessBot({
  mode: 'production',
  debug: false
});

// Initialize useless bot
await app.initialize();

// Run useless bot
await app.run();

// Get the result (spoiler: it's nothing)
const result = app.getResult();
console.log(result); // undefined
```

## API

### `createUselessBot(options?): UselessInstance`

Creates a new useless bot instance with optional configuration.

#### Options

- `mode` - The mode to run in (`'development'` | `'production'`)
- `debug` - Enable debug logging (default: `false`)
- `plugins` - Array of plugins to load

#### Returns

A `VoidInstance` with the following methods:

- `initialize()` - Initializes the void (does nothing, but asynchronously)
- `run()` - Runs the void (also does nothing)
- `destroy()` - Destroys the void (nothing was there anyway)
- `getResult()` - Gets the result (always `undefined`)
- `getStatus()` - Gets the current status (always `'ready'`)

### `isUseless(value): boolean`

Checks if a value is a useless bot instance.

```typescript
import { createUselessBot, isUseless } from '@useless/core';

const app = createUselessBot();
console.log(isUseless(app)); // true
console.log(isUseless({})); // false
```

### `UselessError`

The base error class for all useless bot-related errors. Useful for error handling in your nothing.

```typescript
import { UselessError } from '@useless/core';

try {
  // Your code that does nothing
} catch (error) {
  if (error instanceof UselessError) {
    // Handle useless bot-specific errors
  }
}
```

## Examples

### Basic Example

```typescript
import { createUselessBot } from '@useless/core';

async function main() {
  const app = createUselessBot();
  await app.initialize();
  await app.run();
  
  console.log('Successfully did nothing!');
}

main();
```

### With Options

```typescript
import { createUselessBot } from '@useless/core';

const app = createUselessBot({
  mode: 'production',
  debug: true,
  plugins: []
});

await app.initialize();
console.log(app.getStatus()); // 'ready'
```

## License

MIT © The Void Team
