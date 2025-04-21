import { ExpressionContext } from "../../../../../antlr4/SimCExprParser";
import { ExpressionNode } from "../../../common-types";
import { SimCVisitorError } from "../../../errors/SimCVisitorError";
import { SimCGenericVisitor } from "../../../SimCGenericVisitor";
import { getFieldDef } from "../../../utils/fieldMaps";
import { AccessHandlerFn } from "../../BaseHandler";

/**
 * Specialized node type for monk access
 */
interface MonkExpressionNode extends ExpressionNode {
  field: string;
  nodeType: "monk";
}

/**
 * Handler for monk access contexts
 * This handles access to monk-specific properties
 */
const handleMonk: AccessHandlerFn<MonkExpressionNode> = ({ ctx, parts }) => {
  if (parts.length < 2) {
    throw new SimCVisitorError("Monk access requires a field", ctx);
  }

  const field = parts[1] || "";
  const fieldDef = getFieldDef(field);

  return {
    expressionType: fieldDef.type,
    field,
    kind: "expression",
    nodeType: "monk",
  };
};

/**
 * Specialized node type for stagger access
 */
interface StaggerExpressionNode extends ExpressionNode {
  field: string;
  nodeType: "stagger";
}

/**
 * Handler for stagger access contexts
 * This handles access to stagger-specific properties for Monk Brewmaster
 */
const handleStagger: AccessHandlerFn<StaggerExpressionNode> = ({
  ctx,
  parts,
}) => {
  if (parts.length < 2) {
    throw new SimCVisitorError("Stagger access requires a field", ctx);
  }

  const field = parts[1] || "";
  const fieldDef = getFieldDef(field);

  return {
    expressionType: fieldDef.type,
    field,
    kind: "expression",
    nodeType: "stagger",
  };
};

export {
  handleMonk,
  handleStagger,
  type MonkExpressionNode,
  type StaggerExpressionNode,
};
