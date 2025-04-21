import { ActionParamContext } from "../../../../antlr4/SimCExprParser";
import { ExpressionNode, ParameterType } from "../../common-types";
import { ParameterNode } from "../../common-types";
import { SimCGenericVisitor } from "../../SimCGenericVisitor";

function handleActionParam(
  ctx: ActionParamContext,
  visitor: SimCGenericVisitor,
): ParameterNode {
  return {
    kind: "parameter",
    op: ctx.identifier().text as ParameterType,
    value: visitor.visit(ctx.expression()) as ExpressionNode,
  };
}

export { handleActionParam };
