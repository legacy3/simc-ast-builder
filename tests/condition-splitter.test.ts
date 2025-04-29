import { ConditionSplitter } from "../src/utils/ConditionSplitter";
import { ExpressionNode } from "../src/parser/visitors/ast/common-types";

describe("ConditionSplitter", () => {
  it("splits a simple AND chain into parts", () => {
    // A && (B && C)
    const ast: ExpressionNode = {
      nodeType: "and",
      expressionType: "boolean",
      kind: "expression",
      left: {
        nodeType: "literal",
        expressionType: "boolean",
        kind: "expression",
        value: "A",
      },
      operator: "and",
      right: {
        nodeType: "and",
        expressionType: "boolean",
        kind: "expression",
        left: {
          nodeType: "literal",
          expressionType: "boolean",
          kind: "expression",
          value: "B",
        },
        operator: "and",
        right: {
          nodeType: "literal",
          expressionType: "boolean",
          kind: "expression",
          value: "C",
        },
      },
    };

    const parts = ConditionSplitter.splitByAnd(ast);
    expect(parts).toHaveLength(3);
    expect(parts[0].value).toBe("A");
    expect(parts[1].value).toBe("B");
    expect(parts[2].value).toBe("C");
  });

  it("splits a deeply nested AND chain into all parts", () => {
    // (A && (B && (C && D)))
    const ast: ExpressionNode = {
      nodeType: "and",
      expressionType: "boolean",
      kind: "expression",
      left: {
        nodeType: "literal",
        expressionType: "boolean",
        kind: "expression",
        value: "A",
      },
      operator: "and",
      right: {
        nodeType: "and",
        expressionType: "boolean",
        kind: "expression",
        left: {
          nodeType: "literal",
          expressionType: "boolean",
          kind: "expression",
          value: "B",
        },
        operator: "and",
        right: {
          nodeType: "and",
          expressionType: "boolean",
          kind: "expression",
          left: {
            nodeType: "literal",
            expressionType: "boolean",
            kind: "expression",
            value: "C",
          },
          operator: "and",
          right: {
            nodeType: "literal",
            expressionType: "boolean",
            kind: "expression",
            value: "D",
          },
        },
      },
    };

    const parts = ConditionSplitter.splitByAnd(ast);
    expect(parts).toHaveLength(4);
    expect(parts[0].value).toBe("A");
    expect(parts[1].value).toBe("B");
    expect(parts[2].value).toBe("C");
    expect(parts[3].value).toBe("D");
  });

  it("returns a single node if not an AND", () => {
    const ast: ExpressionNode = {
      nodeType: "literal",
      expressionType: "boolean",
      kind: "expression",
      value: "X",
    };
    const parts = ConditionSplitter.splitByAnd(ast);
    expect(parts).toHaveLength(1);
    expect(parts[0].value).toBe("X");
  });
});
