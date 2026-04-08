# @useless/cli

Command-line interface for useless bot. Build nothing from the comfort of your terminal.

## Installation

```bash
npm install -g @useless/cli
# or
yarn global add @useless/cli
# or
pnpm add -g @useless/cli
```

## Commands

### `useless init`

Initialize a new useless bot project in the current directory.

```bash
useless init
useless init --name my-project
useless init --typescript
```

### `useless dev`

Start the development server (which does nothing, but in watch mode).

```bash
useless dev
useless dev --port 3000
useless dev --verbose
```

### `useless build`

Build your project for production.

```bash
useless build
useless build --minify
useless build --output dist
```

### `useless test`

Run your test suite.

```bash
void test
void test --watch
void test --coverage
```

### `void lint`

Lint your codebase.

```bash
void lint
void lint --fix
```

### `void deploy`

Deploy your application (to the void).

```bash
void deploy
void deploy --environment production
void deploy --dry-run
```

### `void --version`

Display the current version.

```bash
void --version
```

### `void --help`

Display help information.

```bash
void --help
void init --help
```

## Configuration

Create a `void.config.js` file in your project root:

```javascript
export default {
  mode: 'production',
  plugins: [],
  output: 'dist',
};
```

## Examples

```bash
# Create a new project
mkdir my-void-project
cd my-void-project
void init

# Start development
void dev

# Build for production
void build

# Deploy
void deploy
```

## License

MIT © The Void Team
