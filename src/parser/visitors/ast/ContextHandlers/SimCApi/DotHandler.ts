import { ExpressionNode } from "../../common-types";
import { SimCVisitorError } from "../../errors/SimCVisitorError";
import {
  FieldDefinition,
  getDefaultField,
  getFieldDef,
} from "../../utils/fieldMaps";
import { AccessHandlerFn } from "../BaseHandler";

/**
 * Specialized node type for dot access
 */
interface DotExpressionNode extends ExpressionNode {
  dotName: string;
  field: FieldDefinition;
  nodeType: "dot";
}

/**
 * Handler for dot access contexts
 */
const handleDot: AccessHandlerFn<DotExpressionNode> = ({ ctx, parts }) => {
  if (parts.length < 2) {
    throw new SimCVisitorError("Dot access requires a name", ctx);
  }

  const name = parts[1]!; // Non-null assertion since we check parts.length above
  const rawField = parts.length > 2 ? parts[2] : null;
  const defaultField = getDefaultField("dot");
  const field = rawField || defaultField || "";

  const fieldDef = getFieldDef(field);

  return {
    dotName: name,
    expressionType: fieldDef.type,
    field: fieldDef,
    kind: "expression",
    nodeType: "dot",
  };
};

export { handleDot, type DotExpressionNode };
