import { AdditiveExprContext } from "../../../../antlr4/SimCExprParser";
import { ExpressionNode } from "../../common-types";
import { ContextHandlerFn } from "../BaseHandler";

/**
 * Specialized node type for additive expressions (+ -)
 */
interface AdditiveExpressionNode extends ExpressionNode {
  left: ExpressionNode;
  nodeType: "additive";
  operator: "add" | "sub";
  right: ExpressionNode;
}

/**
 * Handler for addition expressions
 */
const handleAddExpr: ContextHandlerFn<
  AdditiveExpressionNode,
  AdditiveExprContext
> = (ctx, visitor) => {
  // Only handle if this is an addition
  if (!ctx.OP_PLUS()) {
    throw new Error("Not an addition expression");
  }

  return {
    expressionType: "numeric",
    kind: "expression",
    left: visitor.visit(ctx.expression(0)) as ExpressionNode,
    nodeType: "additive",
    operator: "add",
    right: visitor.visit(ctx.expression(1)) as ExpressionNode,
  };
};

/**
 * Handler for subtraction expressions
 */
const handleSubExpr: ContextHandlerFn<
  AdditiveExpressionNode,
  AdditiveExprContext
> = (ctx, visitor) => {
  // Only handle if this is a subtraction
  if (!ctx.OP_MINUS()) {
    throw new Error("Not a subtraction expression");
  }

  return {
    expressionType: "numeric",
    kind: "expression",
    left: visitor.visit(ctx.expression(0)) as ExpressionNode,
    nodeType: "additive",
    operator: "sub",
    right: visitor.visit(ctx.expression(1)) as ExpressionNode,
  };
};

/**
 * Generic handler for additive expressions (+ -)
 */
const handleAdditiveExpr: ContextHandlerFn<
  AdditiveExpressionNode,
  AdditiveExprContext
> = (ctx, visitor) => {
  if (ctx.OP_PLUS()) {
    return handleAddExpr(ctx, visitor);
  } else if (ctx.OP_MINUS()) {
    return handleSubExpr(ctx, visitor);
  } else {
    throw new Error("Unknown additive operator");
  }
};

export {
  handleAddExpr,
  handleAdditiveExpr,
  handleSubExpr,
  type AdditiveExpressionNode,
};
