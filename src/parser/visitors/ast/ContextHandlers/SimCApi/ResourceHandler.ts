import { ExpressionNode } from "../../common-types";
import { SimCVisitorError } from "../../errors/SimCVisitorError";
import { getDefaultField, getFieldDef } from "../../utils/fieldMaps";
import { AccessHandlerFn } from "../BaseHandler";

/**
 * Specialized node type for resource access
 */
interface ResourceExpressionNode extends ExpressionNode {
  field: string;
  nodeType: "resource";
  resourceName: string;
}

/**
 * Handler for resource access contexts
 */
const handleResource: AccessHandlerFn<ResourceExpressionNode> = ({
  ctx,
  parts,
}) => {
  if (parts.length < 1) {
    throw new SimCVisitorError("Resource access requires a type", ctx);
  }

  const resourceType = parts[0]!; // Non-null assertion since we check parts.length above
  const rawField = parts.length > 1 ? parts[1] : null;
  const defaultField = getDefaultField("resource");
  const field = rawField || defaultField || "";

  const fieldDef = getFieldDef(field);

  return {
    expressionType: fieldDef.type,
    field,
    kind: "expression",
    nodeType: "resource",
    resourceName: resourceType,
  };
};

export { handleResource, type ResourceExpressionNode };
