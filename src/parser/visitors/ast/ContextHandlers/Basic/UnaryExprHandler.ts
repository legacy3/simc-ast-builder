import { UnaryExprContext } from "../../../../antlr4/SimCExprParser";
import { ExpressionNode } from "../../common-types";
import { ContextHandlerFn } from "../BaseHandler";

/**
 * Specialized node type for unary expressions (+ - @ !)
 */
interface UnaryExpressionNode extends ExpressionNode {
  argument: ExpressionNode;
  nodeType: "unary";
  operator: "plus" | "minus" | "not" | "abs";
}

/**
 * Handler for unary plus expressions
 */
const handleUnaryPlusExpr: ContextHandlerFn<
  UnaryExpressionNode,
  UnaryExprContext
> = (ctx, visitor) => {
  // Only handle if this is a unary plus
  if (!ctx.OP_PLUS()) {
    throw new Error("Not a unary plus expression");
  }

  return {
    argument: visitor.visit(ctx.expression()) as ExpressionNode,
    expressionType: "numeric",
    kind: "expression",
    nodeType: "unary",
    operator: "plus",
  };
};

/**
 * Handler for unary minus expressions
 */
const handleUnaryMinusExpr: ContextHandlerFn<
  UnaryExpressionNode,
  UnaryExprContext
> = (ctx, visitor) => {
  // Only handle if this is a unary minus
  if (!ctx.OP_MINUS()) {
    throw new Error("Not a unary minus expression");
  }

  return {
    argument: visitor.visit(ctx.expression()) as ExpressionNode,
    expressionType: "numeric",
    kind: "expression",
    nodeType: "unary",
    operator: "minus",
  };
};

/**
 * Handler for absolute value expressions
 */
const handleAbsExpr: ContextHandlerFn<UnaryExpressionNode, UnaryExprContext> = (
  ctx,
  visitor,
) => {
  // Only handle if this is an abs operator
  if (!ctx.OP_ABS()) {
    throw new Error("Not an abs expression");
  }

  return {
    argument: visitor.visit(ctx.expression()) as ExpressionNode,
    expressionType: "numeric",
    kind: "expression",
    nodeType: "unary",
    operator: "abs",
  };
};

/**
 * Handler for logical not expressions
 */
const handleNotExpr: ContextHandlerFn<UnaryExpressionNode, UnaryExprContext> = (
  ctx,
  visitor,
) => {
  // Only handle if this is a logical not
  if (!ctx.OP_NOT()) {
    throw new Error("Not a logical not expression");
  }

  return {
    argument: visitor.visit(ctx.expression()) as ExpressionNode,
    expressionType: "boolean",
    kind: "expression",
    nodeType: "unary",
    operator: "not",
  };
};

/**
 * Generic handler for all unary expressions
 */
const handleUnaryExpr: ContextHandlerFn<
  UnaryExpressionNode,
  UnaryExprContext
> = (ctx, visitor) => {
  if (ctx.OP_PLUS()) {
    return handleUnaryPlusExpr(ctx, visitor);
  } else if (ctx.OP_MINUS()) {
    return handleUnaryMinusExpr(ctx, visitor);
  } else if (ctx.OP_ABS()) {
    return handleAbsExpr(ctx, visitor);
  } else if (ctx.OP_NOT()) {
    return handleNotExpr(ctx, visitor);
  } else {
    throw new Error("Unknown unary operator");
  }
};

export {
  handleAbsExpr,
  handleNotExpr,
  handleUnaryExpr,
  handleUnaryMinusExpr,
  handleUnaryPlusExpr,
  type UnaryExpressionNode,
};
