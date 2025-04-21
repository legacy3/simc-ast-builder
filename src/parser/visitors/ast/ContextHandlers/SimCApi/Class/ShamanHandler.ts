import { ExpressionContext } from "../../../../../antlr4/SimCExprParser";
import { ExpressionNode } from "../../../common-types";
import { SimCVisitorError } from "../../../errors/SimCVisitorError";
import { SimCGenericVisitor } from "../../../SimCGenericVisitor";
import { getFieldDef } from "../../../utils/fieldMaps";
import { AccessHandlerFn } from "../../BaseHandler";

/**
 * Specialized node type for shaman access
 */
interface ShamanExpressionNode extends ExpressionNode {
  field: string;
  nodeType: "shaman";
}

/**
 * Handler for shaman access contexts
 * This handles access to shaman-specific properties
 */
const handleShaman: AccessHandlerFn<ShamanExpressionNode> = ({
  ctx,
  parts,
}) => {
  if (parts.length < 2) {
    throw new SimCVisitorError("Shaman access requires a field", ctx);
  }

  const field = parts[1] || "";
  const fieldDef = getFieldDef(field);

  return {
    expressionType: fieldDef.type,
    field,
    kind: "expression",
    nodeType: "shaman",
  };
};

/**
 * Specialized node type for totem access
 */
interface TotemExpressionNode extends ExpressionNode {
  field: string;
  nodeType: "totem";
  totemName: string;
}

/**
 * Handler for totem access contexts
 * This handles access to totem properties for Shaman
 */
const handleTotem: AccessHandlerFn<TotemExpressionNode> = ({ ctx, parts }) => {
  if (parts.length < 2) {
    throw new SimCVisitorError("Totem access requires a totem name", ctx);
  }

  const totemName = parts[1] || "";
  const field = parts.length > 2 ? parts[2] || "" : "";
  const fieldDef = getFieldDef(field || "up");

  return {
    expressionType: fieldDef.type,
    field,
    kind: "expression",
    nodeType: "totem",
    totemName,
  };
};

/**
 * Specialized node type for feral_spirit access
 */
interface FeralSpiritExpressionNode extends ExpressionNode {
  field: string;
  nodeType: "feral_spirit";
}

/**
 * Handler for feral_spirit access contexts
 * This handles access to feral spirit properties for Enhancement Shaman
 */
const handleFeralSpirit: AccessHandlerFn<FeralSpiritExpressionNode> = ({
  ctx,
  parts,
}) => {
  if (parts.length < 2) {
    throw new SimCVisitorError("Feral Spirit access requires a field", ctx);
  }

  const field = parts[1] || "";
  const fieldDef = getFieldDef(field);

  return {
    expressionType: fieldDef.type,
    field,
    kind: "expression",
    nodeType: "feral_spirit",
  };
};

export {
  handleFeralSpirit,
  handleShaman,
  handleTotem,
  type FeralSpiritExpressionNode,
  type ShamanExpressionNode,
  type TotemExpressionNode,
};
