import { ComparisonExprContext } from "../../../../antlr4/SimCExprParser";
import { ExpressionNode } from "../../common-types";
import { ContextHandlerFn } from "../BaseHandler";

/**
 * Specialized node type for comparison expressions (= != < <= > >=)
 */
interface ComparisonExpressionNode extends ExpressionNode {
  left: ExpressionNode;
  nodeType: "comparison";
  operator: "eq" | "ne" | "lt" | "le" | "gt" | "ge";
  right: ExpressionNode;
}

/**
 * Handler for equality expressions (=, ==)
 */
const handleEqualityExpr: ContextHandlerFn<
  ComparisonExpressionNode,
  ComparisonExprContext
> = (ctx, visitor) => {
  // Only handle if this is an equality comparison
  if (!ctx.OP_EQ() && !ctx.OP_EQEQ()) {
    throw new Error("Not an equality expression");
  }

  return {
    expressionType: "boolean",
    kind: "expression",
    left: visitor.visit(ctx.expression(0)) as ExpressionNode,
    nodeType: "comparison",
    operator: "eq",
    right: visitor.visit(ctx.expression(1)) as ExpressionNode,
  };
};

/**
 * Handler for inequality expressions (!=)
 */
const handleInequalityExpr: ContextHandlerFn<
  ComparisonExpressionNode,
  ComparisonExprContext
> = (ctx, visitor) => {
  // Only handle if this is an inequality comparison
  if (!ctx.OP_NE()) {
    throw new Error("Not an inequality expression");
  }

  return {
    expressionType: "boolean",
    kind: "expression",
    left: visitor.visit(ctx.expression(0)) as ExpressionNode,
    nodeType: "comparison",
    operator: "ne",
    right: visitor.visit(ctx.expression(1)) as ExpressionNode,
  };
};

/**
 * Handler for less than expressions (<)
 */
const handleLessThanExpr: ContextHandlerFn<
  ComparisonExpressionNode,
  ComparisonExprContext
> = (ctx, visitor) => {
  // Only handle if this is a less than comparison
  if (!ctx.OP_LT()) {
    throw new Error("Not a less than expression");
  }

  return {
    expressionType: "boolean",
    kind: "expression",
    left: visitor.visit(ctx.expression(0)) as ExpressionNode,
    nodeType: "comparison",
    operator: "lt",
    right: visitor.visit(ctx.expression(1)) as ExpressionNode,
  };
};

/**
 * Handler for less than or equal expressions (<=)
 */
const handleLessThanEqualExpr: ContextHandlerFn<
  ComparisonExpressionNode,
  ComparisonExprContext
> = (ctx, visitor) => {
  // Only handle if this is a less than or equal comparison
  if (!ctx.OP_LE()) {
    throw new Error("Not a less than or equal expression");
  }

  return {
    expressionType: "boolean",
    kind: "expression",
    left: visitor.visit(ctx.expression(0)) as ExpressionNode,
    nodeType: "comparison",
    operator: "le",
    right: visitor.visit(ctx.expression(1)) as ExpressionNode,
  };
};

/**
 * Handler for greater than expressions (>)
 */
const handleGreaterThanExpr: ContextHandlerFn<
  ComparisonExpressionNode,
  ComparisonExprContext
> = (ctx, visitor) => {
  // Only handle if this is a greater than comparison
  if (!ctx.OP_GT()) {
    throw new Error("Not a greater than expression");
  }

  return {
    expressionType: "boolean",
    kind: "expression",
    left: visitor.visit(ctx.expression(0)) as ExpressionNode,
    nodeType: "comparison",
    operator: "gt",
    right: visitor.visit(ctx.expression(1)) as ExpressionNode,
  };
};

/**
 * Handler for greater than or equal expressions (>=)
 */
const handleGreaterThanEqualExpr: ContextHandlerFn<
  ComparisonExpressionNode,
  ComparisonExprContext
> = (ctx, visitor) => {
  // Only handle if this is a greater than or equal comparison
  if (!ctx.OP_GE()) {
    throw new Error("Not a greater than or equal expression");
  }

  return {
    expressionType: "boolean",
    kind: "expression",
    left: visitor.visit(ctx.expression(0)) as ExpressionNode,
    nodeType: "comparison",
    operator: "ge",
    right: visitor.visit(ctx.expression(1)) as ExpressionNode,
  };
};

/**
 * Generic handler for all comparison expressions (= != < <= > >=)
 */
const handleComparisonExpr: ContextHandlerFn<
  ComparisonExpressionNode,
  ComparisonExprContext
> = (ctx, visitor) => {
  if (ctx.OP_EQ() || ctx.OP_EQEQ()) {
    return handleEqualityExpr(ctx, visitor);
  } else if (ctx.OP_NE()) {
    return handleInequalityExpr(ctx, visitor);
  } else if (ctx.OP_LT()) {
    return handleLessThanExpr(ctx, visitor);
  } else if (ctx.OP_LE()) {
    return handleLessThanEqualExpr(ctx, visitor);
  } else if (ctx.OP_GT()) {
    return handleGreaterThanExpr(ctx, visitor);
  } else if (ctx.OP_GE()) {
    return handleGreaterThanEqualExpr(ctx, visitor);
  } else {
    throw new Error("Unknown comparison operator");
  }
};

export {
  handleComparisonExpr,
  handleEqualityExpr,
  handleGreaterThanEqualExpr,
  handleGreaterThanExpr,
  handleInequalityExpr,
  handleLessThanEqualExpr,
  handleLessThanExpr,
  type ComparisonExpressionNode,
};
