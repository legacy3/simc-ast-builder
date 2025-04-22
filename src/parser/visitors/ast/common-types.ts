import { AbstractParseTreeVisitor } from "antlr4ts/tree/AbstractParseTreeVisitor";

import { SimCExprVisitor } from "../../antlr4/SimCExprVisitor";

/**
 * Type for action line nodes
 */
export interface ActionLineNode extends BaseConditionableNode {
  kind: "actionLine";
  name: string;
}

/**
 * Base type for all AST nodes
 */
export type ASTNode =
  | ExpressionNode
  | ActionLineNode
  | CommentLineNode
  | ConditionNode
  | ErrorNode
  | UseItemLineNode
  | VariableLineNode
  | ParameterNode;

/**
 * Base type for nodes that can have conditions
 */
export interface BaseConditionableNode extends BaseLineNode {
  conditions: ConditionNode[];
}

/**
 * Base type for nodes that can appear in a line
 */
export interface BaseLineNode extends BaseNode {
  rawLine: string;
  subList: string;
}

/**
 * Base node type that all AST nodes extend from
 */
export interface BaseNode {
  kind: NodeKind;
}

/**
 * Base interface for comment line nodes
 */
export interface CommentLineNode extends BaseNode {
  comment: string;
  kind: "commentLine";
}

/**
 * Base interface for condition nodes
 */
export interface ConditionNode extends BaseNode {
  expression: ExpressionNode;
  kind: "condition";
  type: string;
}

/**
 * Error node interface for representing parsing errors
 */
export interface ErrorNode extends BaseNode {
  kind: "error";
  message: string;
}

/**
 * Base interface for all expression nodes
 */
export interface ExpressionNode extends BaseNode {
  [key: string]: any; // For additional properties specific to each node type
  expressionType: "numeric" | "boolean" | "neutral";
  kind: "expression";
  nodeType: string;
}

/**
 * Interface for field information
 */
export interface FieldInfo {
  name: string;
  type: "numeric" | "boolean" | "neutral";
}

/**
 * All possible node kinds
 */
export type NodeKind =
  | "actionLine"
  | "commentLine"
  | "condition"
  | "error"
  | "expression"
  | "parameter"
  | "useItemLine"
  | "variableLine"
  | "qualifiedAccess"
  | "simpleAccess";

/**
 * Parameter node interface for all parameter types
 */
export interface ParameterNode extends BaseNode {
  kind: "parameter";
  op: ParameterType;
  value: ExpressionNode;
}

/**
 * Types for variable parameters
 */
export type ParameterType =
  | "chain"
  | "condition"
  | "cycle_targets"
  | "default"
  | "early_chain_if"
  | "effect_name"
  | "empower_to"
  | "enabled"
  | "extra_amount"
  | "for_next"
  | "if"
  | "interrupt"
  | "interrupt_if"
  | "interrupt_global"
  | "interrupt_immediate"
  | "line_cd"
  | "max_energy"
  | "moving"
  | "name"
  | "op"
  | "precombat_time"
  | "precombat_seconds"
  | "sec"
  | "slot"
  | "strict"
  | "strict_if"
  | "target_if"
  | "toggle"
  | "use_off_gcd"
  | "use_while_casting"
  | "value"
  | "value_else"
  | "wait";

/**
 * Type for use item line nodes
 */
export interface UseItemLineNode extends BaseConditionableNode {
  isEffect: boolean;
  itemName: string;
  kind: "useItemLine";
}

/**
 * Type for variable line nodes
 */
export interface VariableLineNode extends BaseLineNode {
  kind: "variableLine";
  parameters: ParameterNode[];
}

/**
 * Base visitor class
 */
export abstract class BaseVisitor<T = ASTNode>
  extends AbstractParseTreeVisitor<T>
  implements SimCExprVisitor<T>
{
  protected defaultResult(): T {
    // Get the caller information to identify which context is missing a visitor
    const stack = new Error().stack;
    const callerInfo = stack ? stack.split("\n")[2] : "unknown";

    // Extract context type from the stack trace if possible
    const contextTypeMatch =
      typeof callerInfo === "string" ? callerInfo.match(/at\s+(\w+)\./) : null;

    const contextType = contextTypeMatch
      ? contextTypeMatch[1]
      : "unknown context";

    /*
      console.warn(
        `Missing visitor method for ${contextType}. Add a visit${contextType} method to handle this context type.\nStack trace: ${callerInfo}`,
      );
    */

    return {
      callerInfo: callerInfo,
      expressionType: "neutral",
      kind: "expression",
      missingVisitorFor: contextType,
      nodeType: `missing_visitor_${contextType}`,
    } as unknown as T;
  }
}
