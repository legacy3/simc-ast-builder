/**
 * This file defines optimizer and parser-related types
 */

// Import base AST type from common-types
import { ASTNode } from "../parser/visitors/ast/common-types";

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
  // No longer supports optimizer options
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
