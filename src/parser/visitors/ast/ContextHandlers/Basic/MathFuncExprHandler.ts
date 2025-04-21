import { MathFuncExprContext } from "../../../../antlr4/SimCExprParser";
import { ExpressionNode } from "../../common-types";
import { ContextHandlerFn } from "../BaseHandler";

/**
 * Specialized node type for math function expressions (ceil/floor)
 */
interface MathFuncExpressionNode extends ExpressionNode {
  argument: ExpressionNode;
  function: "ceil" | "floor";
  nodeType: "math";
}

/**
 * Handler for ceil expressions
 */
const handleCeilExpr: ContextHandlerFn<
  MathFuncExpressionNode,
  MathFuncExprContext
> = (ctx, visitor) => {
  // Only handle if this is a ceil function
  if (!ctx.OP_CEIL()) {
    throw new Error("Not a ceil expression");
  }

  return {
    argument: visitor.visit(ctx.expression()) as ExpressionNode,
    expressionType: "numeric",
    function: "ceil",
    kind: "expression",
    nodeType: "math",
  };
};

/**
 * Handler for floor expressions
 */
const handleFloorExpr: ContextHandlerFn<
  MathFuncExpressionNode,
  MathFuncExprContext
> = (ctx, visitor) => {
  // Only handle if this is a floor function
  if (!ctx.OP_FLOOR()) {
    throw new Error("Not a floor expression");
  }

  return {
    argument: visitor.visit(ctx.expression()) as ExpressionNode,
    expressionType: "numeric",
    function: "floor",
    kind: "expression",
    nodeType: "math",
  };
};

/**
 * Generic handler for math function expressions (ceil/floor)
 */
const handleMathFuncExpr: ContextHandlerFn<
  MathFuncExpressionNode,
  MathFuncExprContext
> = (ctx, visitor) => {
  if (ctx.OP_CEIL()) {
    return handleCeilExpr(ctx, visitor);
  } else if (ctx.OP_FLOOR()) {
    return handleFloorExpr(ctx, visitor);
  } else {
    throw new Error("Unknown math function");
  }
};

export {
  handleCeilExpr,
  handleFloorExpr,
  handleMathFuncExpr,
  type MathFuncExpressionNode,
};
