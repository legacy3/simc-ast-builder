import { ExpressionNode } from "../../common-types";
import { SimCVisitorError } from "../../errors/SimCVisitorError";
import {
  FieldDefinition,
  getDefaultField,
  getFieldDef,
} from "../../utils/fieldMaps";
import { AccessHandlerFn } from "../BaseHandler";

/**
 * Specialized node type for pet access
 */
interface PetExpressionNode extends ExpressionNode {
  field: FieldDefinition;
  nodeType: "pet";
  petName: string;
}

/**
 * Handler for pet access contexts
 */
const handlePet: AccessHandlerFn<PetExpressionNode> = ({ ctx, parts }) => {
  if (parts.length < 2) {
    throw new SimCVisitorError("Pet access requires a name", ctx);
  }

  const name = parts[1]!; // Non-null assertion since we check parts.length above
  const rawField = parts.length > 2 ? parts[2] : null;
  const defaultField = getDefaultField("pet");
  const field = rawField || defaultField || "";

  const fieldDef = getFieldDef(field);

  return {
    expressionType: fieldDef.type,
    field: fieldDef,
    kind: "expression",
    nodeType: "pet",
    petName: name,
  };
};

export { handlePet, type PetExpressionNode };
