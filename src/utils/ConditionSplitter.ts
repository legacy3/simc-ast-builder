import { ExpressionNode } from "../parser/visitors/ast/common-types";
import { AndExprExpressionNode } from "../parser/visitors/ast/ContextHandlers/Basic";

/**
 * Utility class to split a logical condition AST into its top-level AND parts.
 *
 * Example:
 *   Given an ExpressionNode representing A && (B && C),
 *   splitByAnd(node) returns [A, B, C].
 */
export class ConditionSplitter {
  /**
   * Splits an ExpressionNode into its top-level AND parts.
   * If the node is not an AND, returns [node].
   * @param node The root ExpressionNode.
   * @returns ExpressionNode[] Array of AND parts, in source order.
   */
  static splitByAnd(node: ExpressionNode): ExpressionNode[] {
    if (node.nodeType === "and") {
      const andNode = node as AndExprExpressionNode;

      return [
        ...ConditionSplitter.splitByAnd(andNode.left),
        ...ConditionSplitter.splitByAnd(andNode.right),
      ];
    }

    return [node];
  }
}
