// Generated from ./src/parser/antlr4/SimCExpr.g4 by ANTLR 4.9.0-SNAPSHOT

import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

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
 * This interface defines a complete listener for a parse tree produced by
 * `SimCExprParser`.
 */
export interface SimCExprListener extends ParseTreeListener {
  /**
   * Enter a parse tree produced by the `accessExpr`
   * labeled alternative in `SimCExprParser.expression`.
   * @param ctx the parse tree
   */
  enterAccessExpr?: (ctx: AccessExprContext) => void;
  /**
   * Enter a parse tree produced by `SimCExprParser.accessPattern`.
   * @param ctx the parse tree
   */
  enterAccessPattern?: (ctx: AccessPatternContext) => void;

  /**
   * Enter a parse tree produced by `SimCExprParser.actionLine`.
   * @param ctx the parse tree
   */
  enterActionLine?: (ctx: ActionLineContext) => void;
  /**
   * Enter a parse tree produced by `SimCExprParser.actionName`.
   * @param ctx the parse tree
   */
  enterActionName?: (ctx: ActionNameContext) => void;

  /**
   * Enter a parse tree produced by `SimCExprParser.actionParam`.
   * @param ctx the parse tree
   */
  enterActionParam?: (ctx: ActionParamContext) => void;
  /**
   * Enter a parse tree produced by the `additiveExpr`
   * labeled alternative in `SimCExprParser.expression`.
   * @param ctx the parse tree
   */
  enterAdditiveExpr?: (ctx: AdditiveExprContext) => void;

  /**
   * Enter a parse tree produced by the `andExpr`
   * labeled alternative in `SimCExprParser.expression`.
   * @param ctx the parse tree
   */
  enterAndExpr?: (ctx: AndExprContext) => void;
  /**
   * Enter a parse tree produced by the `anyTokenExpr`
   * labeled alternative in `SimCExprParser.expression`.
   * @param ctx the parse tree
   */
  enterAnyTokenExpr?: (ctx: AnyTokenExprContext) => void;

  /**
   * Enter a parse tree produced by `SimCExprParser.commentLine`.
   * @param ctx the parse tree
   */
  enterCommentLine?: (ctx: CommentLineContext) => void;
  /**
   * Enter a parse tree produced by the `comparisonExpr`
   * labeled alternative in `SimCExprParser.expression`.
   * @param ctx the parse tree
   */
  enterComparisonExpr?: (ctx: ComparisonExprContext) => void;

  /**
   * Enter a parse tree produced by `SimCExprParser.expression`.
   * @param ctx the parse tree
   */
  enterExpression?: (ctx: ExpressionContext) => void;
  /**
   * Enter a parse tree produced by `SimCExprParser.identifier`.
   * @param ctx the parse tree
   */
  enterIdentifier?: (ctx: IdentifierContext) => void;

  /**
   * Enter a parse tree produced by the `mathFuncExpr`
   * labeled alternative in `SimCExprParser.expression`.
   * @param ctx the parse tree
   */
  enterMathFuncExpr?: (ctx: MathFuncExprContext) => void;
  /**
   * Enter a parse tree produced by the `minMaxExpr`
   * labeled alternative in `SimCExprParser.expression`.
   * @param ctx the parse tree
   */
  enterMinMaxExpr?: (ctx: MinMaxExprContext) => void;

  /**
   * Enter a parse tree produced by the `mixedIdExpr`
   * labeled alternative in `SimCExprParser.expression`.
   * @param ctx the parse tree
   */
  enterMixedIdExpr?: (ctx: MixedIdExprContext) => void;
  /**
   * Enter a parse tree produced by the `multiplicativeExpr`
   * labeled alternative in `SimCExprParser.expression`.
   * @param ctx the parse tree
   */
  enterMultiplicativeExpr?: (ctx: MultiplicativeExprContext) => void;

  /**
   * Enter a parse tree produced by the `numberExpr`
   * labeled alternative in `SimCExprParser.expression`.
   * @param ctx the parse tree
   */
  enterNumberExpr?: (ctx: NumberExprContext) => void;
  /**
   * Enter a parse tree produced by the `orExpr`
   * labeled alternative in `SimCExprParser.expression`.
   * @param ctx the parse tree
   */
  enterOrExpr?: (ctx: OrExprContext) => void;

  /**
   * Enter a parse tree produced by the `parenExpr`
   * labeled alternative in `SimCExprParser.expression`.
   * @param ctx the parse tree
   */
  enterParenExpr?: (ctx: ParenExprContext) => void;
  /**
   * Enter a parse tree produced by `SimCExprParser.parse`.
   * @param ctx the parse tree
   */
  enterParse?: (ctx: ParseContext) => void;

  /**
   * Enter a parse tree produced by the `stringExpr`
   * labeled alternative in `SimCExprParser.expression`.
   * @param ctx the parse tree
   */
  enterStringExpr?: (ctx: StringExprContext) => void;
  /**
   * Enter a parse tree produced by `SimCExprParser.sublistName`.
   * @param ctx the parse tree
   */
  enterSublistName?: (ctx: SublistNameContext) => void;

  /**
   * Enter a parse tree produced by the `unaryExpr`
   * labeled alternative in `SimCExprParser.expression`.
   * @param ctx the parse tree
   */
  enterUnaryExpr?: (ctx: UnaryExprContext) => void;
  /**
   * Enter a parse tree produced by the `xorExpr`
   * labeled alternative in `SimCExprParser.expression`.
   * @param ctx the parse tree
   */
  enterXorExpr?: (ctx: XorExprContext) => void;

  /**
   * Exit a parse tree produced by the `accessExpr`
   * labeled alternative in `SimCExprParser.expression`.
   * @param ctx the parse tree
   */
  exitAccessExpr?: (ctx: AccessExprContext) => void;
  /**
   * Exit a parse tree produced by `SimCExprParser.accessPattern`.
   * @param ctx the parse tree
   */
  exitAccessPattern?: (ctx: AccessPatternContext) => void;

  /**
   * Exit a parse tree produced by `SimCExprParser.actionLine`.
   * @param ctx the parse tree
   */
  exitActionLine?: (ctx: ActionLineContext) => void;
  /**
   * Exit a parse tree produced by `SimCExprParser.actionName`.
   * @param ctx the parse tree
   */
  exitActionName?: (ctx: ActionNameContext) => void;

  /**
   * Exit a parse tree produced by `SimCExprParser.actionParam`.
   * @param ctx the parse tree
   */
  exitActionParam?: (ctx: ActionParamContext) => void;
  /**
   * Exit a parse tree produced by the `additiveExpr`
   * labeled alternative in `SimCExprParser.expression`.
   * @param ctx the parse tree
   */
  exitAdditiveExpr?: (ctx: AdditiveExprContext) => void;

  /**
   * Exit a parse tree produced by the `andExpr`
   * labeled alternative in `SimCExprParser.expression`.
   * @param ctx the parse tree
   */
  exitAndExpr?: (ctx: AndExprContext) => void;
  /**
   * Exit a parse tree produced by the `anyTokenExpr`
   * labeled alternative in `SimCExprParser.expression`.
   * @param ctx the parse tree
   */
  exitAnyTokenExpr?: (ctx: AnyTokenExprContext) => void;

  /**
   * Exit a parse tree produced by `SimCExprParser.commentLine`.
   * @param ctx the parse tree
   */
  exitCommentLine?: (ctx: CommentLineContext) => void;
  /**
   * Exit a parse tree produced by the `comparisonExpr`
   * labeled alternative in `SimCExprParser.expression`.
   * @param ctx the parse tree
   */
  exitComparisonExpr?: (ctx: ComparisonExprContext) => void;

  /**
   * Exit a parse tree produced by `SimCExprParser.expression`.
   * @param ctx the parse tree
   */
  exitExpression?: (ctx: ExpressionContext) => void;
  /**
   * Exit a parse tree produced by `SimCExprParser.identifier`.
   * @param ctx the parse tree
   */
  exitIdentifier?: (ctx: IdentifierContext) => void;

  /**
   * Exit a parse tree produced by the `mathFuncExpr`
   * labeled alternative in `SimCExprParser.expression`.
   * @param ctx the parse tree
   */
  exitMathFuncExpr?: (ctx: MathFuncExprContext) => void;
  /**
   * Exit a parse tree produced by the `minMaxExpr`
   * labeled alternative in `SimCExprParser.expression`.
   * @param ctx the parse tree
   */
  exitMinMaxExpr?: (ctx: MinMaxExprContext) => void;

  /**
   * Exit a parse tree produced by the `mixedIdExpr`
   * labeled alternative in `SimCExprParser.expression`.
   * @param ctx the parse tree
   */
  exitMixedIdExpr?: (ctx: MixedIdExprContext) => void;
  /**
   * Exit a parse tree produced by the `multiplicativeExpr`
   * labeled alternative in `SimCExprParser.expression`.
   * @param ctx the parse tree
   */
  exitMultiplicativeExpr?: (ctx: MultiplicativeExprContext) => void;

  /**
   * Exit a parse tree produced by the `numberExpr`
   * labeled alternative in `SimCExprParser.expression`.
   * @param ctx the parse tree
   */
  exitNumberExpr?: (ctx: NumberExprContext) => void;
  /**
   * Exit a parse tree produced by the `orExpr`
   * labeled alternative in `SimCExprParser.expression`.
   * @param ctx the parse tree
   */
  exitOrExpr?: (ctx: OrExprContext) => void;

  /**
   * Exit a parse tree produced by the `parenExpr`
   * labeled alternative in `SimCExprParser.expression`.
   * @param ctx the parse tree
   */
  exitParenExpr?: (ctx: ParenExprContext) => void;
  /**
   * Exit a parse tree produced by `SimCExprParser.parse`.
   * @param ctx the parse tree
   */
  exitParse?: (ctx: ParseContext) => void;

  /**
   * Exit a parse tree produced by the `stringExpr`
   * labeled alternative in `SimCExprParser.expression`.
   * @param ctx the parse tree
   */
  exitStringExpr?: (ctx: StringExprContext) => void;
  /**
   * Exit a parse tree produced by `SimCExprParser.sublistName`.
   * @param ctx the parse tree
   */
  exitSublistName?: (ctx: SublistNameContext) => void;

  /**
   * Exit a parse tree produced by the `unaryExpr`
   * labeled alternative in `SimCExprParser.expression`.
   * @param ctx the parse tree
   */
  exitUnaryExpr?: (ctx: UnaryExprContext) => void;
  /**
   * Exit a parse tree produced by the `xorExpr`
   * labeled alternative in `SimCExprParser.expression`.
   * @param ctx the parse tree
   */
  exitXorExpr?: (ctx: XorExprContext) => void;
}
