/**
 * This file defines optimizer and parser-related types
 */

// Import base AST type from common-types
import { ASTNode } from "../parser/visitors/ast/common-types";

/**
 * Detailed optimization options for the ConditionOptimizer
 */
export interface OptimizerOptions {
  /**
   * Apply absorption laws (A && (A || B) → A, A || (A && B) → A)
   */
  absorptionLaws?: boolean;

  /**
   * Eliminate common subexpressions ((A && B) || (A && C) → A && (B || C))
   */
  commonSubexpressions?: boolean;

  /**
   * Simplify complementary terms (A && !A → false, A || !A → true)
   */
  complementaryTerms?: boolean;

  /**
   * Sort non-logic-changing conditions by the library's built-in order.
   * If true, conditions are sorted by internal priority. If false or omitted, no sorting is performed.
   */
  conditionSorting?: boolean;

  /**
   * Simplify constants and identity operations (true && A → A, false || A → A, etc.)
   */
  constantsAndIdentities?: boolean;

  /**
   * Apply De Morgan's laws (!(A && B) → !A || !B)
   */
  deMorgansLaw?: boolean;

  /**
   * Simplify double negation (!!A → A)
   */
  doubleNegation?: boolean;

  /**
   * Overall enable/disable flag for all optimizations
   */
  enabled?: boolean;

  /**
   * Flatten nested operations (A && (B && C) → (A && B) && C)
   */
  flattenNestedOperations?: boolean;

  /**
   * Replace field with negatedName in NOT expressions (e.g., !buff.up → buff.down)
   */
  negatedFieldOptimization?: boolean;
}

/**
 * Default optimizer options with all optimizations enabled
 */
export const DEFAULT_OPTIMIZER_OPTIONS: OptimizerOptions = {
  absorptionLaws: true,
  commonSubexpressions: true,
  complementaryTerms: true,
  conditionSorting: true,
  constantsAndIdentities: true,
  deMorgansLaw: true,
  doubleNegation: true,
  enabled: true,
  flattenNestedOperations: true,
  negatedFieldOptimization: true,
};

/**
 * Error information from the parser
 */
export interface ParserError {
  /**
   * Error message
   */
  message: string;

  /**
   * Position information (line and column), if available
   */
  position?: {
    line: number;
    column: number;
  };

  /**
   * Severity of the error
   */
  severity: "error" | "warning";
}

/**
 * Options for the parser
 */
export interface ParserOptions {
  /**
   * Optimization options for the condition optimizer
   */
  optimizations?: OptimizerOptions;
}

/**
 * Result of parsing SimC code
 */
export interface SyntaxTree {
  /**
   * Any errors encountered during parsing
   */
  errors?: ParserError[];

  /**
   * The root node of the AST
   */
  root: ASTNode;
}

// Re-export AST node types
export type {
  ActionLineNode,
  ASTNode,
  BaseConditionableNode,
  BaseLineNode,
  BaseNode,
  CommentLineNode,
  ConditionNode,
  ExpressionNode,
  FieldInfo,
  NodeKind,
  ParameterNode,
  ParameterType,
  UseItemLineNode,
  VariableLineNode,
} from "../parser/visitors/ast/common-types";
