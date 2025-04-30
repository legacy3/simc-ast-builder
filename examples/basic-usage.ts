// This is an example of how to use the simc-ast-builder package
// In your own project, you would import from 'simc-ast-builder' instead of '../src'
import { parse, optimize, generateAST } from "../src";

// Example 1: Basic parsing
console.log("Example 1: Basic Parsing");
const code1 = "actions=frost_strike,if=runic_power>=80";
const ast1 = parse(code1);
console.log(JSON.stringify(ast1, null, 2));
console.log("\n-----------------\n");

// Example 2: Optimization
console.log("Example 2: Optimization");
const code2 =
  "actions=frost_strike,if=!(!runic_power>=80&!buff.killing_machine.up)";
const ast2 = parse(code2);
console.log("Before optimization:");
console.log(JSON.stringify(ast2, null, 2));

// Optimize with all optimizations enabled
const optimizedAst = optimize(ast2);
console.log("\nAfter optimization:");
console.log(JSON.stringify(optimizedAst, null, 2));
console.log("\n-----------------\n");

// Example 3: Custom optimization options
console.log("Example 3: Custom Optimization Options");
const code3 =
  "actions=frost_strike,if=!(!runic_power>=80&buff.killing_machine.up)";
const ast3 = parse(code3);

// Only apply specific optimizations with the OptimizerOptions interface
const customOptimizedAst = optimize(ast3, {
  enabled: true, // Overall enable flag
  doubleNegation: true, // Simplify !!A -> A
  deMorgansLaw: true, // Apply De Morgan's laws
  complementaryTerms: false, // Don't optimize A && !A -> false, etc.
  constantsAndIdentities: false,
  absorptionLaws: false,
  flattenNestedOperations: false,
  commonSubexpressions: false,
});

console.log("With limited optimizations:");
console.log(JSON.stringify(customOptimizedAst, null, 2));
console.log("\n-----------------\n");

// Example 4: All-in-one parsing and optimization
console.log("Example 4: All-in-one parsing and optimization");
const code4 = "actions=frost_strike,if=runic_power>=80";
const result = generateAST(code4);
console.log(JSON.stringify(result, null, 2));
