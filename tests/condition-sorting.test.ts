import { ConditionOptimizer } from "../src/utils/ConditionOptimizer";
import { ExpressionNode } from "../src/parser/visitors/ast/common-types";

describe("ConditionOptimizer - conditionSorting", () => {
  // Subclass to override CONDITION_SORT_ORDER for testing
  class TestConditionOptimizer extends ConditionOptimizer {
    constructor(order: string[]) {
      super({ conditionSorting: true });
      // @ts-ignore
      this.CONDITION_SORT_ORDER = order;
    }
  }

  function makeExpr(nodeType: string): ExpressionNode {
    return {
      expressionType: "boolean",
      kind: "expression",
      nodeType,
    } as ExpressionNode;
  }

  it("sorts flat AND conditions by custom order", () => {
    const order = ["a", "b", "c", "d"];
    const optimizer = new TestConditionOptimizer(order);

    // c && a && d && b
    const expr: ExpressionNode = {
      expressionType: "boolean",
      kind: "expression",
      nodeType: "and",
      left: {
        expressionType: "boolean",
        kind: "expression",
        nodeType: "and",
        left: makeExpr("c"),
        right: makeExpr("a"),
      },
      right: {
        expressionType: "boolean",
        kind: "expression",
        nodeType: "and",
        left: makeExpr("d"),
        right: makeExpr("b"),
      },
    };

    const optimized = optimizer.optimize(expr);

    // Should be: a && b && c && d (since lower index = higher priority = earlier)
    const getOrder = (node: ExpressionNode): string[] => {
      if (node.nodeType === "and") {
        return [...getOrder(node.left), ...getOrder(node.right)];
      }
      return [node.nodeType];
    };

    expect(getOrder(optimized)).toEqual(["a", "b", "c", "d"]);
  });

  it("sorts nested OR conditions by custom order", () => {
    const order = ["x", "y", "z"];
    const optimizer = new TestConditionOptimizer(order);

    // z || x || y
    const expr: ExpressionNode = {
      expressionType: "boolean",
      kind: "expression",
      nodeType: "or",
      left: makeExpr("z"),
      right: {
        expressionType: "boolean",
        kind: "expression",
        nodeType: "or",
        left: makeExpr("x"),
        right: makeExpr("y"),
      },
    };

    const optimized = optimizer.optimize(expr);

    const getOrder = (node: ExpressionNode): string[] => {
      if (node.nodeType === "or") {
        return [...getOrder(node.left), ...getOrder(node.right)];
      }
      return [node.nodeType];
    };

    expect(getOrder(optimized)).toEqual(["x", "y", "z"]);
  });

  it("handles mixed irrelevant nodeTypes (not in order)", () => {
    const order = ["foo", "bar"];
    const optimizer = new TestConditionOptimizer(order);

    // baz && foo && qux && bar
    const expr: ExpressionNode = {
      expressionType: "boolean",
      kind: "expression",
      nodeType: "and",
      left: {
        expressionType: "boolean",
        kind: "expression",
        nodeType: "and",
        left: makeExpr("baz"),
        right: makeExpr("foo"),
      },
      right: {
        expressionType: "boolean",
        kind: "expression",
        nodeType: "and",
        left: makeExpr("qux"),
        right: makeExpr("bar"),
      },
    };

    const optimized = optimizer.optimize(expr);

    const getOrder = (node: ExpressionNode): string[] => {
      if (node.nodeType === "and") {
        return [...getOrder(node.left), ...getOrder(node.right)];
      }
      return [node.nodeType];
    };

    // foo and bar should come first, others keep original order after
    expect(getOrder(optimized).slice(0, 2)).toEqual(["foo", "bar"]);
    expect(getOrder(optimized).sort()).toEqual(["bar", "baz", "foo", "qux"].sort());
  });

  it("sorts deeply nested AND/OR conditions", () => {
    const order = ["alpha", "beta", "gamma", "delta"];
    const optimizer = new TestConditionOptimizer(order);

    // ((gamma && delta) || (beta && alpha))
    const expr: ExpressionNode = {
      expressionType: "boolean",
      kind: "expression",
      nodeType: "or",
      left: {
        expressionType: "boolean",
        kind: "expression",
        nodeType: "and",
        left: makeExpr("gamma"),
        right: makeExpr("delta"),
      },
      right: {
        expressionType: "boolean",
        kind: "expression",
        nodeType: "and",
        left: makeExpr("beta"),
        right: makeExpr("alpha"),
      },
    };

    const optimized = optimizer.optimize(expr);

    // Should be: (alpha && beta) || (gamma && delta)
    const getOrder = (node: ExpressionNode): string[] => {
      if (node.nodeType === "and" || node.nodeType === "or") {
        return [...getOrder(node.left), ...getOrder(node.right)];
      }
      return [node.nodeType];
    };

    expect(getOrder(optimized)).toEqual(["alpha", "beta", "gamma", "delta"]);
  });
});
