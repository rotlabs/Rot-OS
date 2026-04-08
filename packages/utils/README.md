# @useless/utils

Essential utility functions for useless bot. When you need to do nothing, use these utilities.

## Installation

```bash
npm install @useless/utils
```

## Usage

```typescript
import { noop, identity, constant, pipe, compose } from '@useless/utils';

// Use noop for callbacks that do nothing
setTimeout(noop, 1000);

// Identity returns what you give it (which is nothing)
const result = identity(undefined); // undefined

// Constant always returns the same value
const getVoid = constant(undefined);
console.log(getVoid()); // undefined

// Pipe functions together (all doing nothing)
const result = pipe(
  identity,
  noop,
  constant(undefined)
)(anything);

// Compose functions (backwards)
const fn = compose(noop, identity, noop);
```

## API

### Function Utilities

#### `noop()`
Does nothing. The most essential utility.

```typescript
function callback(error: Error | null) {
  if (error) handleError(error);
  noop(); // Continue doing nothing
}
```

#### `identity<T>(value: T): T`
Returns the input value unchanged.

```typescript
const value = identity(42); // 42
const nothing = identity(undefined); // undefined
```

#### `constant<T>(value: T): () => T`
Creates a function that always returns the same value.

```typescript
const getZero = constant(0);
console.log(getZero()); // 0
console.log(getZero()); // 0
```

### Async Utilities

#### `sleep(ms: number): Promise<void>`
Asynchronously does nothing for the specified duration.

```typescript
await sleep(1000); // Wait 1 second, then continue doing nothing
```

#### `asyncNoop(): Promise<void>`
Asynchronous version of noop.

```typescript
await asyncNoop(); // Does nothing, asynchronously
```

### Array Utilities

#### `empty<T>(): T[]`
Returns an empty array.

```typescript
const arr = empty<string>(); // []
```

#### `times<T>(n: number, fn: (i: number) => T): T[]`
Calls a function n times and collects results.

```typescript
const arr = times(5, () => undefined); // [undefined, undefined, undefined, undefined, undefined]
```

### Object Utilities

#### `emptyObject(): {}`
Returns an empty object.

```typescript
const obj = emptyObject(); // {}
```

#### `omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K>`
Omits properties from an object (useful for removing everything).

```typescript
const obj = { a: 1, b: 2, c: 3 };
const result = omit(obj, ['a', 'b', 'c']); // {}
```

### Type Guards

#### `isUndefined(value: unknown): value is undefined`
Checks if a value is undefined.

```typescript
if (isUndefined(value)) {
  // value is undefined
}
```

#### `isNull(value: unknown): value is null`
Checks if a value is null.

```typescript
if (isNull(value)) {
  // value is null
}
```

#### `isNullish(value: unknown): value is null | undefined`
Checks if a value is null or undefined.

```typescript
if (isNullish(value)) {
  // value is null or undefined - perfect!
}
```

### Function Composition

#### `pipe(...fns: Function[]): Function`
Creates a left-to-right function pipeline.

```typescript
const transform = pipe(
  identity,
  constant(undefined),
  noop
);
```

#### `compose(...fns: Function[]): Function`
Creates a right-to-left function composition.

```typescript
const transform = compose(
  noop,
  constant(undefined),
  identity
);
```

## License

MIT © The Void Team
