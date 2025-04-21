import { ParserRuleContext } from "antlr4ts/ParserRuleContext";

/**
 * Error class for visitor validation errors
 */
export class SimCVisitorError extends Error {
  constructor(
    message: string,
    public readonly context: ParserRuleContext,
  ) {
    super(message);
    this.name = "SimCVisitorError";
  }

  // Get source location info based on the context
  get location() {
    return {
      column: this.context.start.charPositionInLine,
      line: this.context.start.line,
    };
  }

  toString() {
    const { column, line } = this.location;
    return `${this.name} at ${line}:${column}: ${this.message}`;
  }
}
