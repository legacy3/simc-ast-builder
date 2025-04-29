import { ConditionOptimizer } from "../src/utils/ConditionOptimizer";
import { ExpressionNode } from "../src/parser/visitors/ast/common-types";

describe("ConditionOptimizer - Negated Field Support", () => {
  const optimizer = new ConditionOptimizer();

  it("optimizes the entire AST for !buff.foo.up to replace the field 'up' with 'down'", () => {
    // Simulate an AST node for !buff.foo.up
    const node: ExpressionNode = {
      nodeType: "unary",
      operator: "not",
      kind: "expression",
      expressionType: "boolean",
      argument: {
        nodeType: "access",
        kind: "expression",
        expressionType: "boolean",
        field: "up",
        object: {
          nodeType: "access",
          kind: "expression",
          expressionType: "boolean",
          field: "foo",
          object: {
            nodeType: "access",
            kind: "expression",
            expressionType: "boolean",
            field: "buff",
            object: {
              nodeType: "identifier",
              kind: "expression",
              expressionType: "boolean",
              name: "bar",
            },
          },
        },
      },
    };

    // Sanity check: original field is 'up'
    expect(node.argument.field).toBe("up");

    const optimized = optimizer.optimize(node);

    // The optimizer should replace 'up' with 'down' in the correct place in the AST
    // The result should be an access node with field 'down', and the rest of the chain preserved
    expect(optimized.nodeType).toBe("access");
    expect(optimized.field).toBe("down");
    expect(optimized.object.nodeType).toBe("access");
    expect(optimized.object.field).toBe("foo");
    expect(optimized.object.object.nodeType).toBe("access");
    expect(optimized.object.object.field).toBe("buff");
    expect(optimized.object.object.object.nodeType).toBe("identifier");
    expect(optimized.object.object.object.name).toBe("bar");
  });

  it("does not change fields without a negatedName", () => {
    // Simulate an AST node for !buff.active (assuming 'active' has no negatedName)
    const node: ExpressionNode = {
      nodeType: "unary",
      operator: "not",
      kind: "expression",
      expressionType: "boolean",
      argument: {
        nodeType: "access",
        kind: "expression",
        expressionType: "boolean",
        field: "active",
        object: {
          nodeType: "identifier",
          kind: "expression",
          expressionType: "boolean",
          name: "foo",
        },
      },
    };

    const optimized = optimizer.optimize(node);

    // Should remain a unary node with the same field
    expect(optimized.nodeType).toBe("unary");
    expect(optimized.argument.field).toBe("active");
  });
});
