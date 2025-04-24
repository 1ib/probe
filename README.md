# @1ib/probe

A lightweight utility for tracking property access chains, which can become whatever you want, useful for debugging and path tracing.

## Usage

### 1. Inject the probe code into your debug console

Open [this link](https://cdn.jsdelivr.net/npm/@1ib/probe@latest/dist/index.umd.js) and copy the latest code into your debug console:

```js
// Example context you need to debug
function blackBox(p) {
  return p.a.b.c(1, 2).d[3][4];
}

// 1. Copy the code from https://cdn.jsdelivr.net/npm/@1ib/probe@latest/dist/index.umd.js and paste it here.
// ...

// 2. Inject the probe into the context you want to debug
blackBox(probe); // Logs: probe.a.b.c.(1, 2).d.3.4
```

### 2. For project usage via npm

```bash
# Using npm
npm install @1ib/probe
```

```typescript
import Probe from '@1ib/probe';

const probe = new Probe({ callback: console.log });
probe.a.b.c(1, 2).d;
// Logs: ['a']
// Logs: ['a', 'b']
// Logs: ['a', 'b', 'c']
// Logs: ['a', 'b', 'c', [1, 2]]
// Logs: ['a', 'b', 'c', [1, 2], 'd']
```

## API

### `new Probe(options?)`

Creates a new instance of the probe.

#### Options

- `callback`: A function that is called with the current path array (default: `console.info`)

## Use Cases

- Debugging complex chained calls
- Tracing property access paths
- Building fluent APIs
- Inspecting object traversal

## License

MIT 