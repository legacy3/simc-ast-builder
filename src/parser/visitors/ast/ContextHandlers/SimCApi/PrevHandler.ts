import { ExpressionNode } from "../../common-types";
import { SimCVisitorError } from "../../errors/SimCVisitorError";
import { getFieldDef } from "../../utils/fieldMaps";
import { AccessHandlerFn } from "../BaseHandler";

/**
 * Specialized node type for prev access
 */
interface PrevExpressionNode extends ExpressionNode {
  field: string;
  nodeType: "prev";
}

/**
 * Handler for prev access contexts
 * This handles access to the previous cast of a spell
 */
const handlePrev: AccessHandlerFn<PrevExpressionNode> = ({ ctx, parts }) => {
  if (parts.length < 2) {
    throw new SimCVisitorError("Prev access requires a field", ctx);
  }

  const field = parts[1] || "";
  const fieldDef = getFieldDef(field);

  return {
    expressionType: fieldDef.type,
    field,
    kind: "expression",
    nodeType: "prev",
  };
};

export { handlePrev, type PrevExpressionNode };
