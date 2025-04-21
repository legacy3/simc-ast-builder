import { ExpressionNode } from "../../common-types";
import { SimCVisitorError } from "../../errors/SimCVisitorError";
import { getFieldDef } from "../../utils/fieldMaps";
import { AccessHandlerFn } from "../BaseHandler";

/**
 * Specialized node type for prev_gcd access
 */
interface PrevGcdExpressionNode extends ExpressionNode {
  field: string | undefined;
  index: number;
  nodeType: "prev_gcd";
}

/**
 * Handler for prev_gcd access contexts
 * This handles patterns like prev_gcd.1.spell_name
 */
const handlePrevGcd: AccessHandlerFn<PrevGcdExpressionNode> = ({
  ctx,
  parts,
}) => {
  if (parts.length < 2) {
    throw new SimCVisitorError("prev_gcd access requires an index", ctx);
  }

  // The first part after prev_gcd can be a number (e.g., prev_gcd.1) or a spell name (e.g., prev_gcd.earthen_wall_totem)
  const indexStr = parts[1] || "0";
  let index = parseInt(indexStr, 10);
  let field = "";

  if (isNaN(index)) {
    // If it's not a number, treat it as a spell name
    index = 1; // Default to 1 (previous GCD)
    field = indexStr || "";
  } else {
    // If it's a number, the second part is the spell name (e.g., prev_gcd.1.death_sweep)
    field = parts.length > 2 ? parts[2] || "" : "";
  }
  const fieldDef = getFieldDef("value");

  return {
    expressionType: fieldDef.type,
    field: field,
    index,
    kind: "expression",
    nodeType: "prev_gcd",
  };
};

export { handlePrevGcd, type PrevGcdExpressionNode };
