import { AndExprContext } from "../../../../antlr4/SimCExprParser";
import { ExpressionNode } from "../../common-types";
import { ContextHandlerFn } from "../BaseHandler";

/**
 * Specialized node type for logical AND expressions
 */
interface AndExprExpressionNode extends ExpressionNode {
  left: ExpressionNode;
  nodeType: "and";
  operator: "and";
  right: ExpressionNode;
}

/**
 * Handler for logical AND expressions
 */
const handleAndExpr: ContextHandlerFn<AndExprExpressionNode, AndExprContext> = (
  ctx,
  visitor,
) => {
  const left = visitor.visit(ctx.expression(0)) as ExpressionNode;
  const right = visitor.visit(ctx.expression(1)) as ExpressionNode;

  return {
    expressionType: "boolean",
    kind: "expression",
    left,
    nodeType: "and",
    operator: "and",
    right,
  };
};

export { handleAndExpr, type AndExprExpressionNode };
