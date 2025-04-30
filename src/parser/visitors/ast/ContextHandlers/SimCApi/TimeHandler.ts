import { ExpressionNode } from "../../common-types";
import { AccessHandlerFn } from "../BaseHandler";

/**
 * Specialized node type for time access
 */
interface TimeExpressionNode extends ExpressionNode {
  nodeType: "time";
}

/**
 * Handler for time access contexts
 * This represents the current time in the simulation
 */
const handleTime: AccessHandlerFn<TimeExpressionNode> = ({ parts }) => {
  return {
    expressionType: "numeric",
    kind: "expression",
    nodeType: "time",
  };
};

export { handleTime, type TimeExpressionNode };
