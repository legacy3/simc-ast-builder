<script lang="ts">
	import type { TreeNodeData } from '$lib/types';
	import TreeNode from './TreeNode.svelte';

	// Use type assertion to ensure TypeScript recognizes the node properties
	const { node } = $props<{ node: any }>();

	let expanded = $state(true);

	function toggleExpanded() {
		expanded = !expanded;
	}

	const properties = $derived(getNodeProperties(node));

	const nodeType = $derived(getNodeTypeDisplay(node));

	const children = $derived(getChildren(node));

	function getNodeProperties(node: any) {
		const props: Record<string, any> = {};
		for (const [key, value] of Object.entries(node)) {
			if (['kind', 'nodeType', 'children'].includes(key)) continue;
			if (typeof value === 'object' && value !== null) continue;
			props[key] = value;
		}
		return props;
	}

	function getNodeTypeDisplay(node: any) {
		if (node.kind === 'expression') {
			return `${node.kind}: ${node.nodeType}`;
		}
		return node.kind;
	}

	function getChildren(node: any) {
		const result: any[] = [];

		if (node.children && Array.isArray(node.children)) {
			node.children.forEach((child: any) => {
				if (child && typeof child === 'object') {
					result.push(child);
				}
			});
		}

		for (const [key, value] of Object.entries(node)) {
			if (key === 'children') continue;

			if (typeof value === 'object' && value !== null) {
				if (Array.isArray(value)) {
					if (value.length > 0) {
						result.push({
							kind: `${key} (${value.length})`,
							children: value
								.map((item: any, index: number) => {
									if (item && typeof item === 'object') {
										return item;
									} else if (item !== undefined) {
										return {
											kind: String(index),
											value: item
										};
									}
									return null;
								})
								.filter(Boolean)
						});
					}
				} else if (Object.keys(value).length > 0) {
					result.push({
						kind: key,
						...value
					});
				}
			}
		}

		return result;
	}

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
			<span class="node-type">{nodeType}</span>
		</div>

		{#if Object.keys(properties).length > 0}
			<div class="node-properties">
				{#each Object.entries(properties) as [key, value]}
					<div class="node-property">
						<span class="property-key">{key}:</span>
						<span class="property-value">{formatValue(value)}</span>
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
		margin-bottom: var(--space-2);
	}

	.tree-node-content {
		padding: var(--space-3);
		border-radius: var(--border-radius-sm);
		background-color: var(--card-bg);
		border: var(--border-width) solid var(--border-color);
		box-shadow: var(--shadow-sm);
		transition:
			background-color var(--transition-normal),
			border-color var(--transition-normal),
			box-shadow var(--transition-normal);
	}

	.node-header {
		display: flex;
		align-items: center;
	}

	.toggle-btn {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0 var(--space-1) 0 0;
		font-size: 0.75rem;
		margin-right: var(--space-2);
		height: auto;
		min-width: 1.5rem;
		color: var(--text-color);
		opacity: 0.7;
		transition: opacity var(--transition-fast);
	}

	.toggle-btn:hover {
		opacity: 1;
	}

	.tree-node-children {
		margin-left: var(--space-4);
		padding-left: var(--space-3);
		border-left: 2px solid var(--border-color);
		transition: border-color var(--transition-normal);
	}

	.node-properties {
		margin-top: var(--space-2);
		margin-left: var(--space-3);
	}

	.node-property {
		margin-bottom: var(--space-1);
		font-size: 0.9rem;
	}

	.node-type {
		color: var(--primary);
		font-weight: var(--font-weight-medium);
	}

	.property-key {
		color: var(--text-color);
		opacity: 0.7;
	}

	.property-value {
		color: var(--success);
		margin-left: var(--space-1);
	}

	.box {
		margin-bottom: var(--space-2);
		padding: var(--space-3);
		box-shadow: var(--shadow-sm);
	}

	@media (max-width: 768px) {
		.tree-node-content {
			padding: var(--space-2);
		}

		.node-properties {
			margin-left: var(--space-2);
		}

		.tree-node-children {
			margin-left: var(--space-3);
			padding-left: var(--space-2);
		}
	}
</style>
