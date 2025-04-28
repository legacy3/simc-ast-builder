import { ExpressionNode } from "../../common-types";
import { SimCVisitorError } from "../../errors/SimCVisitorError";
import { getFieldDef } from "../../utils/fieldMaps";
import { AccessHandlerFn } from "../BaseHandler";

/**
 * Specialized node type for prev_off_gcd access
 */
interface PrevOffGcdExpressionNode extends ExpressionNode {
  actionName: string;
  index: number;
  nodeType: "prev_off_gcd";
}

/**
 * Handler for prev_off_gcd access contexts
 * This handles access to previous off-GCD spell usage
 * Supports patterns like:
 * - prev_off_gcd.spell_name (implicit index 1)
 * - prev_off_gcd.1.spell_name (explicit index 1)
 * - prev_off_gcd.2.spell_name (explicit index 2)
 * - prev_off_gcd.3.spell_name (explicit index 3)
 */
const handlePrevOffGcd: AccessHandlerFn<PrevOffGcdExpressionNode> = ({
  ctx,
  parts,
}) => {
  if (parts.length < 2) {
    throw new SimCVisitorError(
      "Prev off GCD access requires an action name",
      ctx,
    );
  }

  // Check if the first part is a number (index)
  const firstPart = parts[1] || "";
  let index = parseInt(firstPart, 10);
  let actionName: string;

  if (isNaN(index)) {
    // If not a number, it's the action name with implicit index 1
    index = 1;
    actionName = firstPart;
  } else {
    // If it's a number, the next part is the action name
    if (parts.length < 3) {
      throw new SimCVisitorError(
        "Prev off GCD access with index requires an action name",
        ctx,
      );
    }
    actionName = parts[2] || "";
  }

  const fieldDef = getFieldDef(actionName);

  return {
    actionName,
    expressionType: fieldDef.type,
    index,
    kind: "expression",
    nodeType: "prev_off_gcd",
  };
};

export { handlePrevOffGcd, type PrevOffGcdExpressionNode };
