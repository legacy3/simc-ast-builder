import { ExpressionNode } from "../../common-types";
import { AccessHandlerFn } from "../BaseHandler";

/**
 * Specialized node type for fight_remains access
 */
interface FightRemainsExpressionNode extends ExpressionNode {
  nodeType: "fight_remains";
}

/**
 * Handler for fight_remains access contexts
 * This represents the time remaining in the current fight
 */
const handleFightRemains: AccessHandlerFn<FightRemainsExpressionNode> = ({
  parts,
}) => {
  return {
    expressionType: "numeric",
    kind: "expression",
    nodeType: "fight_remains",
  };
};

export { handleFightRemains, type FightRemainsExpressionNode };
