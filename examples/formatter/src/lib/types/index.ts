export interface TreeNodeData {
	kind: string;
	nodeType?: string;
	children?: TreeNodeData[];
	id?: string;
	label?: string;
	type?: string;
	value?: any;
	[key: string]: any;
}

export interface SimCASTNode {
	kind: string;
	nodeType?: string;
	children?: SimCASTNode[];
	[key: string]: any;
}
