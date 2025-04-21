import { ExpressionNode } from "../../common-types";
import { SimCVisitorError } from "../../errors/SimCVisitorError";
import { getDefaultField, getFieldDef } from "../../utils/fieldMaps";
import { AccessHandlerFn } from "../BaseHandler";

/**
 * Specialized node type for action access
 */
interface ActionExpressionNode extends ExpressionNode {
  actionName: string;
  field: string;
  nodeType: "action";
}

/**
 * Handler for action access contexts
 */
const handleAction: AccessHandlerFn<ActionExpressionNode> = ({
  ctx,
  parts,
}) => {
  if (parts.length < 2) {
    throw new SimCVisitorError("Action access requires an action name", ctx);
  }

  const actionName = parts[1]!; // Non-null assertion since we check parts.length above
  const rawField = parts.length > 2 ? parts[2] : null;
  const defaultField = getDefaultField("action");
  const field = rawField || defaultField || "";

  const fieldDef = getFieldDef(field);

  return {
    actionName,
    expressionType: fieldDef.type,
    field,
    kind: "expression",
    nodeType: "action",
  };
};

export { handleAction, type ActionExpressionNode };
