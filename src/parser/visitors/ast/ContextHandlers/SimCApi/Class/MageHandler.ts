import { ExpressionNode } from "../../../common-types";
import { SimCVisitorError } from "../../../errors/SimCVisitorError";
import {
  FieldDefinition,
  getDefaultField,
  getFieldDef,
} from "../../../utils/fieldMaps";
import { AccessHandlerFn } from "../../BaseHandler";

/**
 * Specialized node type for firestarter access
 */
interface FirestarterExpressionNode extends ExpressionNode {
  field: FieldDefinition;
  nodeType: "firestarter";
}

/**
 * Specialized node type for improved_scorch access
 */
interface ImprovedScorchExpressionNode extends ExpressionNode {
  field: FieldDefinition;
  nodeType: "improved_scorch";
}

/**
 * Specialized node type for mage access
 */
interface MageExpressionNode extends ExpressionNode {
  field: FieldDefinition;
  nodeType: "mage";
}

/**
 * Specialized node type for scorch_execute access
 */
interface ScorchExecuteExpressionNode extends ExpressionNode {
  field: FieldDefinition;
  nodeType: "scorch_execute";
}

/**
 * Handler for mage access contexts
 * This handles access to mage-specific properties
 */
const handleMage: AccessHandlerFn<MageExpressionNode> = ({ ctx, parts }) => {
  if (parts.length < 2) {
    throw new SimCVisitorError("Mage access requires a field", ctx);
  }

  const field = parts[1] || "";
  const fieldDef = getFieldDef(field);

  return {
    expressionType: fieldDef.type,
    field: fieldDef,
    kind: "expression",
    nodeType: "mage",
  };
};

/**
 * Handler for scorch_execute access contexts
 * This handles access to scorch_execute-specific properties for Mage
 */
const handleScorchExecute: AccessHandlerFn<ScorchExecuteExpressionNode> = ({
  ctx,
  parts,
}) => {
  if (parts.length < 2) {
    throw new SimCVisitorError("Scorch execute access requires a field", ctx);
  }

  const field = parts[1] || "";
  const fieldDef = getFieldDef(field);

  return {
    expressionType: fieldDef.type,
    field: fieldDef,
    kind: "expression",
    nodeType: "scorch_execute",
  };
};

/**
 * Handler for improved_scorch access contexts
 * This handles access to improved_scorch-specific properties for Mage
 */
const handleImprovedScorch: AccessHandlerFn<ImprovedScorchExpressionNode> = ({
  ctx,
  parts,
}) => {
  if (parts.length < 2) {
    throw new SimCVisitorError("Improved scorch access requires a field", ctx);
  }

  const field = parts[1] || "";
  const fieldDef = getFieldDef(field);

  return {
    expressionType: fieldDef.type,
    field: fieldDef,
    kind: "expression",
    nodeType: "improved_scorch",
  };
};

/**
 * Handler for firestarter access contexts
 * This handles access to firestarter-specific properties for Mage
 */
const handleFirestarter: AccessHandlerFn<FirestarterExpressionNode> = ({
  ctx,
  parts,
}) => {
  if (parts.length < 2) {
    throw new SimCVisitorError("Firestarter access requires a field", ctx);
  }

  const field = parts[1] || "";
  const fieldDef = getFieldDef(field);

  return {
    expressionType: fieldDef.type,
    field: fieldDef,
    kind: "expression",
    nodeType: "firestarter",
  };
};

/**
 * Specialized node type for remaining_winters_chill access
 */
interface RemainingWintersChillExpressionNode extends ExpressionNode {
  nodeType: "remaining_winters_chill";
}

/**
 * Handler for remaining_winters_chill access contexts
 * This handles access to the remaining_winters_chill property for Mage
 */
const handleRemainingWintersChill: AccessHandlerFn<
  RemainingWintersChillExpressionNode
> = ({ parts }) => {
  return {
    expressionType: "numeric",
    kind: "expression",
    nodeType: "remaining_winters_chill",
  };
};

export {
  handleFirestarter,
  handleImprovedScorch,
  handleMage,
  handleRemainingWintersChill,
  handleScorchExecute,
  type FirestarterExpressionNode,
  type ImprovedScorchExpressionNode,
  type MageExpressionNode,
  type RemainingWintersChillExpressionNode,
  type ScorchExecuteExpressionNode,
};
