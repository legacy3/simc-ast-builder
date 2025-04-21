import { ParserRuleContext } from "antlr4ts";

import { ExpressionNode } from "../common-types";
import { SimCGenericVisitor } from "../SimCGenericVisitor";
import { AccessHandlerParams, LineMetaData } from "./ContextHandlerRegistry";

/**
 * Type definition for the common handler function signature with generic return type
 * This allows handlers to specify their exact return type
 */
export type AccessHandlerFn<
  T extends ExpressionNode = ExpressionNode,
  Ctx extends ParserRuleContext = ParserRuleContext,
> = (params: AccessHandlerParams<Ctx>) => T;

/**
 * Type definition for context handler functions (no "parts" argument)
 */
export type ContextHandlerFn<
  T = any,
  Ctx extends ParserRuleContext = ParserRuleContext,
> = (ctx: Ctx, visitor: SimCGenericVisitor) => T;
