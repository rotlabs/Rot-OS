# @useless/react

React hooks and components for useless bot. Render nothing, reactively.

## Installation

```bash
npm install @useless/react react
```

## Hooks

### `useUseless()`

Creates a useless bot instance in your component.

```typescript
import { useUseless } from '@useless/react';

function MyComponent() {
  const useless = useUseless({
    mode: 'production'
  });

  return <div>Rendering nothing!</div>;
}
```

### `useNothing()`

A hook that returns nothing. Always.

```typescript
import { useNothing } from '@useless/react';

function MyComponent() {
  const nothing = useNothing(); // undefined
  
  return null; // Render nothing
}
```

### `useUselessEffect(callback)`

Like `useEffect`, but does nothing.

```typescript
import { useVoidEffect } from '@useless/react';

function MyComponent() {
  useVoidEffect(() => {
    // This runs, but accomplishes nothing
  });

  return null;
}
```

### `useVoidState()`

State management for nothing.

```typescript
import { useVoidState } from '@useless/react';

function MyComponent() {
  const [value, setValue] = useVoidState(); 
  // value is always undefined, setValue does nothing

  return <button onClick={() => setValue(undefined)}>Do Nothing</button>;
}
```

### `useVoidCallback(callback)`

Memoizes a callback that does nothing.

```typescript
import { useVoidCallback } from '@useless/react';

function MyComponent() {
  const handleClick = useVoidCallback(() => {
    // Do nothing, but memoized!
  });

  return <button onClick={handleClick}>Click me</button>;
}
```

### `useVoidMemo(factory)`

Memoizes nothing.

```typescript
import { useVoidMemo } from '@useless/react';

function MyComponent() {
  const nothing = useVoidMemo(() => undefined);
  
  return null;
}
```

## Components

### `<UselessProvider>`

Provides useless bot context to your app.

```typescript
import { UselessProvider } from '@useless/react';

function App() {
  return (
    <UselessProvider config={{ mode: 'production' }}>
      <YourApp />
    </UselessProvider>
  );
}
```

### `<Void>`

A component that renders nothing.

```typescript
import { Void } from '@useless/react';

function MyComponent() {
  return (
    <>
      <h1>Hello</h1>
      <Void /> {/* Renders nothing */}
      <p>World</p>
    </>
  );
}
```

### `<Nothing>`

Alias for `<Void>`, also renders nothing.

```typescript
import { Nothing } from '@useless/react';

function MyComponent() {
  return <Nothing />;
}
```

## Context

### `useUselessContext()`

Access the useless bot context from any component.

```typescript
import { useUselessContext } from '@useless/react';

function MyComponent() {
  const { instance, config } = useUselessContext();
  
  return <div>Using useless bot context</div>;
}
```

## Higher-Order Components

### `withVoid(Component)`

Wraps a component with useless bot capabilities.

```typescript
import { withVoid } from '@useless/react';

function MyComponent({ useless }) {
  // Use useless bot instance
  return <div>Nothing here</div>;
}

export default withVoid(MyComponent);
```

## Examples

### Complete Example

```typescript
import { UselessProvider, useUseless, Void } from '@useless/react';

function UselessApp() {
  const useless = useUseless({ debug: true });
  
  React.useEffect(() => {
    void.initialize();
  }, []);

  return (
    <div>
      <h1>My Void App</h1>
      <Void />
      <p>Successfully rendered nothing!</p>
    </div>
  );
}

function App() {
  return (
    <VoidProvider>
      <VoidApp />
    </VoidProvider>
  );
}
```

## TypeScript

Full TypeScript support included:

```typescript
import type { UselessHookOptions, UselessContextValue } from '@useless/react';

const options: UselessHookOptions = {
  mode: 'production',
  debug: false
};
```

## License

MIT © The Void Team
