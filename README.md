# SimC AST Builder

A TypeScript library for parsing and building abstract syntax trees (ASTs) from SimulationCraft (SimC) action lists.

## Features

- Parse SimulationCraft expressions and action lists
- Generate fully-typed abstract syntax trees
- Optimize conditions with various transformation rules
- Built with ANTLR4 for robust parsing
- Full TypeScript support with type definitions

## Installation

```bash
npm install simc-ast-builder
```

## Usage

### Basic Parsing

```typescript
import { parse } from 'simc-ast-builder';

// Parse a SimC action line
const code = 'actions=frost_strike,if=runic_power>=80';
const ast = parse(code);
console.log(JSON.stringify(ast, null, 2));
```

### Condition Optimization

```typescript
import { parse, optimize } from 'simc-ast-builder';

// Parse a SimC action with complex conditions
const code = 'actions=frost_strike,if=!(!runic_power>=80&!buff.killing_machine.up)';
const ast = parse(code);

// Optimize the AST to simplify conditions
const optimizedAst = optimize(ast);
console.log(JSON.stringify(optimizedAst, null, 2));
```

### Custom Optimization Options

```typescript
import { parse, optimize } from 'simc-ast-builder';

const code = 'actions=frost_strike,if=!(!runic_power>=80&buff.killing_machine.up)';
const ast = parse(code);

// Apply only specific optimizations
const customOptimizedAst = optimize(ast, { 
  enabled: true,               // Overall enable flag
  doubleNegation: true,        // Simplify !!A -> A
  deMorgansLaw: true,          // Apply De Morgan's laws
  complementaryTerms: false,   // Don't optimize A && !A -> false
  constantsAndIdentities: false,
  absorptionLaws: false,
  flattenNestedOperations: false,
  commonSubexpressions: false
});
```

### All-in-one Parsing and Optimization

```typescript
import { generateAST } from 'simc-ast-builder';

const code = 'actions=frost_strike,if=runic_power>=80';
const result = generateAST(code);
// Result contains the optimized AST and any errors
```

## Project Structure

- `/src` - Source code
  - `/parser` - ANTLR4 parser integration
    - `/antlr4` - ANTLR4 grammar and generated files
    - `/visitors` - AST visitor implementation
  - `/types` - TypeScript type definitions
  - `/utils` - Utility functions including condition optimizer

## Development

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/legacy3/simc-ast-builder.git
cd simc-ast-builder

# Install dependencies
npm install

# Generate ANTLR4 parser from grammar
npm run generate

# Build the project
npm run build

# Run tests
npm test
```

### Available Scripts

- `npm run build` - Build the project
- `npm run generate` - Generate ANTLR4 parser files from grammar
- `npm test` - Run tests
- `npm run format` - Format code with Prettier
- `npm run lint` - Lint code with ESLint

## License

This project is licensed under the [GPL-3.0 License](LICENSE).
