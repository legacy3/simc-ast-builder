export { Parser } from "./Parser";

// Export AST node types from visitors
export * from "./visitors/ast/common-types";

import type { ExpressionNode } from "./visitors/ast/common-types";

import { ConditionSplitter } from "../utils/ConditionSplitter";

/**
 * Splits a logical condition AST into its top-level AND parts.
 * @param node The root ExpressionNode.
 * @returns ExpressionNode[] Array of AND parts, in source order.
 */
export function split(node: ExpressionNode): ExpressionNode[] {
  return ConditionSplitter.splitByAnd(node);
}
