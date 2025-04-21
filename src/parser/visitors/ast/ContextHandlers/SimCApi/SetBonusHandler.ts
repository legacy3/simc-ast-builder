import { ExpressionNode } from "../../common-types";
import { getDefaultField, getFieldDef } from "../../utils/fieldMaps";
import { AccessHandlerFn } from "../BaseHandler";

/**
 * Specialized node type for set_bonus access
 */
interface SetBonusExpressionNode extends ExpressionNode {
  field: string;
  nodeType: "set_bonus";
}

/**
 * Handler for set_bonus access contexts
 */
const handleSetBonus: AccessHandlerFn<SetBonusExpressionNode> = ({ parts }) => {
  const rawField = parts.length > 1 ? parts[1] : null;
  const defaultField = getDefaultField("set_bonus");
  const field = rawField || defaultField || "";

  const fieldDef = getFieldDef(field);

  return {
    expressionType: fieldDef.type,
    field,
    kind: "expression",
    nodeType: "set_bonus",
  };
};

export { handleSetBonus, type SetBonusExpressionNode };
