import { ExpressionNode } from "../../common-types";
import { SimCVisitorError } from "../../errors/SimCVisitorError";
import { ContextHandlerFn } from "../BaseHandler";

/**
 * Specialized node type for number expression contexts
 */
interface NumberExprExpressionNode extends ExpressionNode {
  nodeType: "literal";
  value: string;
}

/**
 * Handler for number expression contexts
 */
const handleNumberExpr: ContextHandlerFn<NumberExprExpressionNode> = (
  ctx,
  visitor,
): NumberExprExpressionNode => {
  if (!ctx.text) {
    throw new SimCVisitorError("Empty number text", ctx);
  }

  return {
    expressionType: "numeric",
    kind: "expression",
    nodeType: "literal",
    value: ctx.text,
  };
};

export { handleNumberExpr, type NumberExprExpressionNode };
