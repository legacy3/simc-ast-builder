import { AndExprContext } from "../../../../antlr4/SimCExprParser";
import { ExpressionNode } from "../../common-types";
import { ContextHandlerFn } from "../BaseHandler";

/**
 * Specialized node type for add or subtract expressions
 */
interface AndExprExpressionNode extends ExpressionNode {
  left: ExpressionNode;
  nodeType: "and";
  operator: "and";
  right: ExpressionNode;
}

/**
 * Handler for add or subtract expressions
 */
const handleAndExpr: ContextHandlerFn<AndExprExpressionNode, AndExprContext> = (
  ctx,
  visitor,
) => {
  const left = visitor.visit(ctx.expression(0)) as ExpressionNode;
  const right = visitor.visit(ctx.expression(1)) as ExpressionNode;

  return {
    expressionType: "numeric",
    kind: "expression",
    left,
    nodeType: "and",
    operator: "and",
    right,
  };
};

export { handleAndExpr, type AndExprExpressionNode };
