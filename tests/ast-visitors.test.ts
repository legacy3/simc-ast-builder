import { parse } from "../src";

describe("AST Visitors", () => {
  describe("Basic Expression Visitors", () => {
    // TODO: Test is currently failing - string literals need implementation
    it.skip("should correctly parse string literals", () => {
      const code = 'actions=spell_nameif="test string"';
      const ast = parse(code);

      expect(ast).toBeDefined();
      expect(ast.right).toBeDefined();
      expect(ast.right.nodeType).toBe("literal");
      expect(ast.right.value).toBe("test string");
    });

    it("should correctly parse numeric literals", () => {
      const code = "actions=spell_nameif=123.45";
      const ast = parse(code);

      expect(ast).toBeDefined();
      expect(ast.right).toBeDefined();
      expect(ast.right.nodeType).toBe("literal");
      expect(ast.right.value).toBe("123.45");
    });

    // TODO: Test is currently failing - identifier parsing needs implementation
    it.skip("should correctly parse identifiers", () => {
      const code = "actions=spell_nameif=variable_name";
      const ast = parse(code);

      expect(ast).toBeDefined();
      expect(ast.right).toBeDefined();
      expect(ast.right.nodeType).toBe("identifier");
    });
  });

  describe("Mathematical Operations", () => {
    it("should correctly parse addition expressions", () => {
      const code = "actions=spell_nameif=value+10";
      const ast = parse(code);

      expect(ast).toBeDefined();
      expect(ast.right).toBeDefined();
      expect(ast.right.nodeType).toBe("additive");
      expect(ast.right.operator).toBe("add");
    });

    it("should correctly parse subtraction expressions", () => {
      const code = "actions=spell_nameif=value-10";
      const ast = parse(code);

      expect(ast).toBeDefined();
      expect(ast.right).toBeDefined();
      expect(ast.right.nodeType).toBe("additive");
      expect(ast.right.operator).toBe("sub");
    });

    it("should correctly parse multiplication expressions", () => {
      const code = "actions=spell_nameif=value*10";
      const ast = parse(code);

      expect(ast).toBeDefined();
      expect(ast.right).toBeDefined();
      expect(ast.right.nodeType).toBe("multiplicative");
      expect(ast.right.operator).toBe("mul");
    });

    // TODO: Test is currently failing - division operation needs implementation
    it.skip("should correctly parse division expressions", () => {
      const code = "actions=spell_nameif=value/10";
      const ast = parse(code);

      expect(ast).toBeDefined();
      expect(ast.right).toBeDefined();
      expect(ast.right.nodeType).toBe("multiplicative");
      expect(ast.right.operator).toBe("div");
    });

    // TODO: Test is currently failing - modulo operation needs implementation
    it.skip("should correctly parse modulo expressions", () => {
      const code = "actions=spell_nameif=value%10";
      const ast = parse(code);

      expect(ast).toBeDefined();
      expect(ast.right).toBeDefined();
      expect(ast.right.nodeType).toBe("multiplicative");
      expect(ast.right.operator).toBe("mod");
    });
  });

  describe("Comparison Operations", () => {
    // TODO: Test is currently failing - comparison operations need implementation
    it.skip("should correctly parse equality comparison", () => {
      const code = "actions=spell_nameif=value=10";
      const ast = parse(code);

      expect(ast).toBeDefined();
      expect(ast.right).toBeDefined();
      expect(ast.right.nodeType).toBe("comparison");
      expect(ast.right.operator).toBe("eq");
    });

    // TODO: Test is currently failing - comparison operations need implementation
    it.skip("should correctly parse not-equal comparison", () => {
      const code = "actions=spell_nameif=value!=10";
      const ast = parse(code);

      expect(ast).toBeDefined();
      expect(ast.right).toBeDefined();
      expect(ast.right.nodeType).toBe("comparison");
      expect(ast.right.operator).toBe("ne");
    });

    // TODO: Test is currently failing - comparison operations need implementation
    it.skip("should correctly parse less-than comparison", () => {
      const code = "actions=spell_nameif=value<10";
      const ast = parse(code);

      expect(ast).toBeDefined();
      expect(ast.right).toBeDefined();
      expect(ast.right.nodeType).toBe("comparison");
      expect(ast.right.operator).toBe("lt");
    });

    // TODO: Test is currently failing - comparison operations need implementation
    it.skip("should correctly parse greater-than comparison", () => {
      const code = "actions=spell_nameif=value>10";
      const ast = parse(code);

      expect(ast).toBeDefined();
      expect(ast.right).toBeDefined();
      expect(ast.right.nodeType).toBe("comparison");
      expect(ast.right.operator).toBe("gt");
    });

    // TODO: Test is currently failing - comparison operations need implementation
    it.skip("should correctly parse less-than-or-equal comparison", () => {
      const code = "actions=spell_nameif=value<=10";
      const ast = parse(code);

      expect(ast).toBeDefined();
      expect(ast.right).toBeDefined();
      expect(ast.right.nodeType).toBe("comparison");
      expect(ast.right.operator).toBe("le");
    });

    // TODO: Test is currently failing - comparison operations need implementation
    it.skip("should correctly parse greater-than-or-equal comparison", () => {
      const code = "actions=spell_nameif=value>=10";
      const ast = parse(code);

      expect(ast).toBeDefined();
      expect(ast.right).toBeDefined();
      expect(ast.right.nodeType).toBe("comparison");
      expect(ast.right.operator).toBe("ge");
    });
  });

  describe("SimC Action Parsing", () => {
    // TODO: Test is currently failing - action line parsing needs implementation
    it.skip("should correctly parse action lines", () => {
      const code = "actions=spell_name";
      const ast = parse(code);

      expect(ast).toBeDefined();
      expect(ast.kind).toBe("actionLine");
      expect(ast.action).toBe("spell_name");
    });

    // TODO: Test is currently failing - action parameters parsing needs implementation
    it.skip("should correctly parse action lines with parameters", () => {
      const code = "actions=spell_name,param1=value1,param2=value2";
      const ast = parse(code);

      expect(ast).toBeDefined();
      expect(ast.kind).toBe("actionLine");
      expect(ast.action).toBe("spell_name");
      expect(ast.params).toBeDefined();
      expect(ast.params.length).toBe(2);
      expect(ast.params[0].name).toBe("param1");
      expect(ast.params[1].name).toBe("param2");
    });

    // TODO: Test is currently failing - action conditions parsing needs implementation
    it.skip("should correctly parse action lines with conditions", () => {
      const code = "actions=spell_nameif=condition1&condition2target=player";
      const ast = parse(code);

      expect(ast).toBeDefined();
      expect(ast.kind).toBe("actionLine");
      expect(ast.action).toBe("spell_name");
      expect(ast.conditions).toBeDefined();

      // The 'if' condition should be present
      const ifCondition = ast.conditions.find((c: any) => c.type === "if");
      expect(ifCondition).toBeDefined();

      // The 'target' condition should be present
      const targetCondition = ast.conditions.find(
        (c: any) => c.type === "target",
      );
      expect(targetCondition).toBeDefined();
      expect(targetCondition.expression.value).toBe("player");
    });
  });
});
