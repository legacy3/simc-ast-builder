// Generated from ./src/parser/antlr4/SimCExpr.g4 by ANTLR 4.9.0-SNAPSHOT

import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

import { ParenExprContext } from "./SimCExprParser";
import { MathFuncExprContext } from "./SimCExprParser";
import { UnaryExprContext } from "./SimCExprParser";
import { MultiplicativeExprContext } from "./SimCExprParser";
import { AdditiveExprContext } from "./SimCExprParser";
import { MinMaxExprContext } from "./SimCExprParser";
import { ComparisonExprContext } from "./SimCExprParser";
import { AndExprContext } from "./SimCExprParser";
import { XorExprContext } from "./SimCExprParser";
import { OrExprContext } from "./SimCExprParser";
import { NumberExprContext } from "./SimCExprParser";
import { StringExprContext } from "./SimCExprParser";
import { MixedIdExprContext } from "./SimCExprParser";
import { AccessExprContext } from "./SimCExprParser";
import { AnyTokenExprContext } from "./SimCExprParser";
import { ParseContext } from "./SimCExprParser";
import { CommentLineContext } from "./SimCExprParser";
import { ActionLineContext } from "./SimCExprParser";
import { ActionParamContext } from "./SimCExprParser";
import { IdentifierContext } from "./SimCExprParser";
import { ActionNameContext } from "./SimCExprParser";
import { SublistNameContext } from "./SimCExprParser";
import { AccessPatternContext } from "./SimCExprParser";
import { ExpressionContext } from "./SimCExprParser";

/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `SimCExprParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface SimCExprVisitor<Result> extends ParseTreeVisitor<Result> {
  /**
   * Visit a parse tree produced by the `accessExpr`
   * labeled alternative in `SimCExprParser.expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAccessExpr?: (ctx: AccessExprContext) => Result;

  /**
   * Visit a parse tree produced by `SimCExprParser.accessPattern`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAccessPattern?: (ctx: AccessPatternContext) => Result;

  /**
   * Visit a parse tree produced by `SimCExprParser.actionLine`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitActionLine?: (ctx: ActionLineContext) => Result;

  /**
   * Visit a parse tree produced by `SimCExprParser.actionName`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitActionName?: (ctx: ActionNameContext) => Result;

  /**
   * Visit a parse tree produced by `SimCExprParser.actionParam`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitActionParam?: (ctx: ActionParamContext) => Result;

  /**
   * Visit a parse tree produced by the `additiveExpr`
   * labeled alternative in `SimCExprParser.expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAdditiveExpr?: (ctx: AdditiveExprContext) => Result;

  /**
   * Visit a parse tree produced by the `andExpr`
   * labeled alternative in `SimCExprParser.expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAndExpr?: (ctx: AndExprContext) => Result;

  /**
   * Visit a parse tree produced by the `anyTokenExpr`
   * labeled alternative in `SimCExprParser.expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAnyTokenExpr?: (ctx: AnyTokenExprContext) => Result;

  /**
   * Visit a parse tree produced by `SimCExprParser.commentLine`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitCommentLine?: (ctx: CommentLineContext) => Result;

  /**
   * Visit a parse tree produced by the `comparisonExpr`
   * labeled alternative in `SimCExprParser.expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitComparisonExpr?: (ctx: ComparisonExprContext) => Result;

  /**
   * Visit a parse tree produced by `SimCExprParser.expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitExpression?: (ctx: ExpressionContext) => Result;

  /**
   * Visit a parse tree produced by `SimCExprParser.identifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitIdentifier?: (ctx: IdentifierContext) => Result;

  /**
   * Visit a parse tree produced by the `mathFuncExpr`
   * labeled alternative in `SimCExprParser.expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitMathFuncExpr?: (ctx: MathFuncExprContext) => Result;

  /**
   * Visit a parse tree produced by the `minMaxExpr`
   * labeled alternative in `SimCExprParser.expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitMinMaxExpr?: (ctx: MinMaxExprContext) => Result;

  /**
   * Visit a parse tree produced by the `mixedIdExpr`
   * labeled alternative in `SimCExprParser.expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitMixedIdExpr?: (ctx: MixedIdExprContext) => Result;

  /**
   * Visit a parse tree produced by the `multiplicativeExpr`
   * labeled alternative in `SimCExprParser.expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitMultiplicativeExpr?: (ctx: MultiplicativeExprContext) => Result;

  /**
   * Visit a parse tree produced by the `numberExpr`
   * labeled alternative in `SimCExprParser.expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitNumberExpr?: (ctx: NumberExprContext) => Result;

  /**
   * Visit a parse tree produced by the `orExpr`
   * labeled alternative in `SimCExprParser.expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitOrExpr?: (ctx: OrExprContext) => Result;

  /**
   * Visit a parse tree produced by the `parenExpr`
   * labeled alternative in `SimCExprParser.expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitParenExpr?: (ctx: ParenExprContext) => Result;

  /**
   * Visit a parse tree produced by `SimCExprParser.parse`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitParse?: (ctx: ParseContext) => Result;

  /**
   * Visit a parse tree produced by the `stringExpr`
   * labeled alternative in `SimCExprParser.expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitStringExpr?: (ctx: StringExprContext) => Result;

  /**
   * Visit a parse tree produced by `SimCExprParser.sublistName`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSublistName?: (ctx: SublistNameContext) => Result;

  /**
   * Visit a parse tree produced by the `unaryExpr`
   * labeled alternative in `SimCExprParser.expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitUnaryExpr?: (ctx: UnaryExprContext) => Result;

  /**
   * Visit a parse tree produced by the `xorExpr`
   * labeled alternative in `SimCExprParser.expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitXorExpr?: (ctx: XorExprContext) => Result;
}
