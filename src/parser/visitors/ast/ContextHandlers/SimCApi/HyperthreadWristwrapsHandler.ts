import { ExpressionNode } from "../../common-types";
import { SimCVisitorError } from "../../errors/SimCVisitorError";
import { FieldDefinition, getDefaultField, getFieldDef } from "../../utils/fieldMaps";
import { ExpressionType } from "../../utils/fieldUtils";
import { AccessHandlerFn } from "../BaseHandler";

/**
 * Specialized node type for hyperthread_wristwraps access
 */
interface HyperthreadWristwrapsExpressionNode extends ExpressionNode {
  actionName: string;
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

  // Determine field and actionName based on parts
  let actionName: string = parts[1]!;
  let fieldDef: FieldDefinition;
  let expressionType: ExpressionType;

  if (parts.length === 3) {
    fieldDef = getFieldDef(parts[2]!);
    expressionType = fieldDef.type;
  } else if (parts.length === 2) {
    const defaultField = getDefaultField("hyperthread_wristwraps");
    fieldDef = getFieldDef(defaultField);
    expressionType = fieldDef.type;
  } else {
    // This should never happen due to the earlier throw, but for type safety:
    throw new SimCVisitorError(
      "Invalid number of parts for hyperthread_wristwraps access",
      ctx,
    );
  }

  return {
    actionName,
    expressionType,
    field: fieldDef,
    kind: "expression",
    nodeType: "hyperthread_wristwraps",
  };
};

export {
  handleHyperthreadWristwraps,
  type HyperthreadWristwrapsExpressionNode,
};
