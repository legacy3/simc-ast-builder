import { CharStreams, CommonTokenStream } from "antlr4ts";

import { ASTNode } from "../types";
import { ConditionOptimizer } from "../utils/ConditionOptimizer";
import { SimCExprLexer } from "./antlr4/SimCExprLexer";
import { SimCExprParser } from "./antlr4/SimCExprParser";
import { SimCGenericVisitor } from "./visitors/ast/SimCGenericVisitor";

/**
 * Main parser class for SimC files
 */
export class Parser {
  private optimizer: ConditionOptimizer;

  /**
   * Create a new Parser instance
   * @param optimizerOptions Options for the condition optimizer
   */
  constructor() {
    this.optimizer = new ConditionOptimizer();
  }

  /**
   * Parse a SimC string and return the AST
   *
   * @param input - The SimC code to parse
   * @returns The parsed AST node
   */
  parse(input: string): ASTNode {
    // Set up the lexer and parser
    const charStream = CharStreams.fromString(input.trim());
    const lexer = new SimCExprLexer(charStream);
    const tokenStream = new CommonTokenStream(lexer);
    const parser = new SimCExprParser(tokenStream);

    // Parse the input
    const parseTree = parser.parse();

    // Visit the parse tree to generate AST
    const visitor = new SimCGenericVisitor();
    return visitor.visit(parseTree);
  }

  /**
   * Parse a SimC string and optimize the resulting AST
   *
   * @param input - The SimC code to parse
   * @returns The optimized AST node
   */
  parseAndOptimize(input: string): ASTNode {
    const ast = this.parse(input);

    // Apply optimizations if this is an expression node
    if (ast.kind === "expression") {
      return this.optimizer.optimize(ast as any);
    }

    return ast;
  }
}
