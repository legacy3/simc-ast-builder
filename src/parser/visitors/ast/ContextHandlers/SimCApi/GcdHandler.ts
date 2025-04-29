import { ExpressionNode } from "../../common-types";
import {
  FieldDefinition,
  getDefaultField,
  getFieldDef,
} from "../../utils/fieldMaps";
import { AccessHandlerFn } from "../BaseHandler";

/**
 * Specialized node type for GCD access
 */
interface GcdExpressionNode extends ExpressionNode {
  field: FieldDefinition;
  nodeType: "gcd";
}

/**
 * Handler for GCD access contexts
 */
const handleGcd: AccessHandlerFn<GcdExpressionNode> = ({ parts }) => {
  const rawField = parts.length > 1 ? parts[1] : null;
  const defaultField = getDefaultField("gcd");
  const field = rawField || defaultField || "";

  const fieldDef = getFieldDef(field);

  return {
    expressionType: fieldDef.type,
    field: fieldDef,
    kind: "expression",
    nodeType: "gcd",
  };
};

export { handleGcd, type GcdExpressionNode };
