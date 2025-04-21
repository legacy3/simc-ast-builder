/**
 * Detailed optimization options for the ConditionOptimizer
 */
export interface OptimizerOptions {
  /**
   * Overall enable/disable flag for all optimizations
   */
  enabled?: boolean;
  
  /**
   * Simplify double negation (!!A → A)
   */
  doubleNegation?: boolean;
  
  /**
   * Apply De Morgan's laws (!(A && B) → !A || !B)
   */
  deMorgansLaw?: boolean;
  
  /**
   * Simplify constants and identity operations (true && A → A, false || A → A, etc.)
   */
  constantsAndIdentities?: boolean;
  
  /**
   * Simplify complementary terms (A && !A → false, A || !A → true)
   */
  complementaryTerms?: boolean;
  
  /**
   * Apply absorption laws (A && (A || B) → A, A || (A && B) → A)
   */
  absorptionLaws?: boolean;
  
  /**
   * Flatten nested operations (A && (B && C) → (A && B) && C)
   */
  flattenNestedOperations?: boolean;
  
  /**
   * Eliminate common subexpressions ((A && B) || (A && C) → A && (B || C))
   */
  commonSubexpressions?: boolean;
}

/**
 * Default optimizer options with all optimizations enabled
 */
export const DEFAULT_OPTIMIZER_OPTIONS: OptimizerOptions = {
  enabled: true,
  doubleNegation: true,
  deMorgansLaw: true,
  constantsAndIdentities: true,
  complementaryTerms: true,
  absorptionLaws: true,
  flattenNestedOperations: true,
  commonSubexpressions: true
};

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
   * The root node of the AST
   */
  root: ASTNode;
  
  /**
   * Any errors encountered during parsing
   */
  errors?: ParserError[];
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
  severity: 'error' | 'warning';
}

/**
 * Re-export AST node types
 * 
 * Note: These are just placeholders that will be properly
 * connected to the actual AST node types once we move them.
 */
export interface ASTNode {
  kind: string;
  [key: string]: any;
}

export interface ActionLineNode extends ASTNode {
  kind: 'actionLine';
  action: string;
  params?: ParameterNode[];
}

export interface ExpressionNode extends ASTNode {
  kind: 'expression';
  expressionType: string;
  nodeType: string;
}

export interface ConditionNode extends ExpressionNode {
  nodeType: 'condition';
}

export interface ParameterNode extends ASTNode {
  kind: 'parameter';
  name: string;
  value: ExpressionNode;
}

export interface CommentLineNode extends ASTNode {
  kind: 'commentLine';
  content: string;
}
