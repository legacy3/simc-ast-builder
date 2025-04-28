import { ExpressionNode } from "../../common-types";
import { SimCVisitorError } from "../../errors/SimCVisitorError";
import { FieldDefinition, getFieldDef } from "../../utils/fieldMaps";
import { AccessHandlerFn } from "../BaseHandler";

/**
 * Specialized node type for hyperthread_wristwraps access
 */
interface HyperthreadWristwrapsExpressionNode extends ExpressionNode {
  field: FieldDefinition;
  nodeType: "hyperthread_wristwraps";
}

/**
 * Handler for hyperthread_wristwraps access contexts
 * This handles access to hyperthread_wristwraps-specific properties
 *
 * Special case for hyperthread_wristwraps which can be accessed as:
 * - hyperthread_wristwraps.spellName (e.g., hyperthread_wristwraps.fire_blast)
 * - hyperthread_wristwraps.spellName.charges
 * - hyperthread_wristwraps.count
 */
const handleHyperthreadWristwraps: AccessHandlerFn<
  HyperthreadWristwrapsExpressionNode
> = ({ ctx, parts }) => {
  if (parts.length < 2) {
    throw new SimCVisitorError(
      "Hyperthread wristwraps access requires a field",
      ctx,
    );
  }

  // Handle special case for hyperthread_wristwraps.spellName.charges
  let field = parts[1] || "";
  if (parts.length > 2) {
    field = `${field}.${parts[2]}`;
  }

  const fieldDef = getFieldDef(field);

  return {
    expressionType: fieldDef.type,
    field: fieldDef,
    kind: "expression",
    nodeType: "hyperthread_wristwraps",
  };
};

export {
  handleHyperthreadWristwraps,
  type HyperthreadWristwrapsExpressionNode,
};
