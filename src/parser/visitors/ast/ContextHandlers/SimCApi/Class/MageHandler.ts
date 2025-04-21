import { ExpressionNode } from "../../../common-types";
import { SimCVisitorError } from "../../../errors/SimCVisitorError";
import { getDefaultField, getFieldDef } from "../../../utils/fieldMaps";
import { AccessHandlerFn } from "../../BaseHandler";

/**
 * Specialized node type for firestarter access
 */
interface FirestarterExpressionNode extends ExpressionNode {
  field: string;
  nodeType: "firestarter";
}

/**
 * Specialized node type for improved_scorch access
 */
interface ImprovedScorchExpressionNode extends ExpressionNode {
  field: string;
  nodeType: "improved_scorch";
}

/**
 * Specialized node type for mage access
 */
interface MageExpressionNode extends ExpressionNode {
  field: string;
  nodeType: "mage";
}

/**
 * Specialized node type for scorch_execute access
 */
interface ScorchExecuteExpressionNode extends ExpressionNode {
  field: string;
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
    field,
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
    field,
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
    field,
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
    field,
    kind: "expression",
    nodeType: "firestarter",
  };
};

export {
  handleFirestarter,
  handleImprovedScorch,
  handleMage,
  handleScorchExecute,
  type FirestarterExpressionNode,
  type ImprovedScorchExpressionNode,
  type MageExpressionNode,
  type ScorchExecuteExpressionNode,
};
