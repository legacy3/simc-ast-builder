import { ExpressionNode } from "../../common-types";
import { SimCVisitorError } from "../../errors/SimCVisitorError";
import {
  FieldDefinition,
  getDefaultField,
  getFieldDef,
} from "../../utils/fieldMaps";
import { AccessHandlerFn } from "../BaseHandler";

/**
 * Specialized node type for buff access
 */
interface BuffExpressionNode extends ExpressionNode {
  buffName: string;
  field: FieldDefinition;
  nodeType: "buff";
}

/**
 * Handler for buff access contexts
 */
const handleBuff: AccessHandlerFn<BuffExpressionNode> = ({ ctx, parts }) => {
  if (parts.length < 2) {
    throw new SimCVisitorError("Buff access requires a name", ctx);
  }

  const name = parts[1]!; // Non-null assertion since we check parts.length above
  const rawField = parts.length > 2 ? parts[2] : null;
  const defaultField = getDefaultField("buff");
  const field = rawField || defaultField || "";

  const fieldDef = getFieldDef(field);

  return {
    buffName: name,
    expressionType: fieldDef.type,
    field: fieldDef,
    kind: "expression",
    nodeType: "buff",
  };
};

export { handleBuff, type BuffExpressionNode };
