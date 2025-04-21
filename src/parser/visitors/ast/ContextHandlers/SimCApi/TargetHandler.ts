import { ExpressionNode } from "../../common-types";
import { getDefaultField, getFieldDef } from "../../utils/fieldMaps";
import { AccessHandlerFn } from "../BaseHandler";

/**
 * Specialized node type for target access
 */
interface TargetExpressionNode extends ExpressionNode {
  field: string;
  nodeType: "target";
}

/**
 * Handler for target access contexts
 */
const handleTarget: AccessHandlerFn<TargetExpressionNode> = ({ parts }) => {
  const rawField = parts.length > 1 ? parts[1] : null;
  const defaultField = getDefaultField("target");
  const field = rawField || defaultField || "";

  const fieldDef = getFieldDef(field);

  return {
    expressionType: fieldDef.type,
    field,
    kind: "expression",
    nodeType: "target",
  };
};

export { handleTarget, type TargetExpressionNode };
