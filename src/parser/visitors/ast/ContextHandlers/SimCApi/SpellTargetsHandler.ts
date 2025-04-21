import { ExpressionNode } from "../../common-types";
import { SimCVisitorError } from "../../errors/SimCVisitorError";
import { getFieldDef } from "../../utils/fieldMaps";
import { AccessHandlerFn } from "../BaseHandler";

/**
 * Specialized node type for spell_targets access
 */
interface SpellTargetsExpressionNode extends ExpressionNode {
  nodeType: "spell_targets";
  spellName: string;
}

/**
 * Handler for spell_targets access contexts
 */
const handleSpellTargets: AccessHandlerFn<SpellTargetsExpressionNode> = ({
  ctx,
  parts,
}) => {
  if (parts.length < 2) {
    throw new SimCVisitorError(
      "Spell targets access requires a spell name",
      ctx,
    );
  }

  const spellName = parts[1]!; // Non-null assertion since we check parts.length above

  // spell_targets always returns a numeric value
  const fieldDef = getFieldDef("value");

  return {
    expressionType: "numeric", // Always numeric
    field: "",
    kind: "expression",
    nodeType: "spell_targets",
    spellName,
  };
};

export { handleSpellTargets, type SpellTargetsExpressionNode };
