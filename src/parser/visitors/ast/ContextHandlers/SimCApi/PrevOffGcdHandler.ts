import { ExpressionNode } from "../../common-types";
import { SimCVisitorError } from "../../errors/SimCVisitorError";
import { getFieldDef } from "../../utils/fieldMaps";
import { AccessHandlerFn } from "../BaseHandler";

/**
 * Specialized node type for prev_off_gcd access
 */
interface PrevOffGcdExpressionNode extends ExpressionNode {
  nodeType: "prev_off_gcd";
  spellName: string;
}

/**
 * Handler for prev_off_gcd access contexts
 * This handles access to previous off-GCD spell usage
 */
const handlePrevOffGcd: AccessHandlerFn<PrevOffGcdExpressionNode> = ({
  ctx,
  parts,
}) => {
  if (parts.length < 2) {
    throw new SimCVisitorError(
      "Prev off GCD access requires a spell name",
      ctx,
    );
  }

  const spellName = parts[1] || "";
  const fieldDef = getFieldDef(spellName);

  return {
    expressionType: fieldDef.type,
    kind: "expression",
    nodeType: "prev_off_gcd",
    spellName,
  };
};

export { handlePrevOffGcd, type PrevOffGcdExpressionNode };
