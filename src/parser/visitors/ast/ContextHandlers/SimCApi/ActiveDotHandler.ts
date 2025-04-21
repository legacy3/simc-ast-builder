import { ExpressionNode } from "../../common-types";
import { SimCVisitorError } from "../../errors/SimCVisitorError";
import { getFieldDef } from "../../utils/fieldMaps";
import { AccessHandlerFn } from "../BaseHandler";

/**
 * Specialized node type for active_dot access
 */
interface ActiveDotExpressionNode extends ExpressionNode {
  dotName: string;
  nodeType: "active_dot";
}

/**
 * Handler for active_dot access contexts
 */
const handleActiveDot: AccessHandlerFn<ActiveDotExpressionNode> = ({
  ctx,
  parts,
}) => {
  if (parts.length < 2) {
    throw new SimCVisitorError("Active dot access requires a dot name", ctx);
  }

  const dotName = parts[1]!; // Non-null assertion since we check parts.length above

  // active_dot always returns a numeric value (count of active dots)
  const fieldDef = getFieldDef("value");

  return {
    dotName,
    expressionType: "numeric", // Always numeric
    field: "",
    kind: "expression",
    nodeType: "active_dot",
  };
};

export { handleActiveDot, type ActiveDotExpressionNode };
