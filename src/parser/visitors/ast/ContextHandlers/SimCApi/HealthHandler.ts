import { ExpressionNode } from "../../common-types";
import {
  FieldDefinition,
  getDefaultField,
  getFieldDef,
} from "../../utils/fieldMaps";
import { AccessHandlerFn } from "../BaseHandler";

/**
 * Specialized node type for health access
 */
interface HealthExpressionNode extends ExpressionNode {
  field: FieldDefinition;
  nodeType: "health";
}

/**
 * Handler for health access contexts
 */
const handleHealth: AccessHandlerFn<HealthExpressionNode> = ({ parts }) => {
  const rawField = parts.length > 1 ? parts[1] : null;
  const defaultField = getDefaultField("health");
  const field = rawField || defaultField || "";

  const fieldDef = getFieldDef(field);

  return {
    expressionType: fieldDef.type,
    field: fieldDef,
    kind: "expression",
    nodeType: "health",
  };
};

export { handleHealth, type HealthExpressionNode };
