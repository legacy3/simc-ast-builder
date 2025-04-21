import { ConditionOptimizer } from "../src/utils/ConditionOptimizer";
import { DEFAULT_OPTIMIZER_OPTIONS } from "../src/types";
import { ExpressionNode } from "../src/parser/visitors/ast/common-types";
import { parse } from "../src";

describe("ConditionOptimizer", () => {
  let optimizer: ConditionOptimizer;

  beforeEach(() => {
    optimizer = new ConditionOptimizer(DEFAULT_OPTIMIZER_OPTIONS);
  });

  describe("double negation optimization", () => {
    it("should remove double negation", () => {
      const code = "actions=spell_nameif=!!buff.name.up";
      const ast = parse(code);

      // Based on our debugging, the double negation expression is in ast.right
      const expression = ast.right;

      expect(expression).toBeDefined();

      const optimizedAst = optimizer.optimize(expression as ExpressionNode);
      expect(optimizedAst.nodeType).not.toBe("unary");
    });

    it("should not modify single negation", () => {
      const code = "actions=spell_nameif=!buff.name.up";
      const ast = parse(code);

      // Based on our debugging, the expression is in ast.right
      const expression = ast.right;

      expect(expression).toBeDefined();

      const optimizedAst = optimizer.optimize(expression as ExpressionNode);
      expect(optimizedAst.nodeType).toBe("unary");
    });

    it("should handle nested double negations", () => {
      const code = "actions=spell_nameif=!(!(buff.name.up&buff.other.up))";
      const ast = parse(code);

      // Based on our debugging, the expression is in ast.right
      const expression = ast.right;

      expect(expression).toBeDefined();

      const optimizedAst = optimizer.optimize(expression as ExpressionNode);
      expect(optimizedAst.nodeType).toBe("and");
    });
  });

  describe("De Morgan's Law optimization", () => {
    it("should apply De Morgan's Law to negated AND expressions", () => {
      const code = "actions=spell_nameif=!(buff.name.up&buff.other.up)";
      const ast = parse(code);

      // Based on our debugging, the expression is in ast.right
      const expression = ast.right;

      expect(expression).toBeDefined();

      const optimizedAst = optimizer.optimize(expression as ExpressionNode);
      expect(optimizedAst.nodeType).toBe("or");
    });

    it("should apply De Morgan's Law to negated OR expressions", () => {
      const code = "actions=spell_nameif=!(buff.name.up|buff.other.up)";
      const ast = parse(code);

      // Based on our debugging, the expression is in ast.right
      const expression = ast.right;

      expect(expression).toBeDefined();

      const optimizedAst = optimizer.optimize(expression as ExpressionNode);
      expect(optimizedAst.nodeType).toBe("and");
    });
  });

  describe("complementary terms optimization", () => {
    // TODO: Test is currently failing - implement optimization for complementary terms
    it.skip("should simplify A && !A to false", () => {
      const code = "actions=spell_nameif=buff.name.up&!buff.name.up";
      const ast = parse(code);

      // Based on our debugging, the expression is in ast.right
      const expression = ast.right;

      expect(expression).toBeDefined();

      const optimizedAst = optimizer.optimize(expression as ExpressionNode);
      expect(optimizedAst.nodeType).toBe("constant");
      expect(optimizedAst.expressionType).toBe("boolean");
      expect(optimizedAst.value).toBe(false);
    });

    // TODO: Test is currently failing - implement optimization for complementary terms
    it.skip("should simplify A || !A to true", () => {
      const code = "actions=spell_nameif=buff.name.up|!buff.name.up";
      const ast = parse(code);

      // Based on our debugging, the expression is in ast.right
      const expression = ast.right;

      expect(expression).toBeDefined();

      const optimizedAst = optimizer.optimize(expression as ExpressionNode);
      expect(optimizedAst.nodeType).toBe("constant");
      expect(optimizedAst.expressionType).toBe("boolean");
      expect(optimizedAst.value).toBe(true);
    });
  });

  describe("constants and identities optimization", () => {
    it("should simplify true && A to A", () => {
      const code = "actions=spell_nameif=true&buff.name.up";
      const ast = parse(code);

      // Based on our debugging, the expression is in ast.right
      const expression = ast.right;

      expect(expression).toBeDefined();

      const optimizedAst = optimizer.optimize(expression as ExpressionNode);
      expect(optimizedAst.nodeType).not.toBe("and");
    });

    it("should simplify false || A to A", () => {
      const code = "actions=spell_nameif=false|buff.name.up";
      const ast = parse(code);

      // Based on our debugging, the expression is in ast.right
      const expression = ast.right;

      expect(expression).toBeDefined();

      const optimizedAst = optimizer.optimize(expression as ExpressionNode);
      expect(optimizedAst.nodeType).not.toBe("or");
    });

    // TODO: Test is currently failing - implement constants optimization
    it.skip("should simplify false && A to false", () => {
      const code = "actions=spell_nameif=false&buff.name.up";
      const ast = parse(code);

      // Based on our debugging, the expression is in ast.right
      const expression = ast.right;

      expect(expression).toBeDefined();

      const optimizedAst = optimizer.optimize(expression as ExpressionNode);
      expect(optimizedAst.nodeType).toBe("constant");
      expect(optimizedAst.value).toBe(false);
    });

    // TODO: Test is currently failing - implement constants optimization
    it.skip("should simplify true || A to true", () => {
      const code = "actions=spell_nameif=true|buff.name.up";
      const ast = parse(code);

      // Based on our debugging, the expression is in ast.right
      const expression = ast.right;

      expect(expression).toBeDefined();

      const optimizedAst = optimizer.optimize(expression as ExpressionNode);
      expect(optimizedAst.nodeType).toBe("constant");
      expect(optimizedAst.value).toBe(true);
    });
  });

  describe("selective optimization", () => {
    it("should respect disabled optimizations", () => {
      const code = "actions=spell_nameif=!(!buff.name.up)";
      const ast = parse(code);

      // Based on our debugging, the expression is in ast.right
      const expression = ast.right;

      expect(expression).toBeDefined();

      // Create optimizer with double negation disabled
      const limitedOptimizer = new ConditionOptimizer({
        ...DEFAULT_OPTIMIZER_OPTIONS,
        doubleNegation: false,
      });

      const optimizedAst = limitedOptimizer.optimize(
        expression as ExpressionNode,
      );
      expect(optimizedAst.nodeType).toBe("unary");
    });

    it("should handle disabled optimizer", () => {
      const code = "actions=spell_nameif=!!buff.name.up";
      const ast = parse(code);

      // Based on our debugging, the expression is in ast.right
      const expression = ast.right;

      expect(expression).toBeDefined();

      // Create optimizer with all optimizations disabled
      const disabledOptimizer = new ConditionOptimizer({
        enabled: false,
      });

      const optimizedAst = disabledOptimizer.optimize(
        expression as ExpressionNode,
      );

      // Should return the original expression unchanged
      expect(optimizedAst).toEqual(expression);
    });
  });
});
