import { ExpressionNode } from "../../common-types";
import { SimCVisitorError } from "../../errors/SimCVisitorError";
import {
  FieldDefinition,
  getDefaultField,
  getFieldDef,
} from "../../utils/fieldMaps";
import { AccessHandlerFn } from "../BaseHandler";

/**
 * Specialized node type for raid_event access
 */
interface RaidEventExpressionNode extends ExpressionNode {
  eventName: string;
  field: FieldDefinition;
  nodeType: "raid_event";
}

/**
 * Handler for raid_event access contexts
 */
const handleRaidEvent: AccessHandlerFn<RaidEventExpressionNode> = ({
  ctx,
  parts,
}) => {
  if (parts.length < 2) {
    throw new SimCVisitorError("Raid event access requires an event name", ctx);
  }

  const eventName = parts[1]!; // Non-null assertion since we check parts.length above
  const rawField = parts.length > 2 ? parts[2] : null;
  const defaultField = getDefaultField("raid_event");
  const field = rawField || defaultField || "";

  const fieldDef = getFieldDef(field);

  return {
    eventName,
    expressionType: fieldDef.type,
    field: fieldDef,
    kind: "expression",
    nodeType: "raid_event",
  };
};

export { handleRaidEvent, type RaidEventExpressionNode };
