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

  // Check if this string is a registered access handler (like "boss")
  if (contextHandlerRegistry.hasAccessHandler(ctx.text)) {
    // If it is, use that handler instead
    return contextHandlerRegistry.dispatchAccess(
      ctx.text as any,
      ctx,
      visitor,
      [ctx.text],
    );
  }

  return {
    expressionType: "neutral",
    kind: "expression",
    nodeType: "literal",
    value: ctx.text,
  };
};

export { handleStringExpr, type StringExprExpressionNode };
