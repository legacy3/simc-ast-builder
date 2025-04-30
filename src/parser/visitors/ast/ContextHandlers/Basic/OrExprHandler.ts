import { OrExprContext } from "../../../../antlr4/SimCExprParser";
import { ExpressionNode } from "../../common-types";
import { ContextHandlerFn } from "../BaseHandler";

/**
 * Specialized node type for logical OR expressions
 */
interface OrExprExpressionNode extends ExpressionNode {
  left: ExpressionNode;
  nodeType: "or";
  operator: "or";
  right: ExpressionNode;
}

/**
 * Handler for logical OR expressions
 */
const handleOrExpr: ContextHandlerFn<OrExprExpressionNode, OrExprContext> = (
  ctx,
  visitor,
) => {
  const left = visitor.visit(ctx.expression(0)) as ExpressionNode;
  const right = visitor.visit(ctx.expression(1)) as ExpressionNode;

  return {
    expressionType: "boolean",
    kind: "expression",
    left,
    nodeType: "or",
    operator: "or",
    right,
  };
};

export { handleOrExpr, type OrExprExpressionNode };
