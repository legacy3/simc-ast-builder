import { ExpressionNode } from "../../common-types";
import { SimCVisitorError } from "../../errors/SimCVisitorError";
import { getFieldDef } from "../../utils/fieldMaps";
import { AccessHandlerFn } from "../BaseHandler";

/**
 * Specialized node type for settings access
 */
interface SettingsExpressionNode extends ExpressionNode {
  nodeType: "settings";
  settingName: string;
}

/**
 * Handler for settings access contexts
 */
const handleSettings: AccessHandlerFn<SettingsExpressionNode> = ({
  ctx,
  parts,
}) => {
  if (parts.length < 2) {
    throw new SimCVisitorError("Settings access requires a name", ctx);
  }

  const name = parts[1]!; // Non-null assertion since we check parts.length above

  // Settings don't have fields like other access types
  // They just return their value directly
  const fieldDef = getFieldDef("value");

  return {
    expressionType: fieldDef.type,
    field: "",
    kind: "expression",
    nodeType: "settings",
    settingName: name,
  };
};

export { handleSettings, type SettingsExpressionNode };
