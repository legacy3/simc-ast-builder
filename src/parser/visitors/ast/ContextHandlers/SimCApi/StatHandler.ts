import { ExpressionNode } from "../../common-types";
import { SimCVisitorError } from "../../errors/SimCVisitorError";
import { getFieldDef } from "../../utils/fieldMaps";
import { AccessHandlerFn } from "../BaseHandler";

/**
 * Specialized node type for stat access
 */
interface StatExpressionNode extends ExpressionNode {
  field: string;
  nodeType: "stat";
}

/**
 * Handler for stat access contexts
 */
const handleStat: AccessHandlerFn<StatExpressionNode> = ({ ctx, parts }) => {
  if (parts.length < 2) {
    throw new SimCVisitorError("Stat access requires a field", ctx);
  }

  const field = parts[1] || "";
  const fieldDef = getFieldDef(field);

  return {
    expressionType: fieldDef.type,
    field,
    kind: "expression",
    nodeType: "stat",
  };
};

export { handleStat, type StatExpressionNode };
