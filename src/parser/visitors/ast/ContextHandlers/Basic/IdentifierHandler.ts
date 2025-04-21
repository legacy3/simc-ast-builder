import { IdentifierContext } from "../../../../antlr4/SimCExprParser";
import { ExpressionNode } from "../../common-types";
import { SimCVisitorError } from "../../errors/SimCVisitorError";
import { ContextHandlerFn } from "../BaseHandler";

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

  return {
    expressionType: "neutral",
    kind: "expression",
    nodeType: "identifier",
    value: ctx.text,
  };
};

export { handleIdentifier, type IdentifierExpressionNode };
