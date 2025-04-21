import { ExpressionContext } from "../../../../antlr4/SimCExprParser";
import { ExpressionNode } from "../../common-types";
import { SimCVisitorError } from "../../errors/SimCVisitorError";
import { SimCGenericVisitor } from "../../SimCGenericVisitor";
import { extractAccessParts } from "../../utils/fieldUtils";
import { contextHandlerRegistry } from "../ContextHandlerRegistry";

// TODO Fix this type
interface AccessExpressionNode extends ExpressionNode {
  /*
  nodeType: "access";
  parts: string[];
  rawText: string;
  */
}

/**
 * Handler for access expression contexts
 */
function handleAccessExpr(
  ctx: ExpressionContext,
  visitor: SimCGenericVisitor,
): AccessExpressionNode {
  // Extract all parts of the access pattern (e.g., buff.foo.up)
  let parts: string[] = extractAccessParts(ctx);

  // Defensive fallback: if only one part and it contains dots, split it again
  if (parts.length === 1) {
    const onlyPart = parts[0];
    if (typeof onlyPart === "string" && onlyPart.includes(".")) {
      const splitParts = onlyPart.split(".").filter((p) => p !== "");
      parts = splitParts;
    }
  }

  // Log the access parts for debugging
  // console.log(`Access parts: ${parts.join(", ")}`);

  // Handle empty parts
  if (parts.length === 0) {
    throw new SimCVisitorError("Empty access pattern", ctx);
  }

  // Always use the first part as the access type
  const accessType = parts[0];
  if (!accessType) {
    throw new SimCVisitorError("Missing access type", ctx);
  }

  // Use the access handler registry to process the access pattern
  // Dispatch to the specific access type handler (e.g., "Buff")
  const accessHandler = contextHandlerRegistry.getAccessHandler(
    accessType.toLowerCase() as any,
  );

  if (accessHandler) {
    return contextHandlerRegistry.dispatchAccess(
      accessType.toLowerCase() as any,
      ctx,
      visitor,
      parts,
    );
  }

  // Log the access pattern details for debugging
  console.error(`FAILED ACCESS: ${accessType}`);
  console.error(`FULL PATTERN: ${parts.join(".")}`);
  console.error(`CONTEXT TEXT: ${ctx.text}`);

  throw new SimCVisitorError(
    `No access handler found for type: ${accessType}`,
    ctx,
  );
}

export { handleAccessExpr, type AccessExpressionNode };
