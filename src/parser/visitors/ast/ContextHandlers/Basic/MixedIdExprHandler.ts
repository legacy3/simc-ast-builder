import { MixedIdExprContext } from "../../../../antlr4/SimCExprParser";
import { ExpressionNode } from "../../common-types";
import { SimCVisitorError } from "../../errors/SimCVisitorError";
import { ContextHandlerFn } from "../BaseHandler";
import { contextHandlerRegistry } from "../ContextHandlerRegistry";

/**
 * Specialized node type for mixed ID expression contexts
 */
interface MixedIdExprExpressionNode extends ExpressionNode {
  nodeType: "identifier";
  value: string;
}

/**
 * Handler for mixed ID expression contexts
 */
const handleMixedIdExpr: ContextHandlerFn<
  MixedIdExprExpressionNode,
  MixedIdExprContext
> = (ctx, visitor) => {
  if (!ctx.text) {
    throw new SimCVisitorError("Empty mixed ID text", ctx);
  }

  // Check if this mixed ID is a registered access handler
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
    nodeType: "identifier",
    value: ctx.text,
  };
};

export { handleMixedIdExpr, type MixedIdExprExpressionNode };
