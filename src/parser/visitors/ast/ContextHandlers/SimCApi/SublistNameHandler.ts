import { SublistNameContext } from "../../../../antlr4/SimCExprParser";
import { ExpressionNode } from "../../common-types";
import { ContextHandlerFn } from "../BaseHandler";
import { handleIdentifier } from "../Basic/IdentifierHandler";

/**
 * Specialized node type for sublist name access
 */
interface SublistNameExpressionNode extends ExpressionNode {
  nodeType: "sublistName";
}

/**
 * Handler for SimC sublist name contexts
 */
const handleSublistName: ContextHandlerFn<SublistNameExpressionNode> = (
  ctx,
  visitor,
) => {
  // Downcast ctx to SublistNameContext for type safety
  const sublistNameCtx = ctx as SublistNameContext;
  const identifierCtx = sublistNameCtx.identifier();
  if (!identifierCtx) {
    throw new Error("Sublist name has no identifier child");
  }

  return {
    ...handleIdentifier(identifierCtx, visitor),
    nodeType: "sublistName",
  };
};

export { handleSublistName, type SublistNameExpressionNode };
