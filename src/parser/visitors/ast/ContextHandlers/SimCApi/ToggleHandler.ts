import { ExpressionNode } from "../../common-types";
import { SimCVisitorError } from "../../errors/SimCVisitorError";
import { getFieldDef } from "../../utils/fieldMaps";
import { AccessHandlerFn } from "../BaseHandler";

/**
 * Specialized node type for toggle access
 */
interface ToggleExpressionNode extends ExpressionNode {
  nodeType: "toggle";
  toggleName: string;
}

/**
 * Handler for toggle access contexts
 */
const handleToggle: AccessHandlerFn<ToggleExpressionNode> = ({
  ctx,
  parts,
}) => {
  if (parts.length < 2) {
    throw new SimCVisitorError("Toggle access requires a name", ctx);
  }

  const name = parts[1]!; // Non-null assertion since we check parts.length above

  // Toggles don't have fields like other access types
  // They just return their value directly
  const fieldDef = getFieldDef("value");

  return {
    expressionType: fieldDef.type,
    field: "",
    kind: "expression",
    nodeType: "toggle",
    toggleName: name,
  };
};

export { handleToggle, type ToggleExpressionNode };
