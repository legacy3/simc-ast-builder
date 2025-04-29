import { ExpressionNode } from "../../common-types";
import { SimCVisitorError } from "../../errors/SimCVisitorError";
import {
  FieldDefinition,
  getDefaultField,
  getFieldDef,
} from "../../utils/fieldMaps";
import { AccessHandlerFn } from "../BaseHandler";

/**
 * Specialized node type for debuff access
 */
interface DebuffExpressionNode extends ExpressionNode {
  debuffName: string;
  field: FieldDefinition;
  nodeType: "debuff";
}

/**
 * Handler for debuff access contexts
 */
const handleDebuff: AccessHandlerFn<DebuffExpressionNode> = ({
  ctx,
  parts,
}) => {
  if (parts.length < 2) {
    throw new SimCVisitorError("Debuff access requires a name", ctx);
  }

  const name = parts[1]!; // Non-null assertion since we check parts.length above
  const rawField = parts.length > 2 ? parts[2] : null;
  const defaultField = getDefaultField("debuff");
  const field = rawField || defaultField || "";

  const fieldDef = getFieldDef(field);

  return {
    debuffName: name,
    expressionType: fieldDef.type,
    field: fieldDef,
    kind: "expression",
    nodeType: "debuff",
  };
};

export { handleDebuff, type DebuffExpressionNode };
