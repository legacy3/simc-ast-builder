import { CommentLineContext } from "../../../../antlr4/SimCExprParser";
import { CommentLineNode } from "../../common-types";
import { SimCGenericVisitor } from "../../SimCGenericVisitor";

function handleCommentLine(
  ctx: CommentLineContext,
  visitor: SimCGenericVisitor,
): CommentLineNode {
  // Extract the comment text from the context
  const commentToken = ctx.COMMENT();
  const commentText = commentToken ? commentToken.text : "";

  // Create and return a comment line node
  return {
    comment: commentText.replace(/^#\s*/, ""),
    kind: "commentLine",
  };
}

export { handleCommentLine };
