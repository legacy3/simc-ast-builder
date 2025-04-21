import { StringExprContext } from "../../../../antlr4/SimCExprParser";
import { ExpressionNode } from "../../common-types";
import { SimCVisitorError } from "../../errors/SimCVisitorError";
import { ContextHandlerFn } from "../BaseHandler";
import { contextHandlerRegistry } from "../ContextHandlerRegistry";

/**
 * Specialized node type for string expression contexts
 */
interface StringExprExpressionNode extends ExpressionNode {
  nodeType: "literal";
  value: string;
}

/**
 * Handler for string expression contexts
 */
const handleStringExpr: ContextHandlerFn<
  StringExprExpressionNode,
  StringExprContext
> = (ctx, visitor) => {
  if (!ctx.text) {
    throw new SimCVisitorError("Empty string text", ctx);
  }

  // Only add warning if this token isn't handled by a registered handler
  if (!contextHandlerRegistry.hasAccessHandler(ctx.text)) {
    // addWarning("stringExpr", ctx.text);
  }

  return {
    expressionType: "neutral",
    kind: "expression",
    nodeType: "literal",
    value: ctx.text,
  };
};

export { handleStringExpr, type StringExprExpressionNode };
