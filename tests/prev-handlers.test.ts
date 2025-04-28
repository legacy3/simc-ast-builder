import { parse } from "../src";
import {
  ActionLineNode,
  ConditionNode,
} from "../src/parser/visitors/ast/common-types";

describe("Prev Handlers", () => {
  describe("prev handler", () => {
    it("should handle prev with implicit index", () => {
      const code = "actions=spell_name,if=prev.spell_name";
      const ast = parse(code) as ActionLineNode;

      expect(ast).toBeDefined();
      expect(ast.kind).toBe("actionLine");
      expect(ast.conditions).toBeDefined();

      const ifCondition = ast.conditions.find(
        (c) => c.type === "if",
      ) as ConditionNode;
      expect(ifCondition).toBeDefined();
      expect(ifCondition.expression.nodeType).toBe("prev");
      expect(ifCondition.expression.actionName).toBe("spell_name");
      expect(ifCondition.expression.index).toBe(1); // Default index should be 1
    });

    it("should handle prev with explicit index", () => {
      const code = "actions=spell_name,if=prev.2.spell_name";
      const ast = parse(code) as ActionLineNode;

      expect(ast).toBeDefined();
      expect(ast.kind).toBe("actionLine");
      expect(ast.conditions).toBeDefined();

      const ifCondition = ast.conditions.find(
        (c) => c.type === "if",
      ) as ConditionNode;
      expect(ifCondition).toBeDefined();
      expect(ifCondition.expression.nodeType).toBe("prev");
      expect(ifCondition.expression.actionName).toBe("spell_name");
      expect(ifCondition.expression.index).toBe(2);
    });

    it("should handle prev with higher index", () => {
      const code = "actions=spell_name,if=prev.3.spell_name";
      const ast = parse(code) as ActionLineNode;

      expect(ast).toBeDefined();
      expect(ast.kind).toBe("actionLine");
      expect(ast.conditions).toBeDefined();

      const ifCondition = ast.conditions.find(
        (c) => c.type === "if",
      ) as ConditionNode;
      expect(ifCondition).toBeDefined();
      expect(ifCondition.expression.nodeType).toBe("prev");
      expect(ifCondition.expression.actionName).toBe("spell_name");
      expect(ifCondition.expression.index).toBe(3);
    });
  });

  describe("prev_gcd handler", () => {
    it("should handle prev_gcd with implicit index", () => {
      const code = "actions=spell_name,if=prev_gcd.spell_name";
      const ast = parse(code) as ActionLineNode;

      expect(ast).toBeDefined();
      expect(ast.kind).toBe("actionLine");
      expect(ast.conditions).toBeDefined();

      const ifCondition = ast.conditions.find(
        (c) => c.type === "if",
      ) as ConditionNode;
      expect(ifCondition).toBeDefined();
      expect(ifCondition.expression.nodeType).toBe("prev_gcd");
      expect(ifCondition.expression.actionName).toBe("spell_name");
      expect(ifCondition.expression.index).toBe(1); // Default index should be 1
    });

    it("should handle prev_gcd with explicit index", () => {
      const code = "actions=spell_name,if=prev_gcd.2.spell_name";
      const ast = parse(code) as ActionLineNode;

      expect(ast).toBeDefined();
      expect(ast.kind).toBe("actionLine");
      expect(ast.conditions).toBeDefined();

      const ifCondition = ast.conditions.find(
        (c) => c.type === "if",
      ) as ConditionNode;
      expect(ifCondition).toBeDefined();
      expect(ifCondition.expression.nodeType).toBe("prev_gcd");
      expect(ifCondition.expression.actionName).toBe("spell_name");
      expect(ifCondition.expression.index).toBe(2);
    });

    it("should handle prev_gcd with higher index", () => {
      const code = "actions=spell_name,if=prev_gcd.3.spell_name";
      const ast = parse(code) as ActionLineNode;

      expect(ast).toBeDefined();
      expect(ast.kind).toBe("actionLine");
      expect(ast.conditions).toBeDefined();

      const ifCondition = ast.conditions.find(
        (c) => c.type === "if",
      ) as ConditionNode;
      expect(ifCondition).toBeDefined();
      expect(ifCondition.expression.nodeType).toBe("prev_gcd");
      expect(ifCondition.expression.actionName).toBe("spell_name");
      expect(ifCondition.expression.index).toBe(3);
    });
  });

  describe("prev_off_gcd handler", () => {
    it("should handle prev_off_gcd with implicit index", () => {
      const code = "actions=spell_name,if=prev_off_gcd.spell_name";
      const ast = parse(code) as ActionLineNode;

      expect(ast).toBeDefined();
      expect(ast.kind).toBe("actionLine");
      expect(ast.conditions).toBeDefined();

      const ifCondition = ast.conditions.find(
        (c) => c.type === "if",
      ) as ConditionNode;
      expect(ifCondition).toBeDefined();
      expect(ifCondition.expression.nodeType).toBe("prev_off_gcd");
      expect(ifCondition.expression.actionName).toBe("spell_name");
      expect(ifCondition.expression.index).toBe(1); // Default index should be 1
    });

    it("should handle prev_off_gcd with explicit index", () => {
      const code = "actions=spell_name,if=prev_off_gcd.2.spell_name";
      const ast = parse(code) as ActionLineNode;

      expect(ast).toBeDefined();
      expect(ast.kind).toBe("actionLine");
      expect(ast.conditions).toBeDefined();

      const ifCondition = ast.conditions.find(
        (c) => c.type === "if",
      ) as ConditionNode;
      expect(ifCondition).toBeDefined();
      expect(ifCondition.expression.nodeType).toBe("prev_off_gcd");
      expect(ifCondition.expression.actionName).toBe("spell_name");
      expect(ifCondition.expression.index).toBe(2);
    });

    it("should handle prev_off_gcd with higher index", () => {
      const code = "actions=spell_name,if=prev_off_gcd.3.spell_name";
      const ast = parse(code) as ActionLineNode;

      expect(ast).toBeDefined();
      expect(ast.kind).toBe("actionLine");
      expect(ast.conditions).toBeDefined();

      const ifCondition = ast.conditions.find(
        (c) => c.type === "if",
      ) as ConditionNode;
      expect(ifCondition).toBeDefined();
      expect(ifCondition.expression.nodeType).toBe("prev_off_gcd");
      expect(ifCondition.expression.actionName).toBe("spell_name");
      expect(ifCondition.expression.index).toBe(3);
    });
  });
});
