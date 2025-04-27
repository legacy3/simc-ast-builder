import { init } from "z3-solver";

import { ExpressionNode } from "../parser/visitors/ast/common-types";
import {
  AndExprExpressionNode,
  OrExprExpressionNode,
  UnaryExpressionNode,
} from "../parser/visitors/ast/ContextHandlers/Basic";
/**
 * A drop-in replacement for ConditionOptimizer that uses z3-solver for logical optimization.
 * The optimize method is async due to z3-solver's async API.
 */
export class ConditionOptimizer {
  /**
   * Optimize an expression node by applying logical transformations using z3-solver.
   * @param node The expression node to optimize
   * @returns The optimized expression node (Promise)
   */
  async optimize(node: ExpressionNode): Promise<ExpressionNode> {
    // First, apply domain-specific negation rewrites (e.g., !X.up -> X.down)
    const rewritten = this.domainNegationRewrite(node);

    // Initialize z3-solver and get Context and helpers
    const z3 = await init();

    // @ts-ignore // z3-solver Context is dynamically constructed and lacks a TS signature
    const ctx = new z3.Context("main");

    // Set up mapping between AST nodes and Z3 variable names
    const astToVarMap = new Map();
    const varToAstMap = new Map();

    // Convert ExpressionNode to Z3 expression
    const z3Expr = this.astToZ3(rewritten, ctx, astToVarMap, varToAstMap);

    // Use Z3 to simplify the expression
    const simplified = await ctx.simplify(z3Expr);

    // Convert back to ExpressionNode using the mapping
    return this.z3ToAst(simplified, ctx, varToAstMap);
  }

  /**
   * Domain-specific negation rewrite:
   *   !X.up       -> X.down
   *   !X.down     -> X.up
   *   !X.enabled  -> X.disabled
   *   !X.disabled -> X.enabled
   * Works for any prefix (buff, debuff, etc).
   */
  private domainNegationRewrite(node: ExpressionNode): ExpressionNode {
    // Map of negatable fields and their negations
    const negationMap: Record<string, string> = {
      up: "down",
      down: "up",
      enabled: "disabled",
      disabled: "enabled",
    };

    // Handle NOT nodes
    if (
      node.nodeType === "unary" &&
      (node as UnaryExpressionNode).operator === "not"
    ) {
      const arg = (node as UnaryExpressionNode).argument;
      // Only rewrite identifiers with a negatable field
      if (
        arg.nodeType === "identifier" &&
        typeof (arg as any).name === "string"
      ) {
        const name: string = (arg as any).name;
        const match = name.match(/^(.*)\.(up|down|enabled|disabled)$/);
        if (match) {
          const prefix = match[1];
          const field = match[2] as keyof typeof negationMap;
          const negatedField = negationMap[field];
          if (negatedField) {
            return {
              ...arg,
              name: `${prefix}.${negatedField}`,
            };
          }
        }
      }
      // Otherwise, recursively rewrite the argument
      return {
        ...node,
        argument: this.domainNegationRewrite(arg),
      };
    }

    // Recursively process children for AND/OR nodes
    if (node.nodeType === "and" || node.nodeType === "or") {
      const left = (node as any).left;
      const right = (node as any).right;
      return {
        ...node,
        left: this.domainNegationRewrite(left),
        right: this.domainNegationRewrite(right),
      };
    }

    // For all other nodes, return as is
    return node;
  }

  /**
   * Convert an ExpressionNode AST to a Z3 Bool expression.
   */
  private astToZ3(
    node: ExpressionNode,
    ctx: any,
    astToVarMap = new Map(),
    varToAstMap = new Map(),
  ): any {
    // Helper to get or assign a unique variable name for a node
    function getVarName(node: ExpressionNode): string {
      // Use a canonical string for identifiers and structured nodes
      if (node.nodeType === "identifier") {
        return node["name"];
      }
      if (node.nodeType === "buff") {
        return `buff.${node["buffName"]}.${node["field"]}`;
      }
      if (node.nodeType === "debuff") {
        return `debuff.${node["debuffName"]}.${node["field"]}`;
      }
      // Add more structured node types as needed
      // Fallback: use JSON stringification (should be rare)
      return JSON.stringify(node);
    }

    switch (node.nodeType) {
      case "and":
        return ctx.And(
          this.astToZ3(
            (node as AndExprExpressionNode).left,
            ctx,
            astToVarMap,
            varToAstMap,
          ),
          this.astToZ3(
            (node as AndExprExpressionNode).right,
            ctx,
            astToVarMap,
            varToAstMap,
          ),
        );
      case "or":
        return ctx.Or(
          this.astToZ3(
            (node as OrExprExpressionNode).left,
            ctx,
            astToVarMap,
            varToAstMap,
          ),
          this.astToZ3(
            (node as OrExprExpressionNode).right,
            ctx,
            astToVarMap,
            varToAstMap,
          ),
        );
      case "unary":
        if ((node as UnaryExpressionNode).operator === "not") {
          return ctx.Not(
            this.astToZ3(
              (node as UnaryExpressionNode).argument,
              ctx,
              astToVarMap,
              varToAstMap,
            ),
          );
        }
        throw new Error(
          "Unsupported unary operator: " +
            (node as UnaryExpressionNode).operator,
        );
      case "literal":
        // Treat "1" as true, "0" as false
        if (node["value"] === "1") return ctx.Bool.val(true);
        if (node["value"] === "0") return ctx.Bool.val(false);
        throw new Error("Unsupported literal value: " + node["value"]);
      default:
        // For identifiers and structured nodes, assign/get a unique variable name
        const varName = getVarName(node);
        if (!varToAstMap.has(varName)) {
          varToAstMap.set(varName, node);
        }
        astToVarMap.set(node, varName);
        return ctx.Bool.const(varName);
    }
  }

  /**
   * Convert a Z3 expression back to an ExpressionNode AST.
   */
  private z3ToAst(
    expr: any,
    ctx: any,
    varToAstMap = new Map(),
  ): ExpressionNode {
    // Z3 may return a constant true/false, or a composed expression
    if (ctx.isTrue(expr)) {
      return {
        expressionType: "numeric",
        kind: "expression",
        nodeType: "literal",
        value: "1",
      };
    }
    if (ctx.isFalse(expr)) {
      return {
        expressionType: "numeric",
        kind: "expression",
        nodeType: "literal",
        value: "0",
      };
    }

    // Parse the Z3 expression's string representation
    const s = expr.toString();

    // Handle AND/OR/NOT
    if (s.startsWith("(and ")) {
      return {
        expressionType: "boolean",
        kind: "expression",
        nodeType: "and",
        operator: "and",
        left: this.z3ToAst(expr.arg(0), ctx, varToAstMap),
        right: this.z3ToAst(expr.arg(1), ctx, varToAstMap),
      };
    }
    if (s.startsWith("(or ")) {
      return {
        expressionType: "boolean",
        kind: "expression",
        nodeType: "or",
        operator: "or",
        left: this.z3ToAst(expr.arg(0), ctx, varToAstMap),
        right: this.z3ToAst(expr.arg(1), ctx, varToAstMap),
      };
    }
    if (s.startsWith("(not ")) {
      return {
        expressionType: "boolean",
        kind: "expression",
        nodeType: "unary",
        operator: "not",
        argument: this.z3ToAst(expr.arg(0), ctx, varToAstMap),
      };
    }

    // If expr is a variable, map back to the original AST node if possible
    if (/^[A-Za-z_][A-Za-z0-9_.]+$/.test(s)) {
      if (varToAstMap.has(s)) {
        return varToAstMap.get(s);
      }
      // Fallback: treat as identifier
      return {
        expressionType: "boolean",
        kind: "expression",
        nodeType: "identifier",
        name: s,
      } as ExpressionNode;
    }

    // Otherwise, try to parse as JSON (for rare fallback cases)
    try {
      const node = JSON.parse(s);
      if (typeof node === "object" && node.nodeType) {
        return node as ExpressionNode;
      }
    } catch {
      // Fallback: treat as identifier
    }
    return {
      expressionType: "boolean",
      kind: "expression",
      nodeType: "identifier",
      name: s,
    } as ExpressionNode;
  }
}
