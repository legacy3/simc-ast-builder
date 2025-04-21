import { ExpressionContext } from "../../../../../antlr4/SimCExprParser";
import { ExpressionNode } from "../../../common-types";
import { SimCVisitorError } from "../../../errors/SimCVisitorError";
import { SimCGenericVisitor } from "../../../SimCGenericVisitor";
import { getFieldDef } from "../../../utils/fieldMaps";
import { AccessHandlerFn } from "../../BaseHandler";

/**
 * Specialized node type for priest access
 */
interface PriestExpressionNode extends ExpressionNode {
  field: string;
  nodeType: "priest";
}

/**
 * Handler for priest access contexts
 * This handles access to priest-specific properties
 */
const handlePriest: AccessHandlerFn<PriestExpressionNode> = ({
  ctx,
  parts,
}) => {
  if (parts.length < 2) {
    throw new SimCVisitorError("Priest access requires a field", ctx);
  }

  const field = parts[1] || "";
  const fieldDef = getFieldDef(field);

  return {
    expressionType: fieldDef.type,
    field,
    kind: "expression",
    nodeType: "priest",
  };
};

export { handlePriest, type PriestExpressionNode };
