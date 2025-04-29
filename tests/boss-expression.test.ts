import { parse } from "../src";
import { ActionLineNode } from "../src/parser/visitors/ast/common-types";

describe("Boss Expression Node Tests", () => {
  it("should correctly parse standalone boss expression", () => {
    // Test with just the boss keyword
    const code = "actions=spell_name,if=boss";
    const ast = parse(code) as ActionLineNode;

    // Log the entire AST for debugging
    console.log("Full AST:", JSON.stringify(ast, null, 2));

    // Check if the AST is defined
    expect(ast).toBeDefined();

    // The action should have a condition
    const astAny = ast as any;
    expect(astAny.conditions).toBeDefined();
    expect(astAny.conditions.length).toBeGreaterThan(0);

    // Find the 'if' condition
    const ifCondition = astAny.conditions.find((c: any) => c.type === "if");
    expect(ifCondition).toBeDefined();
    expect(ifCondition.expression).toBeDefined();
    expect(ifCondition.expression.nodeType).toBe("boss");
  });

  it("should correctly parse boss in a logical expression", () => {
    // Test with boss in a logical expression
    const code = "actions=spell_name,if=foo&boss";
    const ast = parse(code) as ActionLineNode;

    // Log the entire AST for debugging
    console.log(
      "Full AST with logical expression:",
      JSON.stringify(ast, null, 2),
    );

    // Check if the AST is defined
    expect(ast).toBeDefined();

    // The action should have a condition
    const astAny = ast as any;
    expect(astAny.conditions).toBeDefined();
    expect(astAny.conditions.length).toBeGreaterThan(0);

    // Find the 'if' condition
    const ifCondition = astAny.conditions.find((c: any) => c.type === "if");
    expect(ifCondition).toBeDefined();
    expect(ifCondition.expression).toBeDefined();
    expect(ifCondition.expression.nodeType).toBe("and");

    // The right operand of the AND should be a boss expression
    expect(ifCondition.expression.right).toBeDefined();
    expect(ifCondition.expression.right.nodeType).toBe("boss");
  });
});
