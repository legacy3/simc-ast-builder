import { init } from "z3-solver";

import { ExpressionNode } from "../parser/visitors/ast/common-types";
import {
  AndExprExpressionNode,
  OrExprExpressionNode,
  UnaryExpressionNode,
} from "../parser/visitors/ast/ContextHandlers/Basic";

type Z3Ctx = any;

export class ConditionOptimizer {
  async optimize(node: ExpressionNode): Promise<ExpressionNode> {
    const z3 = await init();

    // @ts-ignore
    const ctx = new z3.Context("main");

    const astToVar = new Map<ExpressionNode, any>();
    const varToAst = new Map<any, ExpressionNode>();

    const rewritten = this.domainNegationRewrite(node);
    const z3Expr = this.astToZ3(rewritten, ctx, astToVar, varToAst);
    const simplified = await ctx.simplify(z3Expr);

    return this.z3ToAst(simplified, ctx, varToAst);
  }

  private astToZ3(
    node: ExpressionNode,
    ctx: Z3Ctx,
    astToVar: Map<ExpressionNode, any>,
    varToAst: Map<any, ExpressionNode>,
  ): any {
    switch (node.nodeType) {
      case "and":
        return ctx.And(
          this.astToZ3(
            (node as AndExprExpressionNode).left,
            ctx,
            astToVar,
            varToAst,
          ),
          this.astToZ3(
            (node as AndExprExpressionNode).right,
            ctx,
            astToVar,
            varToAst,
          ),
        );

      case "or":
        return ctx.Or(
          this.astToZ3(
            (node as OrExprExpressionNode).left,
            ctx,
            astToVar,
            varToAst,
          ),
          this.astToZ3(
            (node as OrExprExpressionNode).right,
            ctx,
            astToVar,
            varToAst,
          ),
        );

      case "unary":
        if ((node as UnaryExpressionNode).operator === "not") {
          return ctx.Not(
            this.astToZ3(
              (node as UnaryExpressionNode).argument,
              ctx,
              astToVar,
              varToAst,
            ),
          );
        }

        throw new Error(
          "Unsupported unary operator: " +
            (node as UnaryExpressionNode).operator,
        );

      case "literal":
        if (node["value"] === "1") return ctx.Bool.val(true);
        if (node["value"] === "0") return ctx.Bool.val(false);
        throw new Error("Unsupported literal value: " + node["value"]);

      // TODO Not sure if this is correct
      case "buff":
      case "debuff":
      case "identifier": {
        if (!astToVar.has(node)) {
          const z3Var = ctx.Bool.const(Symbol());

          astToVar.set(node, z3Var);
          varToAst.set(z3Var, node);
        }

        return astToVar.get(node);
      }

      default: {
        if (!astToVar.has(node)) {
          const z3Var = ctx.Bool.const(Symbol());

          astToVar.set(node, z3Var);
          varToAst.set(z3Var, node);
        }

        return astToVar.get(node);
      }
    }
  }

  private domainNegationRewrite(node: ExpressionNode): ExpressionNode {
    if (this.isUnary(node) && node.operator === "not") {
      const arg = node.argument;

      if (this.hasFieldProperty(arg)) {
        const field = arg.field;
        if (field === "up") return { ...arg, field: "down" };
        if (field === "down") return { ...arg, field: "up" };
        if (field === "enabled") return { ...arg, field: "disabled" };
        if (field === "disabled") return { ...arg, field: "enabled" };
      }

      return { ...node, argument: this.domainNegationRewrite(arg) };
    }

    if (this.isAnd(node) || this.isOr(node)) {
      const left = node.left;
      const right = node.right;

      return {
        ...node,
        left: this.domainNegationRewrite(left),
        right: this.domainNegationRewrite(right),
      };
    }

    return node;
  }

  private hasFieldProperty(
    node: ExpressionNode,
  ): node is { field: string } & ExpressionNode {
    return typeof (node as any).field === "string";
  }

  private isAnd(node: ExpressionNode): node is AndExprExpressionNode {
    return node.nodeType === "and" && "left" in node && "right" in node;
  }

  private isOr(node: ExpressionNode): node is OrExprExpressionNode {
    return node.nodeType === "or" && "left" in node && "right" in node;
  }

  private isUnary(node: ExpressionNode): node is UnaryExpressionNode {
    return (
      node.nodeType === "unary" && "operator" in node && "argument" in node
    );
  }

  private z3ToAst(
    expr: any,
    ctx: Z3Ctx,
    varToAst: Map<any, ExpressionNode>,
  ): ExpressionNode {
    if (ctx.isTrue(expr))
      return {
        expressionType: "numeric",
        kind: "expression",
        nodeType: "literal",
        value: "1",
      };

    if (ctx.isFalse(expr))
      return {
        expressionType: "numeric",
        kind: "expression",
        nodeType: "literal",
        value: "0",
      };

    if (varToAst.has(expr)) {
      return varToAst.get(expr)!;
    }

    const s = expr.toString();

    if (s.startsWith("(and ")) {
      return {
        expressionType: "boolean",
        kind: "expression",
        left: this.z3ToAst(expr.arg(0), ctx, varToAst),
        nodeType: "and",
        operator: "and",
        right: this.z3ToAst(expr.arg(1), ctx, varToAst),
      };
    }

    if (s.startsWith("(or ")) {
      return {
        expressionType: "boolean",
        kind: "expression",
        left: this.z3ToAst(expr.arg(0), ctx, varToAst),
        nodeType: "or",
        operator: "or",
        right: this.z3ToAst(expr.arg(1), ctx, varToAst),
      };
    }

    if (s.startsWith("(not ")) {
      return {
        argument: this.z3ToAst(expr.arg(0), ctx, varToAst),
        expressionType: "boolean",
        kind: "expression",
        nodeType: "unary",
        operator: "not",
      };
    }

    return {
      expressionType: "boolean",
      kind: "expression",
      name: s,
      nodeType: "identifier",
    };
  }
}
