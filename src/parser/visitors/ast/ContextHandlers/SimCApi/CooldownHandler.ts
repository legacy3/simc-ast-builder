import { ExpressionNode } from "../../common-types";
import { SimCVisitorError } from "../../errors/SimCVisitorError";
import { getDefaultField, getFieldDef } from "../../utils/fieldMaps";
import { AccessHandlerFn } from "../BaseHandler";

/**
 * Specialized node type for cooldown access
 */
interface CooldownExpressionNode extends ExpressionNode {
  cooldownName: string;
  field: string;
  nodeType: "cooldown";
}

/**
 * Handler for cooldown access contexts
 */
const handleCooldown: AccessHandlerFn<CooldownExpressionNode> = ({
  ctx,
  parts,
}) => {
  if (parts.length < 2) {
    throw new SimCVisitorError("Cooldown access requires a name", ctx);
  }

  const name = parts[1]!; // Non-null assertion since we check parts.length above
  const rawField = parts.length > 2 ? parts[2] : null;
  const defaultField = getDefaultField("cooldown");
  const field = rawField || defaultField || "";

  const fieldDef = getFieldDef(field);

  return {
    cooldownName: name,
    expressionType: fieldDef.type,
    field,
    kind: "expression",
    nodeType: "cooldown",
  };
};

export { handleCooldown, type CooldownExpressionNode };
