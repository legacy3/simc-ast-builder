import { ExpressionContext } from "../../../../../antlr4/SimCExprParser";
import { ExpressionNode } from "../../../common-types";
import { SimCVisitorError } from "../../../errors/SimCVisitorError";
import { SimCGenericVisitor } from "../../../SimCGenericVisitor";
import { getFieldDef } from "../../../utils/fieldMaps";
import { AccessHandlerFn } from "../../BaseHandler";

/**
 * Specialized node type for paladin access
 */
interface PaladinExpressionNode extends ExpressionNode {
  field: string;
  nodeType: "paladin";
}

/**
 * Handler for paladin access contexts
 * This handles access to paladin-specific properties
 */
const handlePaladin: AccessHandlerFn<PaladinExpressionNode> = ({
  ctx,
  parts,
}) => {
  if (parts.length < 2) {
    throw new SimCVisitorError("Paladin access requires a field", ctx);
  }

  const field = parts[1] || "";
  const fieldDef = getFieldDef(field);

  return {
    expressionType: fieldDef.type,
    field,
    kind: "expression",
    nodeType: "paladin",
  };
};

/**
 * Specialized node type for consecration access
 */
interface ConsecrationExpressionNode extends ExpressionNode {
  field: string;
  nodeType: "consecration";
}

/**
 * Handler for consecration access contexts
 * This handles access to consecration-specific properties for Paladin
 */
const handleConsecration: AccessHandlerFn<ConsecrationExpressionNode> = ({
  ctx,
  parts,
}) => {
  if (parts.length < 2) {
    throw new SimCVisitorError("Consecration access requires a field", ctx);
  }

  const field = parts[1] || "";
  const fieldDef = getFieldDef(field);

  return {
    expressionType: fieldDef.type,
    field,
    kind: "expression",
    nodeType: "consecration",
  };
};

export {
  handleConsecration,
  handlePaladin,
  type ConsecrationExpressionNode,
  type PaladinExpressionNode,
};
