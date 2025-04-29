import { ExpressionNode } from "../../common-types";
import {
  FieldDefinition,
  getDefaultField,
  getFieldDef,
} from "../../utils/fieldMaps";
import { AccessHandlerFn } from "../BaseHandler";

/**
 * Specialized node type for eclipse access
 */
interface EclipseExpressionNode extends ExpressionNode {
  field: FieldDefinition;
  nodeType: "eclipse";
}

/**
 * Handler for eclipse access contexts
 */
const handleEclipse: AccessHandlerFn<EclipseExpressionNode> = ({ parts }) => {
  const rawField = parts.length > 1 ? parts[1] : null;
  const defaultField = getDefaultField("eclipse");
  const field = rawField || defaultField || "";

  const fieldDef = getFieldDef(field);

  return {
    expressionType: fieldDef.type,
    field: fieldDef,
    kind: "expression",
    nodeType: "eclipse",
  };
};

export { handleEclipse, type EclipseExpressionNode };
