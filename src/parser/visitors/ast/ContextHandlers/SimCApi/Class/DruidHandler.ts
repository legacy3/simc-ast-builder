import { ExpressionNode } from "../../../common-types";
import { SimCVisitorError } from "../../../errors/SimCVisitorError";
import {
  FieldDefinition,
  getDefaultField,
  getFieldDef,
} from "../../../utils/fieldMaps";
import { AccessHandlerFn } from "../../BaseHandler";

/**
 * Specialized node type for druid access
 */
interface DruidExpressionNode extends ExpressionNode {
  field: FieldDefinition;
  nodeType: "druid";
}

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
const handleEclipse: AccessHandlerFn<EclipseExpressionNode> = ({
  ctx,
  parts,
}) => {
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

/**
 * Handler for druid access contexts
 * This is the main class handler that can be extended to handle
 * class-specific expressions
 */
const handleDruid: AccessHandlerFn<DruidExpressionNode> = ({ ctx, parts }) => {
  if (parts.length < 2) {
    throw new SimCVisitorError("Druid access requires a field", ctx);
  }

  const rawField = parts.length > 1 ? parts[1] : null;
  const defaultField = getDefaultField("druid");
  const field = rawField || defaultField || "";

  const fieldDef = getFieldDef(field);

  return {
    expressionType: fieldDef.type,
    field: fieldDef,
    kind: "expression",
    nodeType: "druid",
  };
};

export {
  handleDruid,
  handleEclipse,
  type DruidExpressionNode,
  type EclipseExpressionNode,
};
