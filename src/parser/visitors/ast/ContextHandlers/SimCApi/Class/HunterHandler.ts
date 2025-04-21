import { ExpressionNode } from "../../../common-types";
import { SimCVisitorError } from "../../../errors/SimCVisitorError";
import { getDefaultField, getFieldDef } from "../../../utils/fieldMaps";
import { AccessHandlerFn } from "../../BaseHandler";

/**
 * Specialized node type for boar_charge access
 */
interface BoarChargeExpressionNode extends ExpressionNode {
  field: string;
  nodeType: "boar_charge";
}

/**
 * Specialized node type for howl_summon access
 */
interface HowlSummonExpressionNode extends ExpressionNode {
  field: string;
  nodeType: "howl_summon";
}

/**
 * Specialized node type for hunter access
 */
interface HunterExpressionNode extends ExpressionNode {
  field: string;
  nodeType: "hunter";
}

/**
 * Handler for hunter access contexts
 * This handles access to hunter-specific properties
 */
const handleHunter: AccessHandlerFn<HunterExpressionNode> = ({
  ctx,
  parts,
}) => {
  if (parts.length < 2) {
    throw new SimCVisitorError("Hunter access requires a field", ctx);
  }

  const field = parts[1] || "";
  const fieldDef = getFieldDef(field);

  return {
    expressionType: fieldDef.type,
    field,
    kind: "expression",
    nodeType: "hunter",
  };
};

/**
 * Handler for howl_summon access contexts
 * This handles access to howl_summon-specific properties for Hunter
 */
const handleHowlSummon: AccessHandlerFn<HowlSummonExpressionNode> = ({
  ctx,
  parts,
}) => {
  if (parts.length < 2) {
    throw new SimCVisitorError("Howl summon access requires a field", ctx);
  }

  const field = parts[1] || "";
  const fieldDef = getFieldDef(field);

  return {
    expressionType: fieldDef.type,
    field,
    kind: "expression",
    nodeType: "howl_summon",
  };
};

/**
 * Handler for boar_charge access contexts
 * This handles access to boar_charge-specific properties for Hunter
 */
const handleBoarCharge: AccessHandlerFn<BoarChargeExpressionNode> = ({
  ctx,
  parts,
}) => {
  if (parts.length < 2) {
    throw new SimCVisitorError("Boar charge access requires a field", ctx);
  }

  const field = parts[1] || "";
  const fieldDef = getFieldDef(field);

  return {
    expressionType: fieldDef.type,
    field,
    kind: "expression",
    nodeType: "boar_charge",
  };
};

export {
  handleBoarCharge,
  handleHowlSummon,
  handleHunter,
  type BoarChargeExpressionNode,
  type HowlSummonExpressionNode,
  type HunterExpressionNode,
};
