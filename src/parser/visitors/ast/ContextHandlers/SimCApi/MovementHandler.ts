import { ExpressionNode } from "../../common-types";
import { SimCVisitorError } from "../../errors/SimCVisitorError";
import { getFieldDef } from "../../utils/fieldMaps";
import { AccessHandlerFn } from "../BaseHandler";

/**
 * Specialized node type for movement access
 */
interface MovementExpressionNode extends ExpressionNode {
  field: string;
  nodeType: "movement";
}

/**
 * Handler for movement access contexts
 * This handles access to movement-specific properties
 */
const handleMovement: AccessHandlerFn<MovementExpressionNode> = ({
  ctx,
  parts,
}) => {
  if (parts.length < 2) {
    throw new SimCVisitorError("Movement access requires a field", ctx);
  }

  const field = parts[1] || "";
  const fieldDef = getFieldDef(field);

  return {
    expressionType: fieldDef.type,
    field,
    kind: "expression",
    nodeType: "movement",
  };
};

export { handleMovement, type MovementExpressionNode };
