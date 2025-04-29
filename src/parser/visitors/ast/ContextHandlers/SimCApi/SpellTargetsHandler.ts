import { ExpressionNode } from "../../common-types";
import { SimCVisitorError } from "../../errors/SimCVisitorError";
import { AccessHandlerFn } from "../BaseHandler";

/**
 * Specialized node type for spell_targets access
 */
interface SpellTargetsExpressionNode extends ExpressionNode {
  actionName: string;
  nodeType: "spell_targets";
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

  return {
    actionName: parts[1]!,
    expressionType: "numeric",
    kind: "expression",
    nodeType: "spell_targets",
  };
};

export { handleSpellTargets, type SpellTargetsExpressionNode };
