import { ExpressionNode } from "../../common-types";
import { SimCVisitorError } from "../../errors/SimCVisitorError";
import { getFieldDef } from "../../utils/fieldMaps";
import { AccessHandlerFn } from "../BaseHandler";

/**
 * Specialized node type for equipped access
 */
interface EquippedExpressionNode extends ExpressionNode {
  itemName: string;
  nodeType: "equipped";
}

/**
 * Handler for equipped access contexts
 */
const handleEquipped: AccessHandlerFn<EquippedExpressionNode> = ({
  ctx,
  parts,
}) => {
  if (parts.length < 2) {
    throw new SimCVisitorError("Equipped access requires an item name", ctx);
  }

  const itemName = parts[1]!; // Non-null assertion since we check parts.length above

  // equipped always returns a boolean value (whether the item is equipped or not)
  const fieldDef = getFieldDef("value");

  return {
    expressionType: "boolean", // Always boolean
    field: "",
    itemName,
    kind: "expression",
    nodeType: "equipped",
  };
};

export { handleEquipped, type EquippedExpressionNode };
