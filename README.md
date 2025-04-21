# simc-ast-builder

A parser and AST generator for SimulationCraft expressions and action lists.

## Installation

```bash
npm install simc-ast-builder
```

## Usage

This library provides functions to parse SimC code into an Abstract Syntax Tree (AST) and optimize condition expressions.

### Basic Parsing

```typescript
import { parse } from 'simc-ast-builder';

const code = 'actions=frost_strike,if=runic_power>=80';
const ast = parse(code);
console.log(ast);
```

### Optimization

```typescript
import { parse, optimize } from 'simc-ast-builder';

const code = 'actions=frost_strike,if=runic_power>=80&(buff.killing_machine.up|!talent.obliteration)';
const ast = parse(code);
const optimizedAst = optimize(ast);
console.log(optimizedAst);
```

### Custom Optimization Options

You can customize which optimizations are applied:

```typescript
import { parse, optimize } from 'simc-ast-builder';

const code = 'actions=frost_strike,if=!(!runic_power>=80&buff.killing_machine.up)';
const ast = parse(code);

// Only apply specific optimizations
const customOptimizedAst = optimize(ast, { 
  enabled: true,               // Overall enable/disable flag
  doubleNegation: true,        // Simplify !!A -> A
  deMorgansLaw: true,          // Apply De Morgan's laws
  complementaryTerms: false,   // Don't optimize A && !A -> false, etc.
  constantsAndIdentities: true // Simplify true && A → A, etc.
});
```

### All-in-One Parsing and Optimization

```typescript
import { generateAST } from 'simc-ast-builder';

const code = 'actions=frost_strike,if=runic_power>=80';
const result = generateAST(code);
console.log(result.root);
```

## Available Optimization Options

| Option | Description | Default |
|--------|-------------|---------|
| `enabled` | Overall enable/disable flag for all optimizations | `true` |
| `doubleNegation` | Simplify double negation (!!A → A) | `true` |
| `deMorgansLaw` | Apply De Morgan's laws (!(A && B) → !A \|\| !B) | `true` |
| `constantsAndIdentities` | Simplify constants and identities (true && A → A, etc.) | `true` |
| `complementaryTerms` | Simplify complementary terms (A && !A → false) | `true` |
| `absorptionLaws` | Apply absorption laws (A && (A \|\| B) → A) | `true` |
| `flattenNestedOperations` | Flatten nested operations (A && (B && C) → (A && B) && C) | `true` |
| `commonSubexpressions` | Eliminate common subexpressions ((A && B) \|\| (A && C) → A && (B \|\| C)) | `true` |

## License

GPL-3.0

This software is licensed under the GNU General Public License v3.0 to prevent commercial use in rotation builders or similar applications.
