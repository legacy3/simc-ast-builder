import { AnyTokenExprContext } from "../../../../antlr4/SimCExprParser";
import { ExpressionNode } from "../../common-types";
import { SimCVisitorError } from "../../errors/SimCVisitorError";
import { ContextHandlerFn } from "../BaseHandler";
import { contextHandlerRegistry } from "../ContextHandlerRegistry";

/**
 * Specialized node type for any token expression contexts (catch-all)
 */
interface AnyTokenExprExpressionNode extends ExpressionNode {
  nodeType: "literal";
  value: string;
}

/**
 * Handler for any token expression contexts (catch-all)
 */
const handleAnyTokenExpr: ContextHandlerFn<
  AnyTokenExprExpressionNode,
  AnyTokenExprContext
> = (ctx, visitor) => {
  if (!ctx.text) {
    throw new SimCVisitorError("Empty token text", ctx);
  }

  // Only add warning if this token isn't handled by a registered handler
  if (!contextHandlerRegistry.hasAccessHandler(ctx.text)) {
    // addWarning("anyTokenExpr", ctx.text);
  }

  return {
    expressionType: "neutral",
    kind: "expression",
    nodeType: "literal",
    value: ctx.text,
  };
};

export { handleAnyTokenExpr, type AnyTokenExprExpressionNode };
