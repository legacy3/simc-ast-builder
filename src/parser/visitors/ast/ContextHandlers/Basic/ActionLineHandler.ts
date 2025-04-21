import { ActionLineContext } from "../../../../antlr4/SimCExprParser";
import { ActionLineNode, ExpressionNode } from "../../common-types";
import { SimCGenericVisitor } from "../../SimCGenericVisitor";

// TODO Move this if even still needed
interface SimCAction {
  actionList: string;
  actionName: string;
  conditions: ExpressionNode[];
  originalLine: string;
  parameterNodes: Record<string, ExpressionNode>;
  parameters: Record<string, string>;
  rawNode: ActionLineNode;
}

/**
 * Handler for action line contexts
 */
function handleActionLine(
  ctx: ActionLineContext,
  visitor: SimCGenericVisitor
): ActionLineNode {
  // Get the parameter contexts
  const paramContexts = ctx.actionParam();

  // Process each parameter context to get the expression and parameter name
  const conditions = paramContexts.map((paramCtx) => {
    // Get the parameter name (identifier before the equals sign)
    const paramName = paramCtx.identifier().text;

    // Get the expression
    const expression = visitor.visit(paramCtx.expression()) as ExpressionNode;

    return {
      expression,
      kind: "condition" as const,
      type: paramName,
    };
  });

  let subList = ctx.sublistName()?.text;
  if (!subList) {
    subList = "default";
  }

  // Build parameters object for the action
  const parameters: Record<string, string> = {};
  const parameterNodes: Record<string, ExpressionNode> = {};

  paramContexts.forEach((paramCtx) => {
    const paramName = paramCtx.identifier().text;

    parameters[paramName] = paramCtx.expression().text;
    parameterNodes[paramName] = visitor.visit(
      paramCtx.expression()
    ) as ExpressionNode;
  });

  /*
  const action: SimCAction = {
    actionList: subList,
    actionName: ctx.actionName().text,
    conditions: conditions.map((c) => c.expression),
    originalLine: ctx.text,
    parameterNodes,
    parameters,
    rawNode: {
      conditions,
      kind: "actionLine",
      name: ctx.actionName().text,
      rawLine: ctx.text,
      subList,
    },
  };

  simcStore.addAction(action);
  */

  return {
    conditions,
    kind: "actionLine",
    name: ctx.actionName().text,
    rawLine: ctx.text,
    subList,
  };
}

export { handleActionLine };
