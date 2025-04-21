import { ExpressionNode } from "../../common-types";
import { SimCVisitorError } from "../../errors/SimCVisitorError";
import { getDefaultField, getFieldDef } from "../../utils/fieldMaps";
import { AccessHandlerFn } from "../BaseHandler";

/**
 * Specialized node type for trinket access
 */
interface TrinketExpressionNode extends ExpressionNode {
  field: string;
  nodeType: "trinket";
  trinketSlot: string;
}

/**
 * Handler for trinket access contexts
 */
const handleTrinket: AccessHandlerFn<TrinketExpressionNode> = ({
  ctx,
  parts,
}) => {
  if (!parts || !Array.isArray(parts) || parts.length < 1) {
    throw new SimCVisitorError("Trinket access requires a slot", ctx);
  }

  // The slot can be a number (1, 2) or empty (for any trinket)
  // Ensure slot is always a string
  const slot = parts.length > 1 && parts[1] ? parts[1] : "0";

  // For complex fields like "has_buff.strength", join all remaining parts
  let rawField = null;
  if (parts.length > 2) {
    rawField = parts.slice(2).join(".");
  }

  const defaultField = getDefaultField("trinket");
  const field = rawField || defaultField || "";

  const fieldDef = getFieldDef(field);

  return {
    expressionType: fieldDef.type,
    field,
    kind: "expression",
    nodeType: "trinket",
    trinketSlot: slot,
  };
};

export { handleTrinket, type TrinketExpressionNode };
