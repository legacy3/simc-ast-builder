// Generic tree node type for visualization
export interface TreeNodeData {
	kind: string;
	nodeType?: string;
	children?: TreeNodeData[];
	[key: string]: any;
}

// Placeholder for the SimC AST Node type
export interface SimCASTNode {
	kind: string;
	nodeType?: string;
	children?: SimCASTNode[];
	[key: string]: any;
}
