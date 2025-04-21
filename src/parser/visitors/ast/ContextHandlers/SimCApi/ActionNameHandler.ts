import { ActionNameContext } from "../../../../antlr4/SimCExprParser";
import { ExpressionNode } from "../../common-types";
import { ContextHandlerFn } from "../BaseHandler";
import { handleIdentifier } from "../Basic/IdentifierHandler";

/**
 * Specialized node type for action name access
 */
interface ActionNameExpressionNode extends ExpressionNode {
  nodeType: "actionName";
}

/**
 * Handler for SimC action name contexts
 */
const handleActionName: ContextHandlerFn<ActionNameExpressionNode> = (
  ctx,
  visitor,
) => {
  const actionNameCtx = ctx as ActionNameContext;
  const identifierCtx = actionNameCtx.identifier();
  if (!identifierCtx) {
    throw new Error("Action name has no identifier child");
  }

  const base = handleIdentifier(identifierCtx, visitor);
  return {
    ...base,
    nodeType: "actionName",
  };
};

export { handleActionName, type ActionNameExpressionNode };
