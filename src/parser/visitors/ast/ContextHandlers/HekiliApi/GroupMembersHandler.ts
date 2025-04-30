import { ParserRuleContext } from "antlr4ts";

import { ExpressionNode } from "../../common-types";
import { AccessHandlerFn } from "../BaseHandler";

/**
 * Specialized node type for group_members access
 */
interface GroupMembersExpressionNode extends ExpressionNode {
  nodeType: "group_members";
}

/**
 * Handler for Hekili group_members API access
 * This represents the number of members in the player's group
 */
const handleGroupMembers: AccessHandlerFn<
  GroupMembersExpressionNode,
  ParserRuleContext
> = () => {
  return {
    expressionType: "numeric",
    kind: "expression",
    nodeType: "group_members",
  };
};

export { handleGroupMembers, type GroupMembersExpressionNode };
