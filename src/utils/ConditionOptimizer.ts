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
    // Initialize z3-solver and get Context and helpers
    const z3 = await init();

    // @ts-ignore // z3-solver Context is dynamically constructed and lacks a TS signature
    const ctx = new z3.Context("main");

    // Convert ExpressionNode to Z3 expression
    const z3Expr = this.astToZ3(node, ctx);

    // Use Z3 to simplify the expression
    const simplified = await ctx.simplify(z3Expr);

    // Convert back to ExpressionNode
    return this.z3ToAst(simplified, ctx);
  }

  /**
   * Convert an ExpressionNode AST to a Z3 Bool expression.
   */
  private astToZ3(node: ExpressionNode, ctx: any): any {
    switch (node.nodeType) {
      case "and":
        return ctx.And(
          this.astToZ3((node as AndExprExpressionNode).left, ctx),
          this.astToZ3((node as AndExprExpressionNode).right, ctx),
        );
      case "or":
        return ctx.Or(
          this.astToZ3((node as OrExprExpressionNode).left, ctx),
          this.astToZ3((node as OrExprExpressionNode).right, ctx),
        );
      case "unary":
        if ((node as UnaryExpressionNode).operator === "not") {
          return ctx.Not(
            this.astToZ3((node as UnaryExpressionNode).argument, ctx),
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
      case "identifier":
        // Use the identifier name directly for Z3 variable
        return ctx.Bool.const((node as any).name);
      default:
        // For other nodes, treat as a boolean variable using a unique name
        return ctx.Bool.const(JSON.stringify(node));
    }
  }

  /**
   * Convert a Z3 expression back to an ExpressionNode AST.
   */
  private z3ToAst(expr: any, ctx: any): ExpressionNode {
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
        left: this.z3ToAst(expr.arg(0), ctx),
        right: this.z3ToAst(expr.arg(1), ctx),
      };
    }
    if (s.startsWith("(or ")) {
      return {
        expressionType: "boolean",
        kind: "expression",
        nodeType: "or",
        operator: "or",
        left: this.z3ToAst(expr.arg(0), ctx),
        right: this.z3ToAst(expr.arg(1), ctx),
      };
    }
    if (s.startsWith("(not ")) {
      return {
        expressionType: "boolean",
        kind: "expression",
        nodeType: "unary",
        operator: "not",
        argument: this.z3ToAst(expr.arg(0), ctx),
      };
    }

    // If expr is a variable, treat as identifier
    // Z3 variable names are returned as-is for identifier nodes
    if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(s)) {
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
