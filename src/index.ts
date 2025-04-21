import { Parser } from './parser';
import { ASTNode, ParserOptions, SyntaxTree, OptimizerOptions, DEFAULT_OPTIMIZER_OPTIONS } from './types';
import { ConditionOptimizer } from './utils/ConditionOptimizer';

/**
 * Parse SimC code into an AST without optimization
 * 
 * @param input - The SimC code to parse
 * @returns The parsed AST node
 * 
 * @example
 * ```typescript
 * import { parse } from 'simc-parser';
 * 
 * const code = 'actions=frost_strike,if=runic_power>=80';
 * const ast = parse(code);
 * console.log(ast);
 * ```
 */
export function parse(input: string): ASTNode {
  try {
    const parser = new Parser();
    return parser.parse(input);
  } catch (error) {
    // In case of error, return a basic error node
    return {
      kind: 'error',
      message: error instanceof Error ? error.message : String(error)
    };
  }
}

/**
 * Optimize an AST node (primarily for condition optimization)
 * 
 * @param node - The AST node to optimize
 * @param options - Optimization options
 * @returns The optimized AST node
 * 
 * @example
 * ```typescript
 * import { parse, optimize } from 'simc-parser';
 * 
 * const code = 'actions=frost_strike,if=runic_power>=80&(buff.killing_machine.up|!talent.obliteration)';
 * const ast = parse(code);
 * 
 * // Optimize with default options
 * const optimizedAst = optimize(ast);
 * 
 * // With specific optimization options
 * const customOptimizedAst = optimize(ast, { 
 *   doubleNegation: true,
 *   deMorgansLaw: false,
 *   commonSubexpressions: true
 * });
 * ```
 */
export function optimize(node: ASTNode, options: OptimizerOptions = DEFAULT_OPTIMIZER_OPTIONS): ASTNode {
  try {
    const optimizer = new ConditionOptimizer(options);
    
    // Only optimize expression nodes
    if (node.kind === 'expression') {
      return optimizer.optimize(node as any);
    }
    
    return node;
  } catch (error) {
    // In case of error, return the original node
    return node;
  }
}

/**
 * Generate an Abstract Syntax Tree (AST) from SimC code with optimization
 * 
 * @param input - The SimC code to parse
 * @param options - Parser options
 * @returns A SyntaxTree containing the parsed AST and any errors
 * 
 * @example
 * ```typescript
 * import { generateAST } from 'simc-parser';
 * 
 * const code = 'actions=frost_strike,if=runic_power>=80';
 * const result = generateAST(code);
 * console.log(result.root);
 * ```
 */
export function generateAST(input: string, options: ParserOptions = {}): SyntaxTree {
  try {
    // Parse the input
    const ast = parse(input);
    
    // Apply optimizations based on options
    const optimizationOptions = options.optimizations;
    
    // Apply optimizations with provided options or default behavior
    // If the enabled flag is explicitly set to false, skip optimization
    const skipOptimization = optimizationOptions?.enabled === false;
    const optimizedAst = skipOptimization 
      ? ast 
      : optimize(ast, optimizationOptions || DEFAULT_OPTIMIZER_OPTIONS);

    return {
      root: optimizedAst,
      errors: [] // We'll collect any errors in the real implementation
    };
  } catch (error) {
    // Handle parsing errors
    return {
      root: { kind: 'error' } as any,
      errors: [{
        message: error instanceof Error ? error.message : String(error),
        severity: 'error'
      }]
    };
  }
}

// Export all types
export * from './types';

// Export utilities that might be useful for consumers
export { ConditionOptimizer } from './utils/ConditionOptimizer';
