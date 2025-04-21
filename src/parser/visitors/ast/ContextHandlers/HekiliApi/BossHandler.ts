import { ParserRuleContext } from "antlr4ts";

import { ExpressionNode } from "../../common-types";
import { AccessHandlerFn } from "../BaseHandler";

/**
 * Specialized node type for boss access
 */
interface BossExpressionNode extends ExpressionNode {
  nodeType: "boss";
}

/**
 * Handler for Hekili boss API access
 */
const handleBoss: AccessHandlerFn<
  BossExpressionNode,
  ParserRuleContext
> = () => {
  return {
    expressionType: "boolean",
    kind: "expression",
    nodeType: "boss",
  };
};

export { handleBoss, type BossExpressionNode };
