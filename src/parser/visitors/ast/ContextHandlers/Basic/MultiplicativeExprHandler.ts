import { MultiplicativeExprContext } from "../../../../antlr4/SimCExprParser";
import { ExpressionNode } from "../../common-types";
import { ContextHandlerFn } from "../BaseHandler";

/**
 * Specialized node type for multiplicative expressions (* % %%)
 */
interface MultiplicativeExpressionNode extends ExpressionNode {
  left: ExpressionNode;
  nodeType: "multiplicative";
  operator: "mul" | "div" | "mod";
  right: ExpressionNode;
}

/**
 * Handler for multiplication expressions
 */
const handleMulExpr: ContextHandlerFn<
  MultiplicativeExpressionNode,
  MultiplicativeExprContext
> = (ctx, visitor) => {
  // Only handle if this is a multiplication
  if (!ctx.OP_MUL()) {
    throw new Error("Not a multiplication expression");
  }

  return {
    expressionType: "numeric",
    kind: "expression",
    left: visitor.visit(ctx.expression(0)) as ExpressionNode,
    nodeType: "multiplicative",
    operator: "mul",
    right: visitor.visit(ctx.expression(1)) as ExpressionNode,
  };
};

/**
 * Handler for division expressions
 */
const handleDivExpr: ContextHandlerFn<
  MultiplicativeExpressionNode,
  MultiplicativeExprContext
> = (ctx, visitor) => {
  // Only handle if this is a division
  if (!ctx.OP_DIV()) {
    throw new Error("Not a division expression");
  }

  return {
    expressionType: "numeric",
    kind: "expression",
    left: visitor.visit(ctx.expression(0)) as ExpressionNode,
    nodeType: "multiplicative",
    operator: "div",
    right: visitor.visit(ctx.expression(1)) as ExpressionNode,
  };
};

/**
 * Handler for modulus expressions
 */
const handleModExpr: ContextHandlerFn<
  MultiplicativeExpressionNode,
  MultiplicativeExprContext
> = (ctx, visitor) => {
  // Only handle if this is a modulus
  if (!ctx.OP_MOD()) {
    throw new Error("Not a modulus expression");
  }

  return {
    expressionType: "numeric",
    kind: "expression",
    left: visitor.visit(ctx.expression(0)) as ExpressionNode,
    nodeType: "multiplicative",
    operator: "mod",
    right: visitor.visit(ctx.expression(1)) as ExpressionNode,
  };
};

/**
 * Generic handler for all multiplicative expressions (* % %%)
 */
const handleMultiplicativeExpr: ContextHandlerFn<
  MultiplicativeExpressionNode,
  MultiplicativeExprContext
> = (ctx, visitor) => {
  if (ctx.OP_MUL()) {
    return handleMulExpr(ctx, visitor);
  } else if (ctx.OP_DIV()) {
    return handleDivExpr(ctx, visitor);
  } else if (ctx.OP_MOD()) {
    return handleModExpr(ctx, visitor);
  } else {
    throw new Error("Unknown multiplicative operator");
  }
};

export {
  handleDivExpr,
  handleModExpr,
  handleMulExpr,
  handleMultiplicativeExpr,
  type MultiplicativeExpressionNode,
};
