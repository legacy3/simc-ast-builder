// Generated from ./src/parser/antlr4/SimCExpr.g4 by ANTLR 4.9.0-SNAPSHOT

import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { NotNull } from "antlr4ts/Decorators";
import { Override } from "antlr4ts/Decorators";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import * as Utils from "antlr4ts/misc/Utils";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import { SimCExprListener } from "./SimCExprListener";
import { SimCExprVisitor } from "./SimCExprVisitor";

export class ExpressionContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return SimCExprParser.RULE_expression;
  }
  public copyFrom(ctx: ExpressionContext): void {
    super.copyFrom(ctx);
  }
}

export class AccessExprContext extends ExpressionContext {
  constructor(ctx: ExpressionContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }
  // @Override
  public accept<Result>(visitor: SimCExprVisitor<Result>): Result {
    if (visitor.visitAccessExpr) {
      return visitor.visitAccessExpr(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
  public accessPattern(): AccessPatternContext {
    return this.getRuleContext(0, AccessPatternContext);
  }
  // @Override
  public enterRule(listener: SimCExprListener): void {
    if (listener.enterAccessExpr) {
      listener.enterAccessExpr(this);
    }
  }
  // @Override
  public exitRule(listener: SimCExprListener): void {
    if (listener.exitAccessExpr) {
      listener.exitAccessExpr(this);
    }
  }
}

export class AccessPatternContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return SimCExprParser.RULE_accessPattern;
  }
  // @Override
  public accept<Result>(visitor: SimCExprVisitor<Result>): Result {
    if (visitor.visitAccessPattern) {
      return visitor.visitAccessPattern(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
  // @Override
  public enterRule(listener: SimCExprListener): void {
    if (listener.enterAccessPattern) {
      listener.enterAccessPattern(this);
    }
  }
  // @Override
  public exitRule(listener: SimCExprListener): void {
    if (listener.exitAccessPattern) {
      listener.exitAccessPattern(this);
    }
  }
  public identifier(): IdentifierContext[];
  public identifier(i: number): IdentifierContext;
  public identifier(i?: number): IdentifierContext | IdentifierContext[] {
    if (i === undefined) {
      return this.getRuleContexts(IdentifierContext);
    } else {
      return this.getRuleContext(i, IdentifierContext);
    }
  }
}

export class ActionLineContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return SimCExprParser.RULE_actionLine;
  }
  // @Override
  public accept<Result>(visitor: SimCExprVisitor<Result>): Result {
    if (visitor.visitActionLine) {
      return visitor.visitActionLine(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
  public actionName(): ActionNameContext {
    return this.getRuleContext(0, ActionNameContext);
  }
  public actionParam(): ActionParamContext[];
  public actionParam(i: number): ActionParamContext;
  public actionParam(i?: number): ActionParamContext | ActionParamContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ActionParamContext);
    } else {
      return this.getRuleContext(i, ActionParamContext);
    }
  }
  // @Override
  public enterRule(listener: SimCExprListener): void {
    if (listener.enterActionLine) {
      listener.enterActionLine(this);
    }
  }
  // @Override
  public exitRule(listener: SimCExprListener): void {
    if (listener.exitActionLine) {
      listener.exitActionLine(this);
    }
  }
  public OP_EQ(): TerminalNode {
    return this.getToken(SimCExprParser.OP_EQ, 0);
  }
  public sublistName(): SublistNameContext | undefined {
    return this.tryGetRuleContext(0, SublistNameContext);
  }
}

export class ActionNameContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return SimCExprParser.RULE_actionName;
  }
  // @Override
  public accept<Result>(visitor: SimCExprVisitor<Result>): Result {
    if (visitor.visitActionName) {
      return visitor.visitActionName(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
  // @Override
  public enterRule(listener: SimCExprListener): void {
    if (listener.enterActionName) {
      listener.enterActionName(this);
    }
  }
  // @Override
  public exitRule(listener: SimCExprListener): void {
    if (listener.exitActionName) {
      listener.exitActionName(this);
    }
  }
  public identifier(): IdentifierContext {
    return this.getRuleContext(0, IdentifierContext);
  }
}

export class ActionParamContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return SimCExprParser.RULE_actionParam;
  }
  // @Override
  public accept<Result>(visitor: SimCExprVisitor<Result>): Result {
    if (visitor.visitActionParam) {
      return visitor.visitActionParam(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
  // @Override
  public enterRule(listener: SimCExprListener): void {
    if (listener.enterActionParam) {
      listener.enterActionParam(this);
    }
  }
  // @Override
  public exitRule(listener: SimCExprListener): void {
    if (listener.exitActionParam) {
      listener.exitActionParam(this);
    }
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }
  public identifier(): IdentifierContext {
    return this.getRuleContext(0, IdentifierContext);
  }
  public OP_EQ(): TerminalNode {
    return this.getToken(SimCExprParser.OP_EQ, 0);
  }
}

export class AdditiveExprContext extends ExpressionContext {
  constructor(ctx: ExpressionContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }
  // @Override
  public accept<Result>(visitor: SimCExprVisitor<Result>): Result {
    if (visitor.visitAdditiveExpr) {
      return visitor.visitAdditiveExpr(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
  // @Override
  public enterRule(listener: SimCExprListener): void {
    if (listener.enterAdditiveExpr) {
      listener.enterAdditiveExpr(this);
    }
  }
  // @Override
  public exitRule(listener: SimCExprListener): void {
    if (listener.exitAdditiveExpr) {
      listener.exitAdditiveExpr(this);
    }
  }
  public expression(): ExpressionContext[];
  public expression(i: number): ExpressionContext;
  public expression(i?: number): ExpressionContext | ExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ExpressionContext);
    } else {
      return this.getRuleContext(i, ExpressionContext);
    }
  }
  public OP_MINUS(): TerminalNode | undefined {
    return this.tryGetToken(SimCExprParser.OP_MINUS, 0);
  }
  public OP_PLUS(): TerminalNode | undefined {
    return this.tryGetToken(SimCExprParser.OP_PLUS, 0);
  }
}

export class AndExprContext extends ExpressionContext {
  constructor(ctx: ExpressionContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }
  // @Override
  public accept<Result>(visitor: SimCExprVisitor<Result>): Result {
    if (visitor.visitAndExpr) {
      return visitor.visitAndExpr(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
  // @Override
  public enterRule(listener: SimCExprListener): void {
    if (listener.enterAndExpr) {
      listener.enterAndExpr(this);
    }
  }
  // @Override
  public exitRule(listener: SimCExprListener): void {
    if (listener.exitAndExpr) {
      listener.exitAndExpr(this);
    }
  }
  public expression(): ExpressionContext[];
  public expression(i: number): ExpressionContext;
  public expression(i?: number): ExpressionContext | ExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ExpressionContext);
    } else {
      return this.getRuleContext(i, ExpressionContext);
    }
  }
  public OP_AND(): TerminalNode {
    return this.getToken(SimCExprParser.OP_AND, 0);
  }
}

export class AnyTokenExprContext extends ExpressionContext {
  constructor(ctx: ExpressionContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }
  // @Override
  public accept<Result>(visitor: SimCExprVisitor<Result>): Result {
    if (visitor.visitAnyTokenExpr) {
      return visitor.visitAnyTokenExpr(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
  // @Override
  public enterRule(listener: SimCExprListener): void {
    if (listener.enterAnyTokenExpr) {
      listener.enterAnyTokenExpr(this);
    }
  }
  // @Override
  public exitRule(listener: SimCExprListener): void {
    if (listener.exitAnyTokenExpr) {
      listener.exitAnyTokenExpr(this);
    }
  }
}

export class CommentLineContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return SimCExprParser.RULE_commentLine;
  }
  // @Override
  public accept<Result>(visitor: SimCExprVisitor<Result>): Result {
    if (visitor.visitCommentLine) {
      return visitor.visitCommentLine(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
  public COMMENT(): TerminalNode {
    return this.getToken(SimCExprParser.COMMENT, 0);
  }
  // @Override
  public enterRule(listener: SimCExprListener): void {
    if (listener.enterCommentLine) {
      listener.enterCommentLine(this);
    }
  }
  // @Override
  public exitRule(listener: SimCExprListener): void {
    if (listener.exitCommentLine) {
      listener.exitCommentLine(this);
    }
  }
}
export class ComparisonExprContext extends ExpressionContext {
  constructor(ctx: ExpressionContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }
  // @Override
  public accept<Result>(visitor: SimCExprVisitor<Result>): Result {
    if (visitor.visitComparisonExpr) {
      return visitor.visitComparisonExpr(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
  // @Override
  public enterRule(listener: SimCExprListener): void {
    if (listener.enterComparisonExpr) {
      listener.enterComparisonExpr(this);
    }
  }
  // @Override
  public exitRule(listener: SimCExprListener): void {
    if (listener.exitComparisonExpr) {
      listener.exitComparisonExpr(this);
    }
  }
  public expression(): ExpressionContext[];
  public expression(i: number): ExpressionContext;
  public expression(i?: number): ExpressionContext | ExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ExpressionContext);
    } else {
      return this.getRuleContext(i, ExpressionContext);
    }
  }
  public OP_EQ(): TerminalNode | undefined {
    return this.tryGetToken(SimCExprParser.OP_EQ, 0);
  }
  public OP_EQEQ(): TerminalNode | undefined {
    return this.tryGetToken(SimCExprParser.OP_EQEQ, 0);
  }
  public OP_GE(): TerminalNode | undefined {
    return this.tryGetToken(SimCExprParser.OP_GE, 0);
  }
  public OP_GT(): TerminalNode | undefined {
    return this.tryGetToken(SimCExprParser.OP_GT, 0);
  }
  public OP_LE(): TerminalNode | undefined {
    return this.tryGetToken(SimCExprParser.OP_LE, 0);
  }
  public OP_LT(): TerminalNode | undefined {
    return this.tryGetToken(SimCExprParser.OP_LT, 0);
  }
  public OP_NE(): TerminalNode | undefined {
    return this.tryGetToken(SimCExprParser.OP_NE, 0);
  }
}
export class IdentifierContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return SimCExprParser.RULE_identifier;
  }
  // @Override
  public accept<Result>(visitor: SimCExprVisitor<Result>): Result {
    if (visitor.visitIdentifier) {
      return visitor.visitIdentifier(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
  // @Override
  public enterRule(listener: SimCExprListener): void {
    if (listener.enterIdentifier) {
      listener.enterIdentifier(this);
    }
  }
  // @Override
  public exitRule(listener: SimCExprListener): void {
    if (listener.exitIdentifier) {
      listener.exitIdentifier(this);
    }
  }
  public MIXED_ID(): TerminalNode | undefined {
    return this.tryGetToken(SimCExprParser.MIXED_ID, 0);
  }
  public NUMBER(): TerminalNode | undefined {
    return this.tryGetToken(SimCExprParser.NUMBER, 0);
  }
  public STRING(): TerminalNode | undefined {
    return this.tryGetToken(SimCExprParser.STRING, 0);
  }
}
export class MathFuncExprContext extends ExpressionContext {
  constructor(ctx: ExpressionContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }
  // @Override
  public accept<Result>(visitor: SimCExprVisitor<Result>): Result {
    if (visitor.visitMathFuncExpr) {
      return visitor.visitMathFuncExpr(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
  // @Override
  public enterRule(listener: SimCExprListener): void {
    if (listener.enterMathFuncExpr) {
      listener.enterMathFuncExpr(this);
    }
  }
  // @Override
  public exitRule(listener: SimCExprListener): void {
    if (listener.exitMathFuncExpr) {
      listener.exitMathFuncExpr(this);
    }
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }
  public OP_CEIL(): TerminalNode | undefined {
    return this.tryGetToken(SimCExprParser.OP_CEIL, 0);
  }
  public OP_FLOOR(): TerminalNode | undefined {
    return this.tryGetToken(SimCExprParser.OP_FLOOR, 0);
  }
  public OP_PAREN_LEFT(): TerminalNode {
    return this.getToken(SimCExprParser.OP_PAREN_LEFT, 0);
  }
  public OP_PAREN_RIGHT(): TerminalNode {
    return this.getToken(SimCExprParser.OP_PAREN_RIGHT, 0);
  }
}
export class MinMaxExprContext extends ExpressionContext {
  constructor(ctx: ExpressionContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }
  // @Override
  public accept<Result>(visitor: SimCExprVisitor<Result>): Result {
    if (visitor.visitMinMaxExpr) {
      return visitor.visitMinMaxExpr(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
  // @Override
  public enterRule(listener: SimCExprListener): void {
    if (listener.enterMinMaxExpr) {
      listener.enterMinMaxExpr(this);
    }
  }
  // @Override
  public exitRule(listener: SimCExprListener): void {
    if (listener.exitMinMaxExpr) {
      listener.exitMinMaxExpr(this);
    }
  }
  public expression(): ExpressionContext[];
  public expression(i: number): ExpressionContext;
  public expression(i?: number): ExpressionContext | ExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ExpressionContext);
    } else {
      return this.getRuleContext(i, ExpressionContext);
    }
  }
  public OP_MAX(): TerminalNode | undefined {
    return this.tryGetToken(SimCExprParser.OP_MAX, 0);
  }
  public OP_MIN(): TerminalNode | undefined {
    return this.tryGetToken(SimCExprParser.OP_MIN, 0);
  }
}
export class MixedIdExprContext extends ExpressionContext {
  constructor(ctx: ExpressionContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }
  // @Override
  public accept<Result>(visitor: SimCExprVisitor<Result>): Result {
    if (visitor.visitMixedIdExpr) {
      return visitor.visitMixedIdExpr(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
  // @Override
  public enterRule(listener: SimCExprListener): void {
    if (listener.enterMixedIdExpr) {
      listener.enterMixedIdExpr(this);
    }
  }
  // @Override
  public exitRule(listener: SimCExprListener): void {
    if (listener.exitMixedIdExpr) {
      listener.exitMixedIdExpr(this);
    }
  }
  public MIXED_ID(): TerminalNode {
    return this.getToken(SimCExprParser.MIXED_ID, 0);
  }
}
export class MultiplicativeExprContext extends ExpressionContext {
  constructor(ctx: ExpressionContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }
  // @Override
  public accept<Result>(visitor: SimCExprVisitor<Result>): Result {
    if (visitor.visitMultiplicativeExpr) {
      return visitor.visitMultiplicativeExpr(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
  // @Override
  public enterRule(listener: SimCExprListener): void {
    if (listener.enterMultiplicativeExpr) {
      listener.enterMultiplicativeExpr(this);
    }
  }
  // @Override
  public exitRule(listener: SimCExprListener): void {
    if (listener.exitMultiplicativeExpr) {
      listener.exitMultiplicativeExpr(this);
    }
  }
  public expression(): ExpressionContext[];
  public expression(i: number): ExpressionContext;
  public expression(i?: number): ExpressionContext | ExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ExpressionContext);
    } else {
      return this.getRuleContext(i, ExpressionContext);
    }
  }
  public OP_DIV(): TerminalNode | undefined {
    return this.tryGetToken(SimCExprParser.OP_DIV, 0);
  }
  public OP_MOD(): TerminalNode | undefined {
    return this.tryGetToken(SimCExprParser.OP_MOD, 0);
  }
  public OP_MUL(): TerminalNode | undefined {
    return this.tryGetToken(SimCExprParser.OP_MUL, 0);
  }
}
export class NumberExprContext extends ExpressionContext {
  constructor(ctx: ExpressionContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }
  // @Override
  public accept<Result>(visitor: SimCExprVisitor<Result>): Result {
    if (visitor.visitNumberExpr) {
      return visitor.visitNumberExpr(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
  // @Override
  public enterRule(listener: SimCExprListener): void {
    if (listener.enterNumberExpr) {
      listener.enterNumberExpr(this);
    }
  }
  // @Override
  public exitRule(listener: SimCExprListener): void {
    if (listener.exitNumberExpr) {
      listener.exitNumberExpr(this);
    }
  }
  public NUMBER(): TerminalNode {
    return this.getToken(SimCExprParser.NUMBER, 0);
  }
}
export class OrExprContext extends ExpressionContext {
  constructor(ctx: ExpressionContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }
  // @Override
  public accept<Result>(visitor: SimCExprVisitor<Result>): Result {
    if (visitor.visitOrExpr) {
      return visitor.visitOrExpr(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
  // @Override
  public enterRule(listener: SimCExprListener): void {
    if (listener.enterOrExpr) {
      listener.enterOrExpr(this);
    }
  }
  // @Override
  public exitRule(listener: SimCExprListener): void {
    if (listener.exitOrExpr) {
      listener.exitOrExpr(this);
    }
  }
  public expression(): ExpressionContext[];
  public expression(i: number): ExpressionContext;
  public expression(i?: number): ExpressionContext | ExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ExpressionContext);
    } else {
      return this.getRuleContext(i, ExpressionContext);
    }
  }
  public OP_OR(): TerminalNode {
    return this.getToken(SimCExprParser.OP_OR, 0);
  }
}
export class ParenExprContext extends ExpressionContext {
  constructor(ctx: ExpressionContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }
  // @Override
  public accept<Result>(visitor: SimCExprVisitor<Result>): Result {
    if (visitor.visitParenExpr) {
      return visitor.visitParenExpr(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
  // @Override
  public enterRule(listener: SimCExprListener): void {
    if (listener.enterParenExpr) {
      listener.enterParenExpr(this);
    }
  }
  // @Override
  public exitRule(listener: SimCExprListener): void {
    if (listener.exitParenExpr) {
      listener.exitParenExpr(this);
    }
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }
  public OP_PAREN_LEFT(): TerminalNode {
    return this.getToken(SimCExprParser.OP_PAREN_LEFT, 0);
  }
  public OP_PAREN_RIGHT(): TerminalNode {
    return this.getToken(SimCExprParser.OP_PAREN_RIGHT, 0);
  }
}
export class ParseContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return SimCExprParser.RULE_parse;
  }
  // @Override
  public accept<Result>(visitor: SimCExprVisitor<Result>): Result {
    if (visitor.visitParse) {
      return visitor.visitParse(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
  public actionLine(): ActionLineContext | undefined {
    return this.tryGetRuleContext(0, ActionLineContext);
  }
  public commentLine(): CommentLineContext | undefined {
    return this.tryGetRuleContext(0, CommentLineContext);
  }
  // @Override
  public enterRule(listener: SimCExprListener): void {
    if (listener.enterParse) {
      listener.enterParse(this);
    }
  }
  public EOF(): TerminalNode {
    return this.getToken(SimCExprParser.EOF, 0);
  }
  // @Override
  public exitRule(listener: SimCExprListener): void {
    if (listener.exitParse) {
      listener.exitParse(this);
    }
  }
  public expression(): ExpressionContext | undefined {
    return this.tryGetRuleContext(0, ExpressionContext);
  }
}
export class SimCExprParser extends Parser {
  public static __ATN: ATN;
  private static readonly _LITERAL_NAMES: Array<string | undefined> = [
    undefined,
    "'actions'",
    "'.'",
    "'+='",
    "'/'",
    "','",
    "'&'",
    "'|'",
    "'^'",
    "'!'",
    "'+'",
    "'-'",
    "'*'",
    "'%'",
    "'%%'",
    "'@'",
    "'ceil'",
    "'floor'",
    "'>'",
    "'>='",
    "'<'",
    "'<='",
    "'='",
    "'=='",
    "'!='",
    "'<?'",
    "'>?'",
    "'('",
    "')'",
  ];
  public static readonly _serializedATN: string =
    "\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03#r\x04\x02\t\x02" +
    "\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07\t\x07" +
    "\x04\b\t\b\x04\t\t\t\x04\n\t\n\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02" +
    "\x03\x02\x03\x02\x03\x02\x03\x02\x05\x02\x1E\n\x02\x03\x03\x03\x03\x03" +
    "\x04\x03\x04\x03\x04\x05\x04%\n\x04\x03\x04\x03\x04\x05\x04)\n\x04\x03" +
    "\x04\x03\x04\x03\x04\x07\x04.\n\x04\f\x04\x0E\x041\v\x04\x03\x05\x03\x05" +
    "\x03\x05\x03\x05\x03\x06\x03\x06\x03\x07\x03\x07\x03\b\x03\b\x03\t\x03" +
    "\t\x03\t\x07\t@\n\t\f\t\x0E\tC\v\t\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n" +
    "\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x05" +
    "\nV\n\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03" +
    "\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x07\nm" +
    "\n\n\f\n\x0E\np\v\n\x03\n\x02\x02\x03\x12\v\x02\x02\x04\x02\x06\x02\b" +
    "\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x02\n\x04\x02\x05\x05\x18\x18" +
    "\x03\x02\x1F!\x03\x02\x12\x13\x04\x02\v\r\x11\x11\x03\x02\x0E\x10\x03" +
    "\x02\f\r\x03\x02\x1B\x1C\x03\x02\x14\x1A\x02|\x02\x1D\x03\x02\x02\x02" +
    "\x04\x1F\x03\x02\x02\x02\x06!\x03\x02\x02\x02\b2\x03\x02\x02\x02\n6\x03" +
    "\x02\x02\x02\f8\x03\x02\x02\x02\x0E:\x03\x02\x02\x02\x10<\x03\x02\x02" +
    "\x02\x12U\x03\x02\x02\x02\x14\x15\x05\x06\x04\x02\x15\x16\x07\x02\x02" +
    "\x03\x16\x1E\x03\x02\x02\x02\x17\x18\x05\x04\x03\x02\x18\x19\x07\x02\x02" +
    "\x03\x19\x1E\x03\x02\x02\x02\x1A\x1B\x05\x12\n\x02\x1B\x1C\x07\x02\x02" +
    "\x03\x1C\x1E\x03\x02\x02\x02\x1D\x14\x03\x02\x02\x02\x1D\x17\x03\x02\x02" +
    '\x02\x1D\x1A\x03\x02\x02\x02\x1E\x03\x03\x02\x02\x02\x1F \x07"\x02\x02' +
    ' \x05\x03\x02\x02\x02!$\x07\x03\x02\x02"#\x07\x04\x02\x02#%\x05\x0E\b' +
    '\x02$"\x03\x02\x02\x02$%\x03\x02\x02\x02%&\x03\x02\x02\x02&(\t\x02\x02' +
    "\x02\')\x07\x06\x02\x02(\'\x03\x02\x02\x02()\x03\x02\x02\x02)*\x03\x02" +
    "\x02\x02*/\x05\f\x07\x02+,\x07\x07\x02\x02,.\x05\b\x05\x02-+\x03\x02\x02" +
    "\x02.1\x03\x02\x02\x02/-\x03\x02\x02\x02/0\x03\x02\x02\x020\x07\x03\x02" +
    "\x02\x021/\x03\x02\x02\x0223\x05\n\x06\x0234\x07\x18\x02\x0245\x05\x12" +
    "\n\x025\t\x03\x02\x02\x0267\t\x03\x02\x027\v\x03\x02\x02\x0289\x05\n\x06" +
    "\x029\r\x03\x02\x02\x02:;\x05\n\x06\x02;\x0F\x03\x02\x02\x02<A\x05\n\x06" +
    "\x02=>\x07\x04\x02\x02>@\x05\n\x06\x02?=\x03\x02\x02\x02@C\x03\x02\x02" +
    "\x02A?\x03\x02\x02\x02AB\x03\x02\x02\x02B\x11\x03\x02\x02\x02CA\x03\x02" +
    "\x02\x02DE\b\n\x01\x02EF\x07\x1D\x02\x02FG\x05\x12\n\x02GH\x07\x1E\x02" +
    "\x02HV\x03\x02\x02\x02IJ\t\x04\x02\x02JK\x07\x1D\x02\x02KL\x05\x12\n\x02" +
    "LM\x07\x1E\x02\x02MV\x03\x02\x02\x02NO\t\x05\x02\x02OV\x05\x12\n\x0FP" +
    "V\x07\x1F\x02\x02QV\x07!\x02\x02RV\x07 \x02\x02SV\x05\x10\t\x02TV\v\x02" +
    "\x02\x02UD\x03\x02\x02\x02UI\x03\x02\x02\x02UN\x03\x02\x02\x02UP\x03\x02" +
    "\x02\x02UQ\x03\x02\x02\x02UR\x03\x02\x02\x02US\x03\x02\x02\x02UT\x03\x02" +
    "\x02\x02Vn\x03\x02\x02\x02WX\f\x0E\x02\x02XY\t\x06\x02\x02Ym\x05\x12\n" +
    "\x0FZ[\f\r\x02\x02[\\\t\x07\x02\x02\\m\x05\x12\n\x0E]^\f\f\x02\x02^_\t" +
    "\b\x02\x02_m\x05\x12\n\r`a\f\v\x02\x02ab\t\t\x02\x02bm\x05\x12\n\fcd\f" +
    "\n\x02\x02de\x07\b\x02\x02em\x05\x12\n\vfg\f\t\x02\x02gh\x07\n\x02\x02" +
    "hm\x05\x12\n\nij\f\b\x02\x02jk\x07\t\x02\x02km\x05\x12\n\tlW\x03\x02\x02" +
    "\x02lZ\x03\x02\x02\x02l]\x03\x02\x02\x02l`\x03\x02\x02\x02lc\x03\x02\x02" +
    "\x02lf\x03\x02\x02\x02li\x03\x02\x02\x02mp\x03\x02\x02\x02nl\x03\x02\x02" +
    "\x02no\x03\x02\x02\x02o\x13\x03\x02\x02\x02pn\x03\x02\x02\x02\n\x1D$(" +
    "/AUln";
  private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    "OP_AND",
    "OP_OR",
    "OP_XOR",
    "OP_NOT",
    "OP_PLUS",
    "OP_MINUS",
    "OP_MUL",
    "OP_DIV",
    "OP_MOD",
    "OP_ABS",
    "OP_CEIL",
    "OP_FLOOR",
    "OP_GT",
    "OP_GE",
    "OP_LT",
    "OP_LE",
    "OP_EQ",
    "OP_EQEQ",
    "OP_NE",
    "OP_MAX",
    "OP_MIN",
    "OP_PAREN_LEFT",
    "OP_PAREN_RIGHT",
    "NUMBER",
    "MIXED_ID",
    "STRING",
    "COMMENT",
    "WS",
  ];
  public static readonly COMMENT = 32;
  public static readonly MIXED_ID = 30;
  public static readonly NUMBER = 29;
  public static readonly OP_ABS = 15;
  public static readonly OP_AND = 6;
  public static readonly OP_CEIL = 16;
  public static readonly OP_DIV = 13;
  public static readonly OP_EQ = 22;
  public static readonly OP_EQEQ = 23;
  public static readonly OP_FLOOR = 17;
  public static readonly OP_GE = 19;
  public static readonly OP_GT = 18;
  public static readonly OP_LE = 21;
  public static readonly OP_LT = 20;
  public static readonly OP_MAX = 25;
  public static readonly OP_MIN = 26;
  public static readonly OP_MINUS = 11;
  public static readonly OP_MOD = 14;
  public static readonly OP_MUL = 12;
  public static readonly OP_NE = 24;
  public static readonly OP_NOT = 9;
  public static readonly OP_OR = 7;
  public static readonly OP_PAREN_LEFT = 27;
  public static readonly OP_PAREN_RIGHT = 28;
  public static readonly OP_PLUS = 10;
  public static readonly OP_XOR = 8;
  public static readonly RULE_accessPattern = 7;
  public static readonly RULE_actionLine = 2;
  public static readonly RULE_actionName = 5;
  public static readonly RULE_actionParam = 3;
  public static readonly RULE_commentLine = 1;
  public static readonly RULE_expression = 8;
  public static readonly RULE_identifier = 4;
  public static readonly RULE_parse = 0;
  public static readonly RULE_sublistName = 6;
  // tslint:disable:no-trailing-whitespace
  public static readonly ruleNames: string[] = [
    "parse",
    "commentLine",
    "actionLine",
    "actionParam",
    "identifier",
    "actionName",
    "sublistName",
    "accessPattern",
    "expression",
  ];
  public static readonly STRING = 31;
  public static readonly T__0 = 1;
  public static readonly T__1 = 2;

  public static readonly T__2 = 3;
  public static readonly T__3 = 4;
  public static readonly T__4 = 5;

  public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(
    SimCExprParser._LITERAL_NAMES,
    SimCExprParser._SYMBOLIC_NAMES,
    [],
  );
  // tslint:enable:no-trailing-whitespace

  public static readonly WS = 33;

  public static get _ATN(): ATN {
    if (!SimCExprParser.__ATN) {
      SimCExprParser.__ATN = new ATNDeserializer().deserialize(
        Utils.toCharArray(SimCExprParser._serializedATN),
      );
    }

    return SimCExprParser.__ATN;
  }

  constructor(input: TokenStream) {
    super(input);
    this._interp = new ParserATNSimulator(SimCExprParser._ATN, this);
  }

  // @Override
  public get grammarFileName(): string {
    return "SimCExpr.g4";
  }

  // @Override
  public get ruleNames(): string[] {
    return SimCExprParser.ruleNames;
  }
  // @Override
  public get serializedATN(): string {
    return SimCExprParser._serializedATN;
  }
  // @Override
  // @NotNull
  public get vocabulary(): Vocabulary {
    return SimCExprParser.VOCABULARY;
  }
  // @RuleVersion(0)
  public accessPattern(): AccessPatternContext {
    let _localctx: AccessPatternContext = new AccessPatternContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 14, SimCExprParser.RULE_accessPattern);
    try {
      let _alt: number;
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 58;
        this.identifier();
        this.state = 63;
        this._errHandler.sync(this);
        _alt = this.interpreter.adaptivePredict(this._input, 4, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            {
              {
                this.state = 59;
                this.match(SimCExprParser.T__1);
                this.state = 60;
                this.identifier();
              }
            }
          }
          this.state = 65;
          this._errHandler.sync(this);
          _alt = this.interpreter.adaptivePredict(this._input, 4, this._ctx);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public actionLine(): ActionLineContext {
    let _localctx: ActionLineContext = new ActionLineContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 4, SimCExprParser.RULE_actionLine);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 31;
        this.match(SimCExprParser.T__0);
        this.state = 34;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === SimCExprParser.T__1) {
          {
            this.state = 32;
            this.match(SimCExprParser.T__1);
            this.state = 33;
            this.sublistName();
          }
        }

        this.state = 36;
        _la = this._input.LA(1);
        if (!(_la === SimCExprParser.T__2 || _la === SimCExprParser.OP_EQ)) {
          this._errHandler.recoverInline(this);
        } else {
          if (this._input.LA(1) === Token.EOF) {
            this.matchedEOF = true;
          }

          this._errHandler.reportMatch(this);
          this.consume();
        }
        this.state = 38;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === SimCExprParser.T__3) {
          {
            this.state = 37;
            this.match(SimCExprParser.T__3);
          }
        }

        this.state = 40;
        this.actionName();
        this.state = 45;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === SimCExprParser.T__4) {
          {
            {
              this.state = 41;
              this.match(SimCExprParser.T__4);
              this.state = 42;
              this.actionParam();
            }
          }
          this.state = 47;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public actionName(): ActionNameContext {
    let _localctx: ActionNameContext = new ActionNameContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 10, SimCExprParser.RULE_actionName);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 54;
        this.identifier();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public actionParam(): ActionParamContext {
    let _localctx: ActionParamContext = new ActionParamContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 6, SimCExprParser.RULE_actionParam);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 48;
        this.identifier();
        this.state = 49;
        this.match(SimCExprParser.OP_EQ);
        this.state = 50;
        this.expression(0);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public commentLine(): CommentLineContext {
    let _localctx: CommentLineContext = new CommentLineContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 2, SimCExprParser.RULE_commentLine);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 29;
        this.match(SimCExprParser.COMMENT);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  public expression(): ExpressionContext;
  public expression(_p: number): ExpressionContext;
  // @RuleVersion(0)
  public expression(_p?: number): ExpressionContext {
    if (_p === undefined) {
      _p = 0;
    }

    let _parentctx: ParserRuleContext = this._ctx;
    let _parentState: number = this.state;
    let _localctx: ExpressionContext = new ExpressionContext(
      this._ctx,
      _parentState,
    );
    let _prevctx: ExpressionContext = _localctx;
    let _startState: number = 16;
    this.enterRecursionRule(_localctx, 16, SimCExprParser.RULE_expression, _p);
    let _la: number;
    try {
      let _alt: number;
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 83;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 5, this._ctx)) {
          case 1:
            {
              _localctx = new ParenExprContext(_localctx);
              this._ctx = _localctx;
              _prevctx = _localctx;

              this.state = 67;
              this.match(SimCExprParser.OP_PAREN_LEFT);
              this.state = 68;
              this.expression(0);
              this.state = 69;
              this.match(SimCExprParser.OP_PAREN_RIGHT);
            }
            break;

          case 2:
            {
              _localctx = new MathFuncExprContext(_localctx);
              this._ctx = _localctx;
              _prevctx = _localctx;
              this.state = 71;
              _la = this._input.LA(1);
              if (
                !(
                  _la === SimCExprParser.OP_CEIL ||
                  _la === SimCExprParser.OP_FLOOR
                )
              ) {
                this._errHandler.recoverInline(this);
              } else {
                if (this._input.LA(1) === Token.EOF) {
                  this.matchedEOF = true;
                }

                this._errHandler.reportMatch(this);
                this.consume();
              }
              this.state = 72;
              this.match(SimCExprParser.OP_PAREN_LEFT);
              this.state = 73;
              this.expression(0);
              this.state = 74;
              this.match(SimCExprParser.OP_PAREN_RIGHT);
            }
            break;

          case 3:
            {
              _localctx = new UnaryExprContext(_localctx);
              this._ctx = _localctx;
              _prevctx = _localctx;
              this.state = 76;
              _la = this._input.LA(1);
              if (
                !(
                  (_la & ~0x1f) === 0 &&
                  ((1 << _la) &
                    ((1 << SimCExprParser.OP_NOT) |
                      (1 << SimCExprParser.OP_PLUS) |
                      (1 << SimCExprParser.OP_MINUS) |
                      (1 << SimCExprParser.OP_ABS))) !==
                    0
                )
              ) {
                this._errHandler.recoverInline(this);
              } else {
                if (this._input.LA(1) === Token.EOF) {
                  this.matchedEOF = true;
                }

                this._errHandler.reportMatch(this);
                this.consume();
              }
              this.state = 77;
              this.expression(13);
            }
            break;

          case 4:
            {
              _localctx = new NumberExprContext(_localctx);
              this._ctx = _localctx;
              _prevctx = _localctx;
              this.state = 78;
              this.match(SimCExprParser.NUMBER);
            }
            break;

          case 5:
            {
              _localctx = new StringExprContext(_localctx);
              this._ctx = _localctx;
              _prevctx = _localctx;
              this.state = 79;
              this.match(SimCExprParser.STRING);
            }
            break;

          case 6:
            {
              _localctx = new MixedIdExprContext(_localctx);
              this._ctx = _localctx;
              _prevctx = _localctx;
              this.state = 80;
              this.match(SimCExprParser.MIXED_ID);
            }
            break;

          case 7:
            {
              _localctx = new AccessExprContext(_localctx);
              this._ctx = _localctx;
              _prevctx = _localctx;
              this.state = 81;
              this.accessPattern();
            }
            break;

          case 8:
            {
              _localctx = new AnyTokenExprContext(_localctx);
              this._ctx = _localctx;
              _prevctx = _localctx;
              this.state = 82;
              this.matchWildcard();
            }
            break;
        }
        this._ctx._stop = this._input.tryLT(-1);
        this.state = 108;
        this._errHandler.sync(this);
        _alt = this.interpreter.adaptivePredict(this._input, 7, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            if (this._parseListeners != null) {
              this.triggerExitRuleEvent();
            }
            _prevctx = _localctx;
            {
              this.state = 106;
              this._errHandler.sync(this);
              switch (
                this.interpreter.adaptivePredict(this._input, 6, this._ctx)
              ) {
                case 1:
                  {
                    _localctx = new MultiplicativeExprContext(
                      new ExpressionContext(_parentctx, _parentState),
                    );
                    this.pushNewRecursionContext(
                      _localctx,
                      _startState,
                      SimCExprParser.RULE_expression,
                    );
                    this.state = 85;
                    if (!this.precpred(this._ctx, 12)) {
                      throw this.createFailedPredicateException(
                        "this.precpred(this._ctx, 12)",
                      );
                    }
                    this.state = 86;
                    _la = this._input.LA(1);
                    if (
                      !(
                        (_la & ~0x1f) === 0 &&
                        ((1 << _la) &
                          ((1 << SimCExprParser.OP_MUL) |
                            (1 << SimCExprParser.OP_DIV) |
                            (1 << SimCExprParser.OP_MOD))) !==
                          0
                      )
                    ) {
                      this._errHandler.recoverInline(this);
                    } else {
                      if (this._input.LA(1) === Token.EOF) {
                        this.matchedEOF = true;
                      }

                      this._errHandler.reportMatch(this);
                      this.consume();
                    }
                    this.state = 87;
                    this.expression(13);
                  }
                  break;

                case 2:
                  {
                    _localctx = new AdditiveExprContext(
                      new ExpressionContext(_parentctx, _parentState),
                    );
                    this.pushNewRecursionContext(
                      _localctx,
                      _startState,
                      SimCExprParser.RULE_expression,
                    );
                    this.state = 88;
                    if (!this.precpred(this._ctx, 11)) {
                      throw this.createFailedPredicateException(
                        "this.precpred(this._ctx, 11)",
                      );
                    }
                    this.state = 89;
                    _la = this._input.LA(1);
                    if (
                      !(
                        _la === SimCExprParser.OP_PLUS ||
                        _la === SimCExprParser.OP_MINUS
                      )
                    ) {
                      this._errHandler.recoverInline(this);
                    } else {
                      if (this._input.LA(1) === Token.EOF) {
                        this.matchedEOF = true;
                      }

                      this._errHandler.reportMatch(this);
                      this.consume();
                    }
                    this.state = 90;
                    this.expression(12);
                  }
                  break;

                case 3:
                  {
                    _localctx = new MinMaxExprContext(
                      new ExpressionContext(_parentctx, _parentState),
                    );
                    this.pushNewRecursionContext(
                      _localctx,
                      _startState,
                      SimCExprParser.RULE_expression,
                    );
                    this.state = 91;
                    if (!this.precpred(this._ctx, 10)) {
                      throw this.createFailedPredicateException(
                        "this.precpred(this._ctx, 10)",
                      );
                    }
                    this.state = 92;
                    _la = this._input.LA(1);
                    if (
                      !(
                        _la === SimCExprParser.OP_MAX ||
                        _la === SimCExprParser.OP_MIN
                      )
                    ) {
                      this._errHandler.recoverInline(this);
                    } else {
                      if (this._input.LA(1) === Token.EOF) {
                        this.matchedEOF = true;
                      }

                      this._errHandler.reportMatch(this);
                      this.consume();
                    }
                    this.state = 93;
                    this.expression(11);
                  }
                  break;

                case 4:
                  {
                    _localctx = new ComparisonExprContext(
                      new ExpressionContext(_parentctx, _parentState),
                    );
                    this.pushNewRecursionContext(
                      _localctx,
                      _startState,
                      SimCExprParser.RULE_expression,
                    );
                    this.state = 94;
                    if (!this.precpred(this._ctx, 9)) {
                      throw this.createFailedPredicateException(
                        "this.precpred(this._ctx, 9)",
                      );
                    }
                    this.state = 95;
                    _la = this._input.LA(1);
                    if (
                      !(
                        (_la & ~0x1f) === 0 &&
                        ((1 << _la) &
                          ((1 << SimCExprParser.OP_GT) |
                            (1 << SimCExprParser.OP_GE) |
                            (1 << SimCExprParser.OP_LT) |
                            (1 << SimCExprParser.OP_LE) |
                            (1 << SimCExprParser.OP_EQ) |
                            (1 << SimCExprParser.OP_EQEQ) |
                            (1 << SimCExprParser.OP_NE))) !==
                          0
                      )
                    ) {
                      this._errHandler.recoverInline(this);
                    } else {
                      if (this._input.LA(1) === Token.EOF) {
                        this.matchedEOF = true;
                      }

                      this._errHandler.reportMatch(this);
                      this.consume();
                    }
                    this.state = 96;
                    this.expression(10);
                  }
                  break;

                case 5:
                  {
                    _localctx = new AndExprContext(
                      new ExpressionContext(_parentctx, _parentState),
                    );
                    this.pushNewRecursionContext(
                      _localctx,
                      _startState,
                      SimCExprParser.RULE_expression,
                    );
                    this.state = 97;
                    if (!this.precpred(this._ctx, 8)) {
                      throw this.createFailedPredicateException(
                        "this.precpred(this._ctx, 8)",
                      );
                    }
                    this.state = 98;
                    this.match(SimCExprParser.OP_AND);
                    this.state = 99;
                    this.expression(9);
                  }
                  break;

                case 6:
                  {
                    _localctx = new XorExprContext(
                      new ExpressionContext(_parentctx, _parentState),
                    );
                    this.pushNewRecursionContext(
                      _localctx,
                      _startState,
                      SimCExprParser.RULE_expression,
                    );
                    this.state = 100;
                    if (!this.precpred(this._ctx, 7)) {
                      throw this.createFailedPredicateException(
                        "this.precpred(this._ctx, 7)",
                      );
                    }
                    this.state = 101;
                    this.match(SimCExprParser.OP_XOR);
                    this.state = 102;
                    this.expression(8);
                  }
                  break;

                case 7:
                  {
                    _localctx = new OrExprContext(
                      new ExpressionContext(_parentctx, _parentState),
                    );
                    this.pushNewRecursionContext(
                      _localctx,
                      _startState,
                      SimCExprParser.RULE_expression,
                    );
                    this.state = 103;
                    if (!this.precpred(this._ctx, 6)) {
                      throw this.createFailedPredicateException(
                        "this.precpred(this._ctx, 6)",
                      );
                    }
                    this.state = 104;
                    this.match(SimCExprParser.OP_OR);
                    this.state = 105;
                    this.expression(7);
                  }
                  break;
              }
            }
          }
          this.state = 110;
          this._errHandler.sync(this);
          _alt = this.interpreter.adaptivePredict(this._input, 7, this._ctx);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.unrollRecursionContexts(_parentctx);
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public identifier(): IdentifierContext {
    let _localctx: IdentifierContext = new IdentifierContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 8, SimCExprParser.RULE_identifier);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 52;
        _la = this._input.LA(1);
        if (
          !(
            (_la & ~0x1f) === 0 &&
            ((1 << _la) &
              ((1 << SimCExprParser.NUMBER) |
                (1 << SimCExprParser.MIXED_ID) |
                (1 << SimCExprParser.STRING))) !==
              0
          )
        ) {
          this._errHandler.recoverInline(this);
        } else {
          if (this._input.LA(1) === Token.EOF) {
            this.matchedEOF = true;
          }

          this._errHandler.reportMatch(this);
          this.consume();
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }

  // @RuleVersion(0)
  public parse(): ParseContext {
    let _localctx: ParseContext = new ParseContext(this._ctx, this.state);
    this.enterRule(_localctx, 0, SimCExprParser.RULE_parse);
    try {
      this.state = 27;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 0, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 18;
            this.actionLine();
            this.state = 19;
            this.match(SimCExprParser.EOF);
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 21;
            this.commentLine();
            this.state = 22;
            this.match(SimCExprParser.EOF);
          }
          break;

        case 3:
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 24;
            this.expression(0);
            this.state = 25;
            this.match(SimCExprParser.EOF);
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  public sempred(
    _localctx: RuleContext,
    ruleIndex: number,
    predIndex: number,
  ): boolean {
    switch (ruleIndex) {
      case 8:
        return this.expression_sempred(
          _localctx as ExpressionContext,
          predIndex,
        );
    }
    return true;
  }

  // @RuleVersion(0)
  public sublistName(): SublistNameContext {
    let _localctx: SublistNameContext = new SublistNameContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 12, SimCExprParser.RULE_sublistName);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 56;
        this.identifier();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  protected createFailedPredicateException(
    predicate?: string,
    message?: string,
  ): FailedPredicateException {
    return new FailedPredicateException(this, predicate, message);
  }
  private expression_sempred(
    _localctx: ExpressionContext,
    predIndex: number,
  ): boolean {
    switch (predIndex) {
      case 0:
        return this.precpred(this._ctx, 12);

      case 1:
        return this.precpred(this._ctx, 11);

      case 2:
        return this.precpred(this._ctx, 10);

      case 3:
        return this.precpred(this._ctx, 9);

      case 4:
        return this.precpred(this._ctx, 8);

      case 5:
        return this.precpred(this._ctx, 7);

      case 6:
        return this.precpred(this._ctx, 6);
    }
    return true;
  }
}
export class StringExprContext extends ExpressionContext {
  constructor(ctx: ExpressionContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }
  // @Override
  public accept<Result>(visitor: SimCExprVisitor<Result>): Result {
    if (visitor.visitStringExpr) {
      return visitor.visitStringExpr(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
  // @Override
  public enterRule(listener: SimCExprListener): void {
    if (listener.enterStringExpr) {
      listener.enterStringExpr(this);
    }
  }
  // @Override
  public exitRule(listener: SimCExprListener): void {
    if (listener.exitStringExpr) {
      listener.exitStringExpr(this);
    }
  }
  public STRING(): TerminalNode {
    return this.getToken(SimCExprParser.STRING, 0);
  }
}
export class SublistNameContext extends ParserRuleContext {
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return SimCExprParser.RULE_sublistName;
  }
  // @Override
  public accept<Result>(visitor: SimCExprVisitor<Result>): Result {
    if (visitor.visitSublistName) {
      return visitor.visitSublistName(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
  // @Override
  public enterRule(listener: SimCExprListener): void {
    if (listener.enterSublistName) {
      listener.enterSublistName(this);
    }
  }
  // @Override
  public exitRule(listener: SimCExprListener): void {
    if (listener.exitSublistName) {
      listener.exitSublistName(this);
    }
  }
  public identifier(): IdentifierContext {
    return this.getRuleContext(0, IdentifierContext);
  }
}
export class UnaryExprContext extends ExpressionContext {
  constructor(ctx: ExpressionContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }
  // @Override
  public accept<Result>(visitor: SimCExprVisitor<Result>): Result {
    if (visitor.visitUnaryExpr) {
      return visitor.visitUnaryExpr(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
  // @Override
  public enterRule(listener: SimCExprListener): void {
    if (listener.enterUnaryExpr) {
      listener.enterUnaryExpr(this);
    }
  }
  // @Override
  public exitRule(listener: SimCExprListener): void {
    if (listener.exitUnaryExpr) {
      listener.exitUnaryExpr(this);
    }
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }
  public OP_ABS(): TerminalNode | undefined {
    return this.tryGetToken(SimCExprParser.OP_ABS, 0);
  }
  public OP_MINUS(): TerminalNode | undefined {
    return this.tryGetToken(SimCExprParser.OP_MINUS, 0);
  }
  public OP_NOT(): TerminalNode | undefined {
    return this.tryGetToken(SimCExprParser.OP_NOT, 0);
  }
  public OP_PLUS(): TerminalNode | undefined {
    return this.tryGetToken(SimCExprParser.OP_PLUS, 0);
  }
}
export class XorExprContext extends ExpressionContext {
  constructor(ctx: ExpressionContext) {
    super(ctx.parent, ctx.invokingState);
    this.copyFrom(ctx);
  }
  // @Override
  public accept<Result>(visitor: SimCExprVisitor<Result>): Result {
    if (visitor.visitXorExpr) {
      return visitor.visitXorExpr(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
  // @Override
  public enterRule(listener: SimCExprListener): void {
    if (listener.enterXorExpr) {
      listener.enterXorExpr(this);
    }
  }
  // @Override
  public exitRule(listener: SimCExprListener): void {
    if (listener.exitXorExpr) {
      listener.exitXorExpr(this);
    }
  }
  public expression(): ExpressionContext[];
  public expression(i: number): ExpressionContext;
  public expression(i?: number): ExpressionContext | ExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ExpressionContext);
    } else {
      return this.getRuleContext(i, ExpressionContext);
    }
  }
  public OP_XOR(): TerminalNode {
    return this.getToken(SimCExprParser.OP_XOR, 0);
  }
}
