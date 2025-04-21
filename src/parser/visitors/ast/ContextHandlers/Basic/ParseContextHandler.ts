import { ParserRuleContext } from "antlr4ts";

import { ASTNode } from "../../common-types";
import { SimCVisitorError } from "../../errors/SimCVisitorError";
import { SimCGenericVisitor } from "../../SimCGenericVisitor";

/**
 * Handler for the top-level parse context
 */
function handleParseContext(
  ctx: ParserRuleContext,
  visitor: SimCGenericVisitor,
): ASTNode {
  const children = ctx.children ?? [];

  // The first child should be the actual content (actionLine, commentLine, or expression)
  // The second child is typically the EOF token
  if (Array.isArray(children) && children.length > 0) {
    const contentChild = children[0];

    if (contentChild && contentChild instanceof ParserRuleContext) {
      return visitor.visit(contentChild);
    }
  }

  throw new SimCVisitorError(
    `Unexpected parse context structure: ${ctx.text}`,
    ctx,
  );
}

export { handleParseContext };
