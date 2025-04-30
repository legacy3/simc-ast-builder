import { XorExprContext } from "../../../../antlr4/SimCExprParser";
import { ExpressionNode } from "../../common-types";
import { ContextHandlerFn } from "../BaseHandler";

/**
 * Specialized node type for XOR expressions
 */
interface XorExprExpressionNode extends ExpressionNode {
  left: ExpressionNode;
  nodeType: "xor";
  operator: "xor";
  right: ExpressionNode;
}

/**
 * Handler for XOR expressions
 */
const handleXorExpr: ContextHandlerFn<XorExprExpressionNode, XorExprContext> = (
  ctx,
  visitor,
) => {
  const left = visitor.visit(ctx.expression(0)) as ExpressionNode;
  const right = visitor.visit(ctx.expression(1)) as ExpressionNode;

  return {
    expressionType: "boolean",
    kind: "expression",
    left,
    nodeType: "xor",
    operator: "xor",
    right,
  };
};

export { handleXorExpr, type XorExprExpressionNode };
