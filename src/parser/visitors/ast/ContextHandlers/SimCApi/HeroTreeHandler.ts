import { ExpressionNode } from "../../common-types";
import { SimCVisitorError } from "../../errors/SimCVisitorError";
import { getFieldDef } from "../../utils/fieldMaps";
import { AccessHandlerFn } from "../BaseHandler";

/**
 * Specialized node type for hero_tree access
 */
interface HeroTreeExpressionNode extends ExpressionNode {
  nodeName: string;
  nodeType: "hero_tree";
}

/**
 * Handler for hero_tree access contexts
 */
const handleHeroTree: AccessHandlerFn<HeroTreeExpressionNode> = ({
  ctx,
  parts,
}) => {
  if (parts.length < 2) {
    throw new SimCVisitorError("Hero tree access requires a node name", ctx);
  }

  const nodeName = parts[1]!; // Non-null assertion since we check parts.length above

  // hero_tree always returns a boolean value (whether the node is active or not)
  const fieldDef = getFieldDef("value");

  return {
    expressionType: "boolean", // Always boolean
    field: "",
    kind: "expression",
    nodeName,
    nodeType: "hero_tree",
  };
};

export { handleHeroTree, type HeroTreeExpressionNode };
