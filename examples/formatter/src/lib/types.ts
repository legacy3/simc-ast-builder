/**
 * Type definitions for the SimC AST Formatter
 */

/**
 * Represents a node in the AST tree visualization
 */
export interface TreeNodeData {
	id: string;
	label: string;
	type: string;
	children?: TreeNodeData[];
	value?: string | number | boolean;
	expanded?: boolean;
}
