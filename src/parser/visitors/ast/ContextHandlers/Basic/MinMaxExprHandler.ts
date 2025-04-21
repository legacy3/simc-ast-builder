import { MinMaxExprContext } from "../../../../antlr4/SimCExprParser";
import { ExpressionNode } from "../../common-types";
import { ContextHandlerFn } from "../BaseHandler";

/**
 * Specialized node type for min/max expressions
 */
interface MinMaxExpressionNode extends ExpressionNode {
  function: "min" | "max";
  left: ExpressionNode;
  nodeType: "minOrMax";
  right: ExpressionNode;
}

/**
 * Handler for max expressions
 */
const handleMaxExpr: ContextHandlerFn<
  MinMaxExpressionNode,
  MinMaxExprContext
> = (ctx, visitor) => {
  // Only handle if this is a max function
  if (!ctx.OP_MAX()) {
    throw new Error("Not a max expression");
  }

  const left = visitor.visit(ctx.expression(0)) as ExpressionNode;
  const right = visitor.visit(ctx.expression(1)) as ExpressionNode;

  return {
    expressionType: "numeric",
    function: "max",
    kind: "expression",
    left,
    nodeType: "minOrMax",
    right,
  };
};

/**
 * Handler for min expressions
 */
const handleMinExpr: ContextHandlerFn<
  MinMaxExpressionNode,
  MinMaxExprContext
> = (ctx, visitor) => {
  // Only handle if this is a min function
  if (!ctx.OP_MIN()) {
    throw new Error("Not a min expression");
  }

  const left = visitor.visit(ctx.expression(0)) as ExpressionNode;
  const right = visitor.visit(ctx.expression(1)) as ExpressionNode;

  return {
    expressionType: "numeric",
    function: "min",
    kind: "expression",
    left,
    nodeType: "minOrMax",
    right,
  };
};

/**
 * Generic handler for min/max expressions
 */
const handleMinMaxExpr: ContextHandlerFn<
  MinMaxExpressionNode,
  MinMaxExprContext
> = (ctx, visitor) => {
  if (ctx.OP_MAX()) {
    return handleMaxExpr(ctx, visitor);
  } else if (ctx.OP_MIN()) {
    return handleMinExpr(ctx, visitor);
  } else {
    throw new Error("Unknown min/max function");
  }
};

export {
  handleMaxExpr,
  handleMinExpr,
  handleMinMaxExpr,
  type MinMaxExpressionNode,
};
