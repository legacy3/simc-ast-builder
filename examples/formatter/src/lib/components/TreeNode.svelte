<script lang="ts">
	import type { TreeNodeData } from '$lib/types';
	import TreeNode from './TreeNode.svelte';

	// Props
	const { node } = $props<{ node: TreeNodeData }>();

	// State
	let expanded = $state(true);

	// Toggle expanded state
	function toggleExpanded() {
		expanded = !expanded;
	}

	// Get node properties excluding certain keys
	const properties = $derived(getNodeProperties(node));

	// Get node type display
	const nodeType = $derived(getNodeTypeDisplay(node));

	// Get children to display
	const children = $derived(getChildren(node));

	// Helper function to get node properties
	function getNodeProperties(node: TreeNodeData) {
		const props: Record<string, any> = {};
		for (const [key, value] of Object.entries(node)) {
			if (['kind', 'nodeType', 'children'].includes(key)) continue;
			if (typeof value === 'object' && value !== null) continue;
			props[key] = value;
		}
		return props;
	}

	// Helper function to get node type display
	function getNodeTypeDisplay(node: TreeNodeData) {
		if (node.kind === 'expression') {
			return `${node.kind}: ${node.nodeType}`;
		}
		return node.kind;
	}

	// Helper function to get children
	function getChildren(node: TreeNodeData) {
		const result: TreeNodeData[] = [];

		// Handle explicit children array
		if (node.children && Array.isArray(node.children)) {
			node.children.forEach((child: any) => {
				if (child && typeof child === 'object') {
					result.push(child as TreeNodeData);
				}
			});
		}

		// Handle nested objects as children
		for (const [key, value] of Object.entries(node)) {
			if (key === 'children') continue;

			if (typeof value === 'object' && value !== null) {
				if (Array.isArray(value)) {
					if (value.length > 0) {
						result.push({
							kind: `${key} (${value.length})`,
							children: value
								.map((item, index) => {
									if (item && typeof item === 'object') {
										return item as TreeNodeData;
									} else if (item !== undefined) {
										return {
											kind: String(index),
											value: item
										} as TreeNodeData;
									}
									return null;
								})
								.filter(Boolean) as TreeNodeData[]
						} as TreeNodeData);
					}
				} else if (Object.keys(value).length > 0) {
					result.push({
						kind: key,
						...value
					} as TreeNodeData);
				}
			}
		}

		return result;
	}

	// Format value for display
	function formatValue(value: any): string {
		if (value === null) return 'null';
		if (value === undefined) return 'undefined';
		if (typeof value === 'string') return `"${value}"`;
		return String(value);
	}
</script>

<div class="tree-node">
	<div class="tree-node-content box">
		<div class="node-header">
			{#if children.length > 0}
				<button class="toggle-btn button is-small" onclick={toggleExpanded}>
					{expanded ? '▼' : '►'}
				</button>
			{/if}
			<span class="node-type has-text-primary has-text-weight-bold">{nodeType}</span>
		</div>

		{#if Object.keys(properties).length > 0}
			<div class="node-properties mt-2">
				{#each Object.entries(properties) as [key, value]}
					<div class="node-property">
						<span class="property-key has-text-grey">{key}:</span>
						<span class="property-value has-text-success">{formatValue(value)}</span>
					</div>
				{/each}
			</div>
		{/if}
	</div>

	{#if expanded && children.length > 0}
		<div class="tree-node-children">
			{#each children as child}
				<TreeNode node={child} />
			{/each}
		</div>
	{/if}
</div>

<style>
	.tree-node {
		margin-bottom: 0.5rem;
	}

	.tree-node-content {
		padding: 0.75rem;
		border-radius: 4px;
		transition: background-color 0.2s ease;
	}

	.node-header {
		display: flex;
		align-items: center;
	}

	.toggle-btn {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0 0.25rem 0 0;
		font-size: 0.75rem;
		margin-right: 0.5rem;
		height: auto;
		min-width: 1.5rem;
	}

	.tree-node-children {
		margin-left: 1.5rem;
		padding-left: 1rem;
		border-left: 2px solid var(--border-color);
	}

	.node-properties {
		margin-top: 0.5rem;
		margin-left: 1rem;
	}

	.node-property {
		margin-bottom: 0.25rem;
	}

	.box {
		margin-bottom: 0.5rem;
		padding: 0.75rem;
		box-shadow: 0 0.125em 0.25em rgba(0, 0, 0, 0.1);
	}
</style>
