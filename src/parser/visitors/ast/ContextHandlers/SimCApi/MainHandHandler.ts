import { ExpressionNode } from "../../common-types";
import { getDefaultField, getFieldDef } from "../../utils/fieldMaps";
import { AccessHandlerFn } from "../BaseHandler";

/**
 * Specialized node type for main_hand access
 */
interface MainHandExpressionNode extends ExpressionNode {
  field: string;
  nodeType: "main_hand";
}

/**
 * Handler for main_hand access contexts
 */
const handleMainHand: AccessHandlerFn<MainHandExpressionNode> = ({ parts }) => {
  const rawField = parts.length > 1 ? parts[1] : null;
  const defaultField = getDefaultField("main_hand");
  const field = rawField || defaultField || "";

  const fieldDef = getFieldDef(field);

  return {
    expressionType: fieldDef.type,
    field,
    kind: "expression",
    nodeType: "main_hand",
  };
};

export { handleMainHand, type MainHandExpressionNode };
