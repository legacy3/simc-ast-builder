import { ExpressionNode } from "../../common-types";
import { SimCVisitorError } from "../../errors/SimCVisitorError";
import { getFieldDef } from "../../utils/fieldMaps";
import { AccessHandlerFn } from "../BaseHandler";

/**
 * Specialized node type for variable access
 */
interface VariableExpressionNode extends ExpressionNode {
  nodeType: "variable";
  variableName: string;
}

/**
 * Handler for variable access contexts
 */
const handleVariable: AccessHandlerFn<VariableExpressionNode> = ({
  ctx,
  parts,
}) => {
  if (parts.length < 2) {
    throw new SimCVisitorError("Variable access requires a name", ctx);
  }

  const name = parts[1]!; // Non-null assertion since we check parts.length above

  // Variables don't have fields like other access types
  // They just return their value directly
  const fieldDef = getFieldDef("value");

  return {
    expressionType: fieldDef.type,
    field: "",
    kind: "expression",
    nodeType: "variable",
    variableName: name,
  };
};

export { handleVariable, type VariableExpressionNode };
