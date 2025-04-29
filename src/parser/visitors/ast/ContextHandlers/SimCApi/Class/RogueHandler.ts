import { ExpressionContext } from "../../../../../antlr4/SimCExprParser";
import { ExpressionNode } from "../../../common-types";
import { SimCVisitorError } from "../../../errors/SimCVisitorError";
import { SimCGenericVisitor } from "../../../SimCGenericVisitor";
import { FieldDefinition, getFieldDef } from "../../../utils/fieldMaps";
import { AccessHandlerFn } from "../../BaseHandler";

/**
 * Specialized node type for rogue access
 */
interface RogueExpressionNode extends ExpressionNode {
  field: FieldDefinition;
  nodeType: "rogue";
}

/**
 * Handler for rogue access contexts
 * This handles access to rogue-specific properties
 */
const handleRogue: AccessHandlerFn<RogueExpressionNode> = ({ ctx, parts }) => {
  if (parts.length < 2) {
    throw new SimCVisitorError("Rogue access requires a field", ctx);
  }

  const field = parts[1] || "";
  const fieldDef = getFieldDef(field);

  return {
    expressionType: fieldDef.type,
    field: fieldDef,
    kind: "expression",
    nodeType: "rogue",
  };
};

/**
 * Specialized node type for rtb_buffs (Roll the Bones) access
 */
interface RtbBuffsExpressionNode extends ExpressionNode {
  field: FieldDefinition;
  nodeType: "rtb_buffs";
}

/**
 * Handler for rtb_buffs access contexts
 * This handles access to Roll the Bones buffs for Outlaw Rogue
 */
const handleRtbBuffs: AccessHandlerFn<RtbBuffsExpressionNode> = ({
  ctx,
  parts,
}) => {
  if (parts.length < 2) {
    throw new SimCVisitorError("RtbBuffs access requires a field", ctx);
  }

  const field = parts[1] || "";
  const fieldDef = getFieldDef(field);

  return {
    expressionType: fieldDef.type,
    field: fieldDef,
    kind: "expression",
    nodeType: "rtb_buffs",
  };
};

/**
 * Specialized node type for stealthed access
 */
interface StealthedExpressionNode extends ExpressionNode {
  field: FieldDefinition;
  nodeType: "stealthed";
}

/**
 * Handler for stealthed access contexts
 * This handles access to stealth-specific properties for Rogue
 */
const handleStealthed: AccessHandlerFn<StealthedExpressionNode> = ({
  ctx,
  parts,
}) => {
  if (parts.length < 2) {
    throw new SimCVisitorError("Stealthed access requires a field", ctx);
  }

  const field = parts[1] || "";
  const fieldDef = getFieldDef(field);

  return {
    expressionType: fieldDef.type,
    field: fieldDef,
    kind: "expression",
    nodeType: "stealthed",
  };
};

export {
  handleRogue,
  handleRtbBuffs,
  handleStealthed,
  type RogueExpressionNode,
  type RtbBuffsExpressionNode,
  type StealthedExpressionNode,
};
