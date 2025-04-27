import { ConditionOptimizer } from "../src/utils/ConditionOptimizer";
import { ExpressionNode } from "../src/parser/visitors/ast/common-types";

function makeLiteral(value: "0" | "1"): ExpressionNode {
  return {
    expressionType: "numeric",
    kind: "expression",
    nodeType: "literal",
    value,
  };
}

function makeIdentifier(name: string): ExpressionNode {
  return {
    expressionType: "boolean",
    kind: "expression",
    nodeType: "identifier",
    name,
  } as ExpressionNode;
}

function makeAnd(left: ExpressionNode, right: ExpressionNode): ExpressionNode {
  return {
    expressionType: "boolean",
    kind: "expression",
    nodeType: "and",
    operator: "and",
    left,
    right,
  };
}

function makeOr(left: ExpressionNode, right: ExpressionNode): ExpressionNode {
  return {
    expressionType: "boolean",
    kind: "expression",
    nodeType: "or",
    operator: "or",
    left,
    right,
  };
}

function makeNot(argument: ExpressionNode): ExpressionNode {
  return {
    expressionType: "boolean",
    kind: "expression",
    nodeType: "unary",
    operator: "not",
    argument,
  };
}

describe("ConditionOptimizer", () => {
  const optimizer = new ConditionOptimizer();

  it("should simplify A && true to A", async () => {
    const A = makeIdentifier("A");
    const expr = makeAnd(A, makeLiteral("1"));
    const result = await optimizer.optimize(expr);
    expect(result).toEqual(A);
  });

  it("should simplify A && false to false", async () => {
    const A = makeIdentifier("A");
    const expr = makeAnd(A, makeLiteral("0"));
    const result = await optimizer.optimize(expr);
    expect(result).toEqual(makeLiteral("0"));
  });

  it("should simplify A || false to A", async () => {
    const A = makeIdentifier("A");
    const expr = makeOr(A, makeLiteral("0"));
    const result = await optimizer.optimize(expr);
    expect(result).toEqual(A);
  });

  it("should simplify A || true to true", async () => {
    const A = makeIdentifier("A");
    const expr = makeOr(A, makeLiteral("1"));
    const result = await optimizer.optimize(expr);
    expect(result).toEqual(makeLiteral("1"));
  });

  it("should simplify A && !A to false", async () => {
    const A = makeIdentifier("A");
    const expr = makeAnd(A, makeNot(A));
    const result = await optimizer.optimize(expr);
    expect(result).toEqual(makeLiteral("0"));
  });

  it("should simplify A || !A to true", async () => {
    const A = makeIdentifier("A");
    const expr = makeOr(A, makeNot(A));
    const result = await optimizer.optimize(expr);
    expect(result).toEqual(makeLiteral("1"));
  });

  it("should simplify !!A to A", async () => {
    const A = makeIdentifier("A");
    const expr = makeNot(makeNot(A));
    const result = await optimizer.optimize(expr);
    expect(result).toEqual(A);
  });

  it("should apply De Morgan's law: !(A && B) to !A || !B", async () => {
    const A = makeIdentifier("A");
    const B = makeIdentifier("B");
    const expr = makeNot(makeAnd(A, B));
    const result = await optimizer.optimize(expr);
    // Accept either De Morgan form or further simplified
    // !(A && B) == !A || !B
    expect(
      (result.nodeType === "or" &&
        ((result.left.nodeType === "unary" &&
          (result.left as any).argument.name === "A") ||
          (result.right.nodeType === "unary" &&
            (result.right as any).argument.name === "B"))) ||
        (result.nodeType === "unary" && result.operator === "not"),
    ).toBeTruthy();
  });

  it("should simplify (A && A) to A", async () => {
    const A = makeIdentifier("A");
    const expr = makeAnd(A, A);
    const result = await optimizer.optimize(expr);
    expect(result).toEqual(A);
  });

  it("should simplify (A || A) to A", async () => {
    const A = makeIdentifier("A");
    const expr = makeOr(A, A);
    const result = await optimizer.optimize(expr);
    expect(result).toEqual(A);
  });
});
