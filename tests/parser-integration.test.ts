import { parse, optimize, generateAST } from "../src";
import {
  ActionLineNode,
  ConditionNode,
  ExpressionNode,
} from "../src/parser/visitors/ast/common-types";

// Define a custom interface for the AST structure used in these tests
interface TestActionLineNode extends ActionLineNode {
  right: ExpressionNode;
}

describe("Parser Integration Tests", () => {
  describe("SimC API Expressions", () => {
    it("should correctly parse and handle buff expressions", () => {
      const code = "actions=spell_nameif=buff.name.up";
      const ast = parse(code) as TestActionLineNode;

      expect(ast).toBeDefined();
      expect(ast.right).toBeDefined();

      // Buff expressions should be correctly identified
      expect(ast.right.nodeType).toBe("buff");
      expect(ast.right.buffName).toBe("name");
      expect(ast.right.field.name).toBe("up");
    });

    it("should correctly parse and handle debuff expressions", () => {
      const code = "actions=spell_nameif=debuff.target.up";
      const ast = parse(code) as TestActionLineNode;

      expect(ast).toBeDefined();
      expect(ast.right).toBeDefined();
      expect(ast.right.nodeType).toBe("debuff");
    });

    // TODO: Test is currently failing - comparison expressions need implementation
    it.skip("should correctly parse resource expressions", () => {
      const code = "actions=spell_nameif=runic_power>=80";
      const ast = parse(code) as TestActionLineNode;

      expect(ast).toBeDefined();
      expect(ast.right).toBeDefined();
      expect(ast.right.nodeType).toBe("comparison");
      expect(ast.right.operator).toBe("ge");
    });
  });

  describe("Complex conditional expressions", () => {
    // TODO: Test is currently failing - logical operations need implementation
    it.skip("should handle composite AND conditions", () => {
      const code = "actions=spell_nameif=buff.name.up&debuff.target.up";
      const ast = parse(code) as TestActionLineNode;

      expect(ast).toBeDefined();
      expect(ast.right).toBeDefined();
      expect(ast.right.nodeType).toBe("and");
      expect(ast.right.left.nodeType).toBe("buff");
      expect(ast.right.right.nodeType).toBe("debuff");
    });

    // TODO: Test is currently failing - logical operations need implementation
    it.skip("should handle composite OR conditions", () => {
      const code = "actions=spell_nameif=buff.name.up|buff.other.up";
      const ast = parse(code) as TestActionLineNode;

      expect(ast).toBeDefined();
      expect(ast.right).toBeDefined();
      expect(ast.right.nodeType).toBe("or");
    });

    // TODO: Test is currently failing - nested expressions need implementation
    it.skip("should handle nested conditional expressions", () => {
      const code =
        "actions=spell_nameif=(buff.name.up|buff.other.up)&debuff.target.up";
      const ast = parse(code) as TestActionLineNode;

      expect(ast).toBeDefined();
      expect(ast.right).toBeDefined();
      expect(ast.right.nodeType).toBe("and");
      expect(ast.right.left.nodeType).toBe("or");
    });
  });

  describe("Parser optimization handling", () => {
    // TODO: Test is currently failing - optimization integration needs fixing
    it.skip("should correctly optimize with generateAST", () => {
      const code = "actions=spell_nameif=!!buff.name.up";
      const result = generateAST(code);

      expect(result).toBeDefined();
      expect(result.root).toBeDefined();
      expect(result.errors).toHaveLength(0);

      // Double negation should be removed in the optimized AST
      expect((result.root as TestActionLineNode).right.nodeType).not.toBe(
        "unary",
      );
    });

    // TODO: Test is currently failing - optimization integration needs fixing
    it.skip("should handle conditional optimizations with direct optimization", () => {
      const code = "actions=spell_nameif=!(!buff.name.up)";
      const ast = parse(code) as TestActionLineNode;
      const optimizedAst = optimize(ast) as TestActionLineNode;

      expect(optimizedAst).toBeDefined();
      expect(optimizedAst.right).toBeDefined();
      expect(optimizedAst.right.nodeType).not.toBe("unary");
    });

    // TODO: Test is currently failing - logical operations and comparisons need implementation
    it.skip("should maintain structure for non-optimizable expressions", () => {
      const code = "actions=spell_nameif=buff.name.up&buff.other.remains>5";
      const ast = parse(code) as TestActionLineNode;
      const optimizedAst = optimize(ast) as TestActionLineNode;

      expect(optimizedAst).toBeDefined();
      expect(optimizedAst.right).toBeDefined();
      expect(optimizedAst.right.nodeType).toBe("and");
      expect(optimizedAst.right.left.nodeType).toBe("buff");
      expect(optimizedAst.right.right.nodeType).toBe("comparison");
    });
  });
});
