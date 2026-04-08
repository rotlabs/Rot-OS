# @useless/types

TypeScript type definitions for useless bot. Because even nothing deserves proper types.

## Installation

```bash
npm install @useless/types
```

## Usage

```typescript
import type {
  Useless,
  UselessResult,
  UselessCallback,
  Nothing,
  Nullish,
  Empty,
  Never
} from '@useless/types';

// Use types in your code
const handleUseless: UselessCallback = () => {
  // Do nothing
};

const result: UselessResult = undefined;
```

## Types

### Core Types

#### `Useless`
Represents uselessness (nothing).
```typescript
type Useless = undefined;
```

#### `Nothing`
Union of null and undefined.
```typescript
type Nothing = null | undefined;
```

#### `Nullish`
Alias for Nothing.
```typescript
type Nullish = null | undefined;
```

#### `Empty`
Represents empty arrays and objects.
```typescript
type Empty = [] | {};
```

### Function Types

#### `VoidCallback`
A callback that returns nothing.
```typescript
type VoidCallback = () => void;
```

#### `VoidAsyncCallback`
An async callback that returns nothing.
```typescript
type VoidAsyncCallback = () => Promise<void>;
```

#### `VoidFunction<T>`
A function that takes T and returns void.
```typescript
type VoidFunction<T> = (arg: T) => void;
```

### Result Types

#### `VoidResult`
The result of a void operation (always undefined).
```typescript
type VoidResult = undefined;
```

#### `VoidPromise`
A promise that resolves to nothing.
```typescript
type VoidPromise = Promise<void>;
```

### Utility Types

#### `NonEmpty<T>`
Ensures T is not empty (ironically).
```typescript
type NonEmpty<T extends any[]> = T extends [] ? never : T;
```

#### `MaybeVoid<T>`
T or void.
```typescript
type MaybeVoid<T> = T | void;
```

#### `VoidOr<T>`
T or VoidResult.
```typescript
type VoidOr<T> = T | VoidResult;
```

## Advanced Types

### `DeepVoid<T>`
Recursively converts all properties to void.
```typescript
type DeepVoid<T> = {
  [K in keyof T]: void;
};
```

### `VoidTuple<N>`
Creates a tuple of N voids.
```typescript
type VoidTuple<N extends number> = void extends void ? void[] : never;
```

### `VoidRecord<K>`
Creates a record with void values.
```typescript
type VoidRecord<K extends string | number | symbol> = Record<K, void>;
```

## License

MIT © The Void Team
