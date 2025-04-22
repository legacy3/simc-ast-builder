import { ParserRuleContext } from "antlr4ts/ParserRuleContext";

// Export types needed by other modules
export type ExpressionType = "boolean" | "numeric" | "neutral";

export interface FieldDefinition {
  displayName: string;
  simcName: string;
  type: ExpressionType;
}

/**
 * Extracts access parts from a parser context.
 * Always splits on dots, so "buff.foo.up" becomes ["buff", "foo", "up"].
 * This is written in a flat, explicit, and typesafe way for clarity.
 */
export function extractAccessParts(context: ParserRuleContext): string[] {
  const parts: string[] = [];

  for (let i = 0; i < context.childCount; i++) {
    const child = context.getChild(i);
    const text: string = child.text;

    // Skip dots, semicolons, and empty strings
    if (!text || text === "." || text === ";") {
      continue;
    }

    // If the text contains dots, split it into parts
    if (text.includes(".")) {
      const splitParts = text.split(".");
      for (const part of splitParts) {
        parts.push(part);
      }
    } else {
      parts.push(text);
    }
  }

  return parts;
}

/**
 * Returns the .text of the first non-undefined result from the provided field getter functions.
 * Usage: getFirstFieldText(ctx, ctx.OP_GT, ctx.OP_LT, ctx.OP_GE, ctx.OP_LE)
 */
export function getFirstFieldText(
  ...getters: Array<() => { text: string } | undefined>
): string | undefined {
  for (const getter of getters) {
    const token = getter();
    if (token) {
      return token.text;
    }
  }

  return undefined;
}
