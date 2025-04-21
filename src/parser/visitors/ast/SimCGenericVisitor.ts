import { AbstractParseTreeVisitor } from "antlr4ts/tree/AbstractParseTreeVisitor";
import { ParseTree } from "antlr4ts/tree/ParseTree";

import {
  AccessExprContext,
  ActionLineContext,
  ActionNameContext,
  ActionParamContext,
  AdditiveExprContext,
  AndExprContext,
  AnyTokenExprContext,
  CommentLineContext,
  ComparisonExprContext,
  ExpressionContext,
  IdentifierContext,
  MathFuncExprContext,
  MinMaxExprContext,
  MixedIdExprContext,
  MultiplicativeExprContext,
  NumberExprContext,
  OrExprContext,
  ParenExprContext,
  ParseContext,
  StringExprContext,
  SublistNameContext,
  UnaryExprContext,
  XorExprContext,
} from "../../antlr4/SimCExprParser";
import { SimCExprVisitor } from "../../antlr4/SimCExprVisitor";
import {
  ActionLineNode,
  ASTNode,
  CommentLineNode,
  ConditionNode,
  ExpressionNode,
  ParameterNode,
} from "./common-types";
import { contextHandlerRegistry } from "./ContextHandlers/ContextHandlerRegistry";
import { SimCVisitorError } from "./errors/SimCVisitorError";
import { extractAccessParts } from "./utils/fieldUtils";

/**
 * Generic visitor that implements the ANTLR visitor pattern
 */
export class SimCGenericVisitor
  extends AbstractParseTreeVisitor<ASTNode>
  implements SimCExprVisitor<ASTNode>
{
  constructor() {
    super();
  }
  /**
   * Generic visit method for any context
   */
  visit(tree: ParseTree): ASTNode {
    if (!tree) {
      throw new Error("Null parse tree");
    }

    return tree.accept(this);
  }

  /**
   * Visit an access expression context
   */
  visitAccessExpr(ctx: AccessExprContext): ExpressionNode {
    return contextHandlerRegistry.dispatchContext("AccessExpr", ctx, this);
  }

  /**
   * Visit an action line context
   */
  visitActionLine(ctx: ActionLineContext): ActionLineNode {
    // Set the metadata for the context handler
    contextHandlerRegistry.setMetaData({
      actionLine: ctx.text,
      actionName: ctx.actionName().text,
      actionParams: ctx.actionParam(),
      subListName: ctx.sublistName()?.text || "",
    });

    return contextHandlerRegistry.dispatchContext("ActionLine", ctx, this);
  }

  /**
   * Visit an action name context
   */
  visitActionName(ctx: ActionNameContext): ExpressionNode {
    return contextHandlerRegistry.dispatchContext("ActionName", ctx, this);
  }

  /**
   * Visit an action parameter context
   */
  visitActionParam(ctx: ActionParamContext): ParameterNode {
    return contextHandlerRegistry.dispatchContext("ActionParam", ctx, this);
  }

  /**
   * Visit an additive expression context (+ -)
   */
  visitAdditiveExpr(ctx: AdditiveExprContext): ExpressionNode {
    return contextHandlerRegistry.dispatchContext("AdditiveExpr", ctx, this);
  }

  /**
   * Visit an AND expression context
   */
  visitAndExpr(ctx: AndExprContext): ExpressionNode {
    return contextHandlerRegistry.dispatchContext("AndExpr", ctx, this);
  }

  /**
   * Visit an any token expression context
   */
  visitAnyTokenExpr(ctx: AnyTokenExprContext): ExpressionNode {
    return contextHandlerRegistry.dispatchContext("AnyTokenExpr", ctx, this);
  }

  /**
   * Visit a comment line context
   */
  visitCommentLine(ctx: CommentLineContext): CommentLineNode {
    return contextHandlerRegistry.dispatchContext("CommentLine", ctx, this);
  }

  /**
   * Visit a comparison expression context
   */
  visitComparisonExpr(ctx: ComparisonExprContext): ExpressionNode {
    return contextHandlerRegistry.dispatchContext("ComparisonExpr", ctx, this);
  }

  /**
   * Visit an expression context
   */
  visitExpression(ctx: ExpressionContext): ASTNode {
    return this.visitChildren(ctx);
  }

  /**
   * Visit a string expression context
   */

  /**
   * Visit an identifier context
   */
  visitIdentifier(ctx: IdentifierContext): ExpressionNode {
    return contextHandlerRegistry.dispatchContext("Identifier", ctx, this);
  }

  /**
   * Visit a math function expression context (ceil or floor)
   */
  visitMathFuncExpr(ctx: MathFuncExprContext): ExpressionNode {
    return contextHandlerRegistry.dispatchContext("MathFuncExpr", ctx, this);
  }

  /**
   * Visit a min/max expression context
   */
  visitMinMaxExpr(ctx: MinMaxExprContext): ExpressionNode {
    return contextHandlerRegistry.dispatchContext("MinMaxExpr", ctx, this);
  }

  /**
   * Visit a mixed ID expression context
   */
  visitMixedIdExpr(ctx: MixedIdExprContext): ExpressionNode {
    return contextHandlerRegistry.dispatchContext("MixedIdExpr", ctx, this);
  }

  /**
   * Visit a multiplicative expression context (* % %%)
   */
  visitMultiplicativeExpr(ctx: MultiplicativeExprContext): ExpressionNode {
    return contextHandlerRegistry.dispatchContext(
      "MultiplicativeExpr",
      ctx,
      this,
    );
  }

  /**
   * Visit a number expression context
   */
  visitNumberExpr(ctx: NumberExprContext): ExpressionNode {
    return contextHandlerRegistry.dispatchContext("NumberExpr", ctx, this);
  }

  /**
   * Visit an OR expression context
   */
  visitOrExpr(ctx: OrExprContext): ExpressionNode {
    return contextHandlerRegistry.dispatchContext("OrExpr", ctx, this);
  }

  /**
   * Visit a parenthesized expression context
   */
  visitParenExpr(ctx: ParenExprContext): ExpressionNode {
    // TODO
    return this.visit(ctx.expression()) as ExpressionNode;
  }

  /**
   * Visit a parse context
   */
  visitParse(ctx: ParseContext): ASTNode {
    return contextHandlerRegistry.dispatchContext("Parse", ctx, this);
  }

  visitStringExpr(ctx: StringExprContext): ExpressionNode {
    return contextHandlerRegistry.dispatchContext("StringExpr", ctx, this);
  }

  /**
   * Visit a sublist name context
   */
  visitSublistName(ctx: SublistNameContext): ExpressionNode {
    return contextHandlerRegistry.dispatchContext("SublistName", ctx, this);
  }

  /**
   * Visit a unary expression context (+ - ! @)
   */
  visitUnaryExpr(ctx: UnaryExprContext): ExpressionNode {
    return contextHandlerRegistry.dispatchContext("UnaryExpr", ctx, this);
  }

  /**
   * Visit a XOR expression context
   */
  visitXorExpr(ctx: XorExprContext): ExpressionNode {
    return contextHandlerRegistry.dispatchContext("XorExpr", ctx, this);
  }

  protected defaultResult(): ASTNode {
    // Get the context object
    const ctx = arguments[0];

    // Just dump the text
    if (ctx && ctx.text) {
      console.error(`FAILED: ${ctx.text}`);
    } else {
      console.error(`FAILED: Unknown context`);
    }

    throw new Error(`Parsing failed`);
  }
}
