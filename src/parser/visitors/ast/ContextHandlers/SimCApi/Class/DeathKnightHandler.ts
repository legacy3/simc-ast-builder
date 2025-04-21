import { ExpressionNode } from "../../../common-types";
import { SimCVisitorError } from "../../../errors/SimCVisitorError";
import { getDefaultField, getFieldDef } from "../../../utils/fieldMaps";
import { AccessHandlerFn } from "../../BaseHandler";

/**
 * Specialized node type for death_and_decay access
 */
interface DeathAndDecayExpressionNode extends ExpressionNode {
  field: string;
  nodeType: "death_and_decay";
}

/**
 * Specialized node type for death_knight access
 */
interface DeathKnightExpressionNode extends ExpressionNode {
  field: string;
  nodeType: "death_knight";
}

/**
 * Handler for death_and_decay access contexts
 */
const handleDeathAndDecay: AccessHandlerFn<DeathAndDecayExpressionNode> = ({
  ctx,
  parts,
}) => {
  const rawField = parts.length > 1 ? parts[1] : null;
  const defaultField = getDefaultField("death_and_decay");
  const field = rawField || defaultField || "";

  const fieldDef = getFieldDef(field);

  return {
    expressionType: fieldDef.type,
    field,
    kind: "expression",
    nodeType: "death_and_decay",
  };
};

/**
 * Handler for death_knight access contexts
 * This is the main class handler that can be extended to handle
 * class-specific expressions
 */
const handleDeathKnight: AccessHandlerFn<DeathKnightExpressionNode> = ({
  ctx,
  parts,
}) => {
  if (parts.length < 2) {
    throw new SimCVisitorError("Death Knight access requires a field", ctx);
  }

  // For now, just return a generic expression
  // This can be expanded to handle specific Death Knight fields
  const fieldDef = getFieldDef("value");

  return {
    expressionType: fieldDef.type,
    field: parts[1] || "",
    kind: "expression",
    nodeType: "death_knight",
  };
};

export {
  handleDeathAndDecay,
  handleDeathKnight,
  type DeathAndDecayExpressionNode,
  type DeathKnightExpressionNode,
};
