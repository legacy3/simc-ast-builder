import { IdentifierContext } from "../../../../antlr4/SimCExprParser";
import { ExpressionNode } from "../../common-types";
import { SimCVisitorError } from "../../errors/SimCVisitorError";
import { ContextHandlerFn } from "../BaseHandler";
import { contextHandlerRegistry } from "../ContextHandlerRegistry";

/**
 * Specialized node type for identifier contexts
 */
interface IdentifierExpressionNode extends ExpressionNode {
  nodeType: "identifier";
  value: string;
}

/**
 * Handler for identifier contexts
 */
const handleIdentifier: ContextHandlerFn<
  IdentifierExpressionNode,
  IdentifierContext
> = (ctx, visitor) => {
  if (!ctx.text) {
    throw new SimCVisitorError("Empty identifier text", ctx);
  }

  // Check if this identifier is a registered access handler
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

export { handleIdentifier, type IdentifierExpressionNode };
