import { ExpressionNode } from "../../common-types";
import { AccessHandlerFn } from "../BaseHandler";

/**
 * Specialized node type for cycle_enemies access
 */
interface CycleEnemiesExpressionNode extends ExpressionNode {
  nodeType: "cycle_enemies";
}

/**
 * Handler for cycle_enemies access contexts
 * This represents the ability to cycle between enemy targets
 */
const handleCycleEnemies: AccessHandlerFn<CycleEnemiesExpressionNode> = ({
  parts,
}) => {
  return {
    expressionType: "numeric",
    kind: "expression",
    nodeType: "cycle_enemies",
  };
};

export { handleCycleEnemies, type CycleEnemiesExpressionNode };
