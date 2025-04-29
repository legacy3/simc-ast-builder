import { ExpressionNode } from "../../common-types";
import { SimCVisitorError } from "../../errors/SimCVisitorError";
import {
  FieldDefinition,
  getDefaultField,
  getFieldDef,
} from "../../utils/fieldMaps";
import { AccessHandlerFn } from "../BaseHandler";

/**
 * Specialized node type for talent access
 */
interface TalentExpressionNode extends ExpressionNode {
  field: FieldDefinition;
  nodeType: "talent";
  talentName: string;
}

/**
 * Handler for talent access contexts
 */
const handleTalent: AccessHandlerFn<TalentExpressionNode> = ({
  ctx,
  parts,
}) => {
  if (parts.length < 2) {
    throw new SimCVisitorError("Talent access requires a name", ctx);
  }

  const name = parts[1]!; // Non-null assertion since we check parts.length above
  const rawField = parts.length > 2 ? parts[2] : null;
  const defaultField = getDefaultField("talent");
  const field = rawField || defaultField || "";

  const fieldDef = getFieldDef(field);

  return {
    expressionType: fieldDef.type,
    field: fieldDef,
    kind: "expression",
    nodeType: "talent",
    talentName: name,
  };
};

export { handleTalent, type TalentExpressionNode };
