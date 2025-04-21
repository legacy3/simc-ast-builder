/**
 * Detailed optimization options for the ConditionOptimizer
 */
export interface OptimizerOptions {
  /**
   * Apply absorption laws (A && (A || B) → A, A || (A && B) → A)
   */
  absorptionLaws?: boolean;

  /**
   * Eliminate common subexpressions ((A && B) || (A && C) → A && (B || C))
   */
  commonSubexpressions?: boolean;

  /**
   * Simplify complementary terms (A && !A → false, A || !A → true)
   */
  complementaryTerms?: boolean;

  /**
   * Simplify constants and identity operations (true && A → A, false || A → A, etc.)
   */
  constantsAndIdentities?: boolean;

  /**
   * Apply De Morgan's laws (!(A && B) → !A || !B)
   */
  deMorgansLaw?: boolean;

  /**
   * Simplify double negation (!!A → A)
   */
  doubleNegation?: boolean;

  /**
   * Overall enable/disable flag for all optimizations
   */
  enabled?: boolean;

  /**
   * Flatten nested operations (A && (B && C) → (A && B) && C)
   */
  flattenNestedOperations?: boolean;
}

/**
 * Default optimizer options with all optimizations enabled
 */
export const DEFAULT_OPTIMIZER_OPTIONS: OptimizerOptions = {
  absorptionLaws: true,
  commonSubexpressions: true,
  complementaryTerms: true,
  constantsAndIdentities: true,
  deMorgansLaw: true,
  doubleNegation: true,
  enabled: true,
  flattenNestedOperations: true,
};

export interface ActionLineNode extends ASTNode {
  action: string;
  kind: "actionLine";
  params?: ParameterNode[];
}

/**
 * Re-export AST node types
 *
 * Note: These are just placeholders that will be properly
 * connected to the actual AST node types once we move them.
 */
export interface ASTNode {
  [key: string]: any;
  kind: string;
}

export interface CommentLineNode extends ASTNode {
  content: string;
  kind: "commentLine";
}

export interface ConditionNode extends ExpressionNode {
  nodeType: "condition";
}

export interface ExpressionNode extends ASTNode {
  expressionType: string;
  kind: "expression";
  nodeType: string;
}

export interface ParameterNode extends ASTNode {
  kind: "parameter";
  name: string;
  value: ExpressionNode;
}

/**
 * Error information from the parser
 */
export interface ParserError {
  /**
   * Error message
   */
  message: string;

  /**
   * Position information (line and column), if available
   */
  position?: {
    line: number;
    column: number;
  };

  /**
   * Severity of the error
   */
  severity: "error" | "warning";
}

/**
 * Options for the parser
 */
export interface ParserOptions {
  /**
   * Optimization options for the condition optimizer
   */
  optimizations?: OptimizerOptions;
}

/**
 * Result of parsing SimC code
 */
export interface SyntaxTree {
  /**
   * Any errors encountered during parsing
   */
  errors?: ParserError[];

  /**
   * The root node of the AST
   */
  root: ASTNode;
}
