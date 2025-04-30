import { ExpressionNode } from "../../common-types";
import {
  FieldDefinition,
  getDefaultField,
  getFieldDef,
} from "../../utils/fieldMaps";
import { AccessHandlerFn } from "../BaseHandler";

/**
 * Specialized node type for set_bonus access
 */
interface SetBonusExpressionNode extends ExpressionNode {
  field: FieldDefinition;
  nodeType: "set_bonus";
  setName: string;
}

function extractSetInfo(input: string): {
  setName: string;
  fieldName: string;
} | null {
  // First, check if it's a direct set name (like "tww2")
  const directSetMatch = input.match(/^(tww\d+|tier\d+)$/);
  if (directSetMatch) {
    return {
      fieldName: getDefaultField("set_bonus")!,
      setName: directSetMatch[1]!,
    };
  }

  // Then check for the pattern with piece count
  const regex = /([a-z0-9_]+)_(\d+)pc/;
  const match = input.match(regex);

  if (!match) {
    return null;
  }

  let setName = match[1]!;
  const pieceCount = parseInt(match[2]!, 10);

  // Check for "thewarwithin_season_X" pattern and normalize to "twwX"
  const seasonMatch = setName.match(/thewarwithin_season_(\d+)/);
  if (seasonMatch) {
    setName = `tww${seasonMatch[1]}`;
  }

  return {
    fieldName: `has_${pieceCount}pc`,
    setName,
  };
}

/**
 * Handler for set_bonus access contexts
 */
const handleSetBonus: AccessHandlerFn<SetBonusExpressionNode> = ({ parts }) => {
  if (parts.length < 2) {
    throw new Error("Invalid set_bonus access");
  }

  const setInfo = extractSetInfo(parts[1]!);

  if (!setInfo) {
    throw new Error(`Could not parse set_bonus: ${parts[1]}`);
  }

  // Get the appropriate field definition
  const fieldDef = getFieldDef(setInfo.fieldName);

  return {
    expressionType: fieldDef.type,
    field: fieldDef,
    kind: "expression",
    nodeType: "set_bonus",
    setName: setInfo.setName,
  };
};

export { handleSetBonus, type SetBonusExpressionNode };
