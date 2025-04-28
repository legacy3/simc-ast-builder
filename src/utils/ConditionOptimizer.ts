import deepEqual from "deep-equal";

import { ExpressionNode } from "../parser/visitors/ast/common-types";
import {
  AndExprExpressionNode,
  OrExprExpressionNode,
  UnaryExpressionNode,
} from "../parser/visitors/ast/ContextHandlers/Basic";
import { DEFAULT_OPTIMIZER_OPTIONS, OptimizerOptions } from "../types";

/**
 * A class that optimizes logical conditions in the AST before code generation.
 */
export class ConditionOptimizer {
  /**
   * Get the sort priority for a nodeType. Higher index = higher priority = earlier.
   * If not found, returns -1 (lowest priority).
   */
  static CONDITION_SORT_ORDER: string[] = [
    "variable",
    "talent",
    "equipped",
    "set_bonus",
    "stat",
    "resource",
    "cooldown",
    "action",
    "active_dot",
    "buff",
    "debuff",
    "dot",
  ];

  private options: OptimizerOptions;

  /**
   * Create a new ConditionOptimizer
   * @param options Optimization options
   */
  constructor(options: OptimizerOptions = DEFAULT_OPTIMIZER_OPTIONS) {
    // Merge with default options
    this.options = {
      ...DEFAULT_OPTIMIZER_OPTIONS,
      ...options,
    };
  }

  /**
   * Optimize an expression node by applying logical transformations
   * @param node The expression node to optimize
   * @returns The optimized expression node
   */
  optimize(node: ExpressionNode): ExpressionNode {
    // If optimizations are disabled overall, return the node unchanged
    if (this.options.enabled === false) {
      return node;
    }

    return this.applyOptimizations(node);
  }

  /**
   * Apply absorption laws to simplify expressions
   * - A && (A || B) → A
   * - A || (A && B) → A
   * @param node The node to simplify
   * @returns The simplified node
   */
  private applyAbsorptionLaws(node: ExpressionNode): ExpressionNode {
    // Process AND nodes
    if (this.isAndNode(node)) {
      const andNode = node as AndExprExpressionNode;

      // Process both sides first
      const processedLeft = this.applyAbsorptionLaws(andNode.left);
      const processedRight = this.applyAbsorptionLaws(andNode.right);

      // Check for A && (A || B) → A
      // Check if right operand is an OR node
      if (processedRight.nodeType === "or") {
        const orNode = processedRight as OrExprExpressionNode;

        // Check if left operand appears in the OR
        if (
          deepEqual(processedLeft, orNode.left) ||
          deepEqual(processedLeft, orNode.right)
        ) {
          return processedLeft;
        }
      }

      // Check for (A || B) && A → A
      // Check if left operand is an OR node
      if (processedLeft.nodeType === "or") {
        const orNode = processedLeft as OrExprExpressionNode;

        // Check if right operand appears in the OR
        if (
          deepEqual(processedRight, orNode.left) ||
          deepEqual(processedRight, orNode.right)
        ) {
          return processedRight;
        }
      }

      // If no simplification applies, return the AND node with processed operands
      return {
        ...andNode,
        left: processedLeft,
        right: processedRight,
      };
    }

    // Process OR nodes
    if (this.isOrNode(node)) {
      const orNode = node as OrExprExpressionNode;

      // Process both sides first
      const processedLeft = this.applyAbsorptionLaws(orNode.left);
      const processedRight = this.applyAbsorptionLaws(orNode.right);

      // Check for A || (A && B) → A
      // Check if right operand is an AND node
      if (processedRight.nodeType === "and") {
        const andNode = processedRight as AndExprExpressionNode;

        // Check if left operand appears in the AND
        if (
          deepEqual(processedLeft, andNode.left) ||
          deepEqual(processedLeft, andNode.right)
        ) {
          return processedLeft;
        }
      }

      // Check for (A && B) || A → A
      // Check if left operand is an AND node
      if (processedLeft.nodeType === "and") {
        const andNode = processedLeft as AndExprExpressionNode;

        // Check if right operand appears in the AND
        if (
          deepEqual(processedRight, andNode.left) ||
          deepEqual(processedRight, andNode.right)
        ) {
          return processedRight;
        }
      }

      // If no simplification applies, return the OR node with processed operands
      return {
        ...orNode,
        left: processedLeft,
        right: processedRight,
      };
    }

    // Process NOT nodes
    if (this.isNotNode(node)) {
      const notNode = node as UnaryExpressionNode;

      // Process the argument
      const processedArgument = this.applyAbsorptionLaws(notNode.argument);

      return {
        ...notNode,
        argument: processedArgument,
      };
    }

    // For other node types, return as is
    return node;
  }

  /**
   * Apply De Morgan's law to NOT expressions
   * !(A && B) -> !A || !B
   * !(A || B) -> !A && !B
   * @param node The node to transform
   * @returns The transformed node
   */
  private applyDeMorgansLaw(node: ExpressionNode): ExpressionNode {
    // If this is not a NOT node, recursively process its children
    if (!this.isNotNode(node)) {
      // For binary operators (AND, OR), process both sides
      if (node.nodeType === "and" || node.nodeType === "or") {
        const binaryNode = node as AndExprExpressionNode | OrExprExpressionNode;

        return {
          ...binaryNode,
          left: this.applyDeMorgansLaw(binaryNode.left),
          right: this.applyDeMorgansLaw(binaryNode.right),
        };
      }

      // For other node types, return as is
      return node;
    }

    // This is a NOT node
    const notNode = node as UnaryExpressionNode;
    const argument = notNode.argument;

    // Check if the argument is an AND or OR node
    if (argument.nodeType === "and" || argument.nodeType === "or") {
      const binaryNode = argument as
        | AndExprExpressionNode
        | OrExprExpressionNode;

      // Apply De Morgan's law
      const newOperator = argument.nodeType === "and" ? "or" : "and";

      // Create negated versions of the left and right operands
      const negatedLeft: UnaryExpressionNode = {
        argument: binaryNode.left,
        expressionType: "boolean",
        kind: "expression",
        nodeType: "unary",
        operator: "not",
      };

      const negatedRight: UnaryExpressionNode = {
        argument: binaryNode.right,
        expressionType: "boolean",
        kind: "expression",
        nodeType: "unary",
        operator: "not",
      };

      // Create a new binary node with the opposite operator and negated operands
      // If the new operator is "and", create an AND node
      if (newOperator === "and") {
        return {
          expressionType: "boolean",
          kind: "expression",
          left: this.applyDeMorgansLaw(negatedLeft),
          nodeType: "and",
          operator: "and",
          right: this.applyDeMorgansLaw(negatedRight),
        };
      }

      // If the new operator is "or", create an OR node
      return {
        expressionType: "boolean",
        kind: "expression",
        left: this.applyDeMorgansLaw(negatedLeft),
        nodeType: "or",
        operator: "or",
        right: this.applyDeMorgansLaw(negatedRight),
      };
    }

    // If not applicable, recursively process the argument
    return {
      ...notNode,
      argument: this.applyDeMorgansLaw(argument),
    };
  }

  /**
   * Apply all available optimizations to the node, respecting option flags
   * @param node The node to optimize
   * @returns The optimized node
   */
  private applyOptimizations(node: ExpressionNode): ExpressionNode {
    // Apply optimizations in sequence, but only if enabled
    let optimizedNode = node;

    // Apply double negation simplification
    if (this.options.doubleNegation) {
      optimizedNode = this.simplifyDoubleNegation(optimizedNode);
    }

    // Apply De Morgan's law
    if (this.options.deMorgansLaw) {
      optimizedNode = this.applyDeMorgansLaw(optimizedNode);
    }

    // Apply constants and identities simplification
    if (this.options.constantsAndIdentities) {
      optimizedNode = this.simplifyConstantsAndIdentities(optimizedNode);
    }

    // Apply complementary terms simplification
    if (this.options.complementaryTerms) {
      optimizedNode = this.simplifyComplementaryTerms(optimizedNode);
    }

    // Apply absorption laws
    if (this.options.absorptionLaws) {
      optimizedNode = this.applyAbsorptionLaws(optimizedNode);
    }

    // Flatten nested operations
    if (this.options.flattenNestedOperations) {
      optimizedNode = this.flattenNestedOperations(optimizedNode);
    }

    // Sort AND/OR conditions by priority (higher = earlier) if enabled
    if (this.options.conditionSorting) {
      optimizedNode = this.sortConditionsByPriority(optimizedNode);
    }

    // Eliminate common subexpressions
    if (this.options.commonSubexpressions) {
      optimizedNode = this.eliminateCommonSubexpressions(optimizedNode);
    }

    return optimizedNode;
  }

  /**
   * Check if two nodes are complementary terms (one is the negation of the other)
   * @param node1 First node to check
   * @param node2 Second node to check
   * @returns True if the nodes are complementary terms
   */
  private areComplementaryTerms(
    node1: ExpressionNode,
    node2: ExpressionNode,
  ): boolean {
    // Check if node1 is a NOT node and its argument is equal to node2
    if (this.isNotNode(node1)) {
      const notNode = node1 as UnaryExpressionNode;
      return deepEqual(notNode.argument, node2);
    }

    // Check if node2 is a NOT node and its argument is equal to node1
    if (this.isNotNode(node2)) {
      const notNode = node2 as UnaryExpressionNode;
      return deepEqual(notNode.argument, node1);
    }

    // Not complementary terms
    return false;
  }

  /**
   * Create a node representing the boolean value 'false' as a number (0)
   * @returns A number node with value 0
   */
  private createFalseNode(): ExpressionNode {
    return {
      expressionType: "numeric",
      kind: "expression",
      nodeType: "literal",
      value: "0",
    };
  }

  /**
   * Create a node representing the boolean value 'true' as a number (1)
   * @returns A number node with value 1
   */
  private createTrueNode(): ExpressionNode {
    return {
      expressionType: "numeric",
      kind: "expression",
      nodeType: "literal",
      value: "1",
    };
  }

  /**
   * Identify and eliminate common subexpressions
   * - (A && B) || (A && C) → A && (B || C)
   * - (A || B) && (A || C) → A || (B && C)
   * @param node The node to simplify
   * @returns The simplified node
   */
  private eliminateCommonSubexpressions(node: ExpressionNode): ExpressionNode {
    // Only process OR and AND nodes
    if (node.nodeType !== "or" && node.nodeType !== "and") {
      // For NOT nodes, process the argument
      if (this.isNotNode(node)) {
        const notNode = node as UnaryExpressionNode;

        return {
          ...notNode,
          argument: this.eliminateCommonSubexpressions(notNode.argument),
        };
      }

      // For other node types, return as is
      return node;
    }

    const binaryNode = node as AndExprExpressionNode | OrExprExpressionNode;

    // Process both sides first
    const processedLeft = this.eliminateCommonSubexpressions(binaryNode.left);
    const processedRight = this.eliminateCommonSubexpressions(binaryNode.right);

    // Check for common subexpressions
    if (node.nodeType === "or") {
      // Case: (A && B) || (A && C) → A && (B || C)
      if (
        processedLeft.nodeType === "and" &&
        processedRight.nodeType === "and"
      ) {
        const leftAndNode = processedLeft as AndExprExpressionNode;
        const rightAndNode = processedRight as AndExprExpressionNode;

        // Check if there's a common term in both AND expressions
        if (deepEqual(leftAndNode.left, rightAndNode.left)) {
          // Common term is on the left side of both AND expressions
          return {
            expressionType: "boolean",
            kind: "expression",
            left: leftAndNode.left,
            nodeType: "and",
            operator: "and",
            right: {
              expressionType: "boolean",
              kind: "expression",
              left: leftAndNode.right,
              nodeType: "or",
              operator: "or",
              right: rightAndNode.right,
            },
          };
        } else if (deepEqual(leftAndNode.left, rightAndNode.right)) {
          // Common term is on the left side of first AND and right side of second AND
          return {
            expressionType: "boolean",
            kind: "expression",
            left: leftAndNode.left,
            nodeType: "and",
            operator: "and",
            right: {
              expressionType: "boolean",
              kind: "expression",
              left: leftAndNode.right,
              nodeType: "or",
              operator: "or",
              right: rightAndNode.left,
            },
          };
        } else if (deepEqual(leftAndNode.right, rightAndNode.left)) {
          // Common term is on the right side of first AND and left side of second AND
          return {
            expressionType: "boolean",
            kind: "expression",
            left: leftAndNode.right,
            nodeType: "and",
            operator: "and",
            right: {
              expressionType: "boolean",
              kind: "expression",
              left: leftAndNode.left,
              nodeType: "or",
              operator: "or",
              right: rightAndNode.right,
            },
          };
        } else if (deepEqual(leftAndNode.right, rightAndNode.right)) {
          // Common term is on the right side of both AND expressions
          return {
            expressionType: "boolean",
            kind: "expression",
            left: leftAndNode.right,
            nodeType: "and",
            operator: "and",
            right: {
              expressionType: "boolean",
              kind: "expression",
              left: leftAndNode.left,
              nodeType: "or",
              operator: "or",
              right: rightAndNode.left,
            },
          };
        }
      }
    } else if (node.nodeType === "and") {
      // Case: (A || B) && (A || C) → A || (B && C)
      if (processedLeft.nodeType === "or" && processedRight.nodeType === "or") {
        const leftOrNode = processedLeft as OrExprExpressionNode;
        const rightOrNode = processedRight as OrExprExpressionNode;

        // Check if there's a common term in both OR expressions
        if (deepEqual(leftOrNode.left, rightOrNode.left)) {
          // Common term is on the left side of both OR expressions
          return {
            expressionType: "boolean",
            kind: "expression",
            left: leftOrNode.left,
            nodeType: "or",
            operator: "or",
            right: {
              expressionType: "boolean",
              kind: "expression",
              left: leftOrNode.right,
              nodeType: "and",
              operator: "and",
              right: rightOrNode.right,
            },
          };
        } else if (deepEqual(leftOrNode.left, rightOrNode.right)) {
          // Common term is on the left side of first OR and right side of second OR
          return {
            expressionType: "boolean",
            kind: "expression",
            left: leftOrNode.left,
            nodeType: "or",
            operator: "or",
            right: {
              expressionType: "boolean",
              kind: "expression",
              left: leftOrNode.right,
              nodeType: "and",
              operator: "and",
              right: rightOrNode.left,
            },
          };
        } else if (deepEqual(leftOrNode.right, rightOrNode.left)) {
          // Common term is on the right side of first OR and left side of second OR
          return {
            expressionType: "boolean",
            kind: "expression",
            left: leftOrNode.right,
            nodeType: "or",
            operator: "or",
            right: {
              expressionType: "boolean",
              kind: "expression",
              left: leftOrNode.left,
              nodeType: "and",
              operator: "and",
              right: rightOrNode.right,
            },
          };
        } else if (deepEqual(leftOrNode.right, rightOrNode.right)) {
          // Common term is on the right side of both OR expressions
          return {
            expressionType: "boolean",
            kind: "expression",
            left: leftOrNode.right,
            nodeType: "or",
            operator: "or",
            right: {
              expressionType: "boolean",
              kind: "expression",
              left: leftOrNode.left,
              nodeType: "and",
              operator: "and",
              right: rightOrNode.left,
            },
          };
        }
      }
    }

    // If no common subexpressions found, return the node with processed operands
    return {
      ...binaryNode,
      left: processedLeft,
      right: processedRight,
    };
  }

  /**
   * Flatten nested AND/OR expressions
   * - A && (B && C) → A && B && C
   * - A || (B || C) → A || B || C
   *
   * Note: Since our AST doesn't support nodes with more than two operands,
   * we'll restructure the binary tree to achieve the same logical effect.
   * @param node The node to flatten
   * @returns The flattened node
   */
  private flattenNestedOperations(node: ExpressionNode): ExpressionNode {
    // Process AND nodes
    if (node.nodeType === "and") {
      const andNode = node as AndExprExpressionNode;

      // Process both sides first
      const processedLeft = this.flattenNestedOperations(andNode.left);
      const processedRight = this.flattenNestedOperations(andNode.right);

      // Check if right operand is also an AND node
      if (processedRight.nodeType === "and") {
        const rightAndNode = processedRight as AndExprExpressionNode;

        // Restructure: A && (B && C) → (A && B) && C
        return {
          expressionType: "boolean",
          kind: "expression",
          left: {
            expressionType: "boolean",
            kind: "expression",
            left: processedLeft,
            nodeType: "and",
            operator: "and",
            right: rightAndNode.left,
          },
          nodeType: "and",
          operator: "and",
          right: rightAndNode.right,
        };
      }

      // If no flattening applies, return the AND node with processed operands
      return {
        ...andNode,
        left: processedLeft,
        right: processedRight,
      };
    }

    // Process OR nodes
    if (node.nodeType === "or") {
      const orNode = node as OrExprExpressionNode;

      // Process both sides first
      const processedLeft = this.flattenNestedOperations(orNode.left);
      const processedRight = this.flattenNestedOperations(orNode.right);

      // Check if right operand is also an OR node
      if (processedRight.nodeType === "or") {
        const rightOrNode = processedRight as OrExprExpressionNode;

        // Restructure: A || (B || C) → (A || B) || C
        return {
          expressionType: "boolean",
          kind: "expression",
          left: {
            expressionType: "boolean",
            kind: "expression",
            left: processedLeft,
            nodeType: "or",
            operator: "or",
            right: rightOrNode.left,
          },
          nodeType: "or",
          operator: "or",
          right: rightOrNode.right,
        };
      }

      // If no flattening applies, return the OR node with processed operands
      return {
        ...orNode,
        left: processedLeft,
        right: processedRight,
      };
    }

    // Process NOT nodes
    if (this.isNotNode(node)) {
      const notNode = node as UnaryExpressionNode;

      // Process the argument
      const processedArgument = this.flattenNestedOperations(notNode.argument);

      return {
        ...notNode,
        argument: processedArgument,
      };
    }

    // For other node types, return as is
    return node;
  }

  private getNodeTypePriority(nodeType: string): number {
    const sortOrder = ConditionOptimizer.CONDITION_SORT_ORDER;
    const idx = sortOrder.indexOf(nodeType);

    if (idx === -1) {
      // If not found, return -1 (lowest priority)
      return -1;
    }

    return sortOrder.length - idx;
  }

  /**
   * Check if a node is an AND operator node
   * @param node The node to check
   * @returns True if the node is an AND node
   */
  private isAndNode(node: ExpressionNode): boolean {
    return node.nodeType === "and";
  }

  /**
   * Check if a node is a NOT operator node (unary with "not" operator)
   * @param node The node to check
   * @returns True if the node is a NOT node
   */
  private isNotNode(node: ExpressionNode): boolean {
    return (
      node.nodeType === "unary" &&
      (node as UnaryExpressionNode).operator === "not"
    );
  }

  /**
   * Check if a node is an OR operator node
   * @param node The node to check
   * @returns True if the node is an OR node
   */
  private isOrNode(node: ExpressionNode): boolean {
    return node.nodeType === "or";
  }

  /**
   * Log the structure of an expression node for debugging
   * @param node The expression node to log
   * @param depth Current recursion depth (for indentation)
   */
  private logNodeStructure(node: ExpressionNode, depth = 0): void {
    const indent = "  ".repeat(depth);
    console.log(`${indent}Node Type: ${node.nodeType}`);

    // Log specific properties based on node type
    switch (node.nodeType) {
      case "and":
      case "or":
        const binaryNode = node as AndExprExpressionNode | OrExprExpressionNode;
        console.log(`${indent}Operator: ${binaryNode.operator}`);
        console.log(`${indent}Left:`);
        this.logNodeStructure(binaryNode.left, depth + 1);
        console.log(`${indent}Right:`);
        this.logNodeStructure(binaryNode.right, depth + 1);
        break;

      case "unary":
        const unaryNode = node as UnaryExpressionNode;
        console.log(`${indent}Operator: ${unaryNode.operator}`);
        console.log(`${indent}Argument:`);
        this.logNodeStructure(unaryNode.argument, depth + 1);
        break;

      default:
        console.log(`${indent}Expression Type: ${node.expressionType}`);
        break;
    }
  }

  /**
   * Simplify expressions with complementary terms
   * - A && !A → false
   * - A || !A → true
   * @param node The node to simplify
   * @returns The simplified node
   */
  private simplifyComplementaryTerms(node: ExpressionNode): ExpressionNode {
    // Process AND nodes
    if (node.nodeType === "and") {
      const andNode = node as AndExprExpressionNode;

      // Process both sides first
      const processedLeft = this.simplifyComplementaryTerms(andNode.left);
      const processedRight = this.simplifyComplementaryTerms(andNode.right);

      // Check if one operand is the negation of the other
      // A && !A → false or !A && A → false
      if (this.areComplementaryTerms(processedLeft, processedRight)) {
        return this.createFalseNode();
      }

      // If no simplification applies, return the AND node with processed operands
      return {
        ...andNode,
        left: processedLeft,
        right: processedRight,
      };
    }

    // Process OR nodes
    if (node.nodeType === "or") {
      const orNode = node as OrExprExpressionNode;

      // Process both sides first
      const processedLeft = this.simplifyComplementaryTerms(orNode.left);
      const processedRight = this.simplifyComplementaryTerms(orNode.right);

      // Check if one operand is the negation of the other
      // A || !A → true or !A || A → true
      if (this.areComplementaryTerms(processedLeft, processedRight)) {
        return this.createTrueNode();
      }

      // If no simplification applies, return the OR node with processed operands
      return {
        ...orNode,
        left: processedLeft,
        right: processedRight,
      };
    }

    // Process NOT nodes
    if (this.isNotNode(node)) {
      const notNode = node as UnaryExpressionNode;

      // Process the argument
      const processedArgument = this.simplifyComplementaryTerms(
        notNode.argument,
      );

      return {
        ...notNode,
        argument: processedArgument,
      };
    }

    // For other node types, return as is
    return node;
  }

  /**
   * Simplify expressions involving boolean constants and identical operands
   * - true && A → A
   * - false && A → false
   * - true || A → true
   * - false || A → A
   * - !true → false
   * - !false → true
   * - A && A → A
   * - A || A → A
   * @param node The node to simplify
   * @returns The simplified node
   */
  private simplifyConstantsAndIdentities(node: ExpressionNode): ExpressionNode {
    // Process NOT nodes with boolean literals
    if (this.isNotNode(node)) {
      const notNode = node as UnaryExpressionNode;

      // Process the argument first
      const processedArgument = this.simplifyConstantsAndIdentities(
        notNode.argument,
      );

      // Check if the argument is a number representing a boolean
      if (
        processedArgument.nodeType === "literal" &&
        processedArgument.expressionType === "numeric"
      ) {
        // !0 → 1, !non-zero → 0
        const value = processedArgument["value"];

        // Only "0" is considered false, any other value is considered true
        return value === "0" ? this.createTrueNode() : this.createFalseNode();
      }

      // If not a boolean literal, return the NOT node with processed argument
      return {
        ...notNode,
        argument: processedArgument,
      };
    }

    // Process AND nodes
    if (node.nodeType === "and") {
      const andNode = node as AndExprExpressionNode;

      // Process both sides first
      const processedLeft = this.simplifyConstantsAndIdentities(andNode.left);
      const processedRight = this.simplifyConstantsAndIdentities(andNode.right);

      // Check for boolean literals
      // false && A → false
      if (
        processedLeft.nodeType === "literal" &&
        processedLeft.expressionType === "numeric" &&
        processedLeft["value"] === "0"
      ) {
        return this.createFalseNode();
      }

      // A && false → false
      if (
        processedRight.nodeType === "literal" &&
        processedRight.expressionType === "numeric" &&
        processedRight["value"] === "0"
      ) {
        return this.createFalseNode();
      }

      // true && A → A (any non-zero value is considered true)
      if (
        processedLeft.nodeType === "literal" &&
        processedLeft.expressionType === "numeric" &&
        processedLeft["value"] !== "0"
      ) {
        return processedRight;
      }

      // A && true → A (any non-zero value is considered true)
      if (
        processedRight.nodeType === "literal" &&
        processedRight.expressionType === "numeric" &&
        processedRight["value"] !== "0"
      ) {
        return processedLeft;
      }

      // A && A → A (if both sides are identical)
      if (deepEqual(processedLeft, processedRight)) {
        return processedLeft;
      }

      // If no simplification applies, return the AND node with processed operands
      return {
        ...andNode,
        left: processedLeft,
        right: processedRight,
      };
    }

    // Process OR nodes
    if (node.nodeType === "or") {
      const orNode = node as OrExprExpressionNode;

      // Process both sides first
      const processedLeft = this.simplifyConstantsAndIdentities(orNode.left);
      const processedRight = this.simplifyConstantsAndIdentities(orNode.right);

      // Check for boolean literals
      // true || A → true (any non-zero value is considered true)
      if (
        processedLeft.nodeType === "literal" &&
        processedLeft.expressionType === "numeric" &&
        processedLeft["value"] !== "0"
      ) {
        return this.createTrueNode();
      }

      // A || true → true (any non-zero value is considered true)
      if (
        processedRight.nodeType === "literal" &&
        processedRight.expressionType === "numeric" &&
        processedRight["value"] !== "0"
      ) {
        return this.createTrueNode();
      }

      // false || A → A
      if (
        processedLeft.nodeType === "literal" &&
        processedLeft.expressionType === "numeric" &&
        processedLeft["value"] === "0"
      ) {
        return processedRight;
      }

      // A || false → A
      if (
        processedRight.nodeType === "literal" &&
        processedRight.expressionType === "numeric" &&
        processedRight["value"] === "0"
      ) {
        return processedLeft;
      }

      // A || A → A (if both sides are identical)
      if (deepEqual(processedLeft, processedRight)) {
        return processedLeft;
      }

      // If no simplification applies, return the OR node with processed operands
      return {
        ...orNode,
        left: processedLeft,
        right: processedRight,
      };
    }

    // For other node types, return as is
    return node;
  }

  /**
   * Simplify double negation (!!A -> A)
   * @param node The node to simplify
   * @returns The simplified node
   */
  private simplifyDoubleNegation(node: ExpressionNode): ExpressionNode {
    // If this is not a NOT node, recursively process its children
    if (!this.isNotNode(node)) {
      // For binary operators (AND, OR), process both sides
      if (node.nodeType === "and" || node.nodeType === "or") {
        const binaryNode = node as AndExprExpressionNode | OrExprExpressionNode;

        return {
          ...binaryNode,
          left: this.simplifyDoubleNegation(binaryNode.left),
          right: this.simplifyDoubleNegation(binaryNode.right),
        };
      }

      // For other node types, return as is
      return node;
    }

    // This is a NOT node
    const notNode = node as UnaryExpressionNode;
    const argument = notNode.argument;

    // Check if the argument is also a NOT node (double negation)
    if (this.isNotNode(argument)) {
      const innerNotNode = argument as UnaryExpressionNode;

      // Return the inner argument, effectively removing both NOT operations
      return this.simplifyDoubleNegation(innerNotNode.argument);
    }

    // If not a double negation, recursively process the argument
    return {
      ...notNode,
      argument: this.simplifyDoubleNegation(argument),
    };
  }

  /**
   * Recursively sorts AND/OR conditions by nodeType priority (higher = earlier).
   * Only sorts if more than 2 operands, otherwise just recurses.
   */
  private sortConditionsByPriority(node: ExpressionNode): ExpressionNode {
    if (node.nodeType !== "and" && node.nodeType !== "or") {
      return node;
    }

    const type = node.nodeType as "and" | "or";

    // Flatten all nodes of the same type
    const nodes: ExpressionNode[] = [];
    const flatten = (n: ExpressionNode) => {
      if (n.nodeType === type) {
        // @ts-ignore
        flatten(n.left);
        // @ts-ignore
        flatten(n.right);
      } else {
        nodes.push(n);
      }
    };
    flatten(node);

    if (nodes.length <= 2) {
      // No need to sort, just recursively process children
      // @ts-ignore
      return {
        ...node,
        left: this.sortConditionsByPriority(node["left"]),
        right: this.sortConditionsByPriority(node["right"]),
      };
    }

    // Sort by priority descending (higher index = earlier)
    nodes.sort((a, b) => {
      const prioA = this.getNodeTypePriority(a.nodeType);
      const prioB = this.getNodeTypePriority(b.nodeType);

      // Higher priority first
      return prioB - prioA;
    });

    // Recursively sort children
    const sorted = nodes.map((n) => this.sortConditionsByPriority(n));

    // Rebuild left-deep binary tree
    let tree = {
      expressionType: "boolean",
      kind: "expression",
      left: sorted[0],
      nodeType: type,
      operator: type,
      right: sorted[1],
    } as ExpressionNode;

    for (let i = 2; i < sorted.length; i++) {
      tree = {
        expressionType: "boolean",
        kind: "expression",
        left: tree,
        nodeType: type,
        operator: type,
        right: sorted[i],
      } as ExpressionNode;
    }

    return tree;
  }
}
