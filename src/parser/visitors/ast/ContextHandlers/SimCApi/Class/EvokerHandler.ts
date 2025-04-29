import { ExpressionNode } from "../../../common-types";
import { SimCVisitorError } from "../../../errors/SimCVisitorError";
import {
  FieldDefinition,
  getDefaultField,
  getFieldDef,
} from "../../../utils/fieldMaps";
import { AccessHandlerFn } from "../../BaseHandler";

/**
 * Specialized node type for empowering access
 */
interface EmpoweringExpressionNode extends ExpressionNode {
  field: FieldDefinition;
  nodeType: "empowering";
}

/**
 * Specialized node type for evoker access
 */
interface EvokerExpressionNode extends ExpressionNode {
  field: FieldDefinition;
  nodeType: "evoker";
}

/**
 * Specialized node type for release access
 */
interface ReleaseExpressionNode extends ExpressionNode {
  field: FieldDefinition;
  nodeType: "release";
}

/**
 * Handler for evoker access contexts
 * This handles access to evoker-specific properties
 */
const handleEvoker: AccessHandlerFn<EvokerExpressionNode> = ({
  ctx,
  parts,
}) => {
  if (parts.length < 2) {
    throw new SimCVisitorError("Evoker access requires a field", ctx);
  }

  const field = parts[1] || "";
  const fieldDef = getFieldDef(field);

  return {
    expressionType: fieldDef.type,
    field: fieldDef,
    kind: "expression",
    nodeType: "evoker",
  };
};

/**
 * Handler for empowering access contexts
 * This handles access to empowering spells for Evoker
 */
const handleEmpowering: AccessHandlerFn<EmpoweringExpressionNode> = ({
  ctx,
  parts,
}) => {
  if (parts.length < 2) {
    throw new SimCVisitorError("Empowering access requires a field", ctx);
  }

  const field = parts[1] || "";
  const fieldDef = getFieldDef(field);

  return {
    expressionType: fieldDef.type,
    field: fieldDef,
    kind: "expression",
    nodeType: "empowering",
  };
};

/**
 * Handler for release access contexts
 * This handles access to release-specific properties for Evoker
 */
const handleRelease: AccessHandlerFn<ReleaseExpressionNode> = ({
  ctx,
  parts,
}) => {
  if (parts.length < 2) {
    throw new SimCVisitorError("Release access requires a field", ctx);
  }

  const field = parts[1] || "";
  const fieldDef = getFieldDef(field);

  return {
    expressionType: fieldDef.type,
    field: fieldDef,
    kind: "expression",
    nodeType: "release",
  };
};

export {
  handleEmpowering,
  handleEvoker,
  handleRelease,
  type EmpoweringExpressionNode,
  type EvokerExpressionNode,
  type ReleaseExpressionNode,
};
