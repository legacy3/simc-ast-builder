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
		animation: fade-in 0.3s ease-out forwards;
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
			box-shadow var(--transition-normal),
			transform var(--transition-normal);
	}

	.tree-node-content:hover {
		box-shadow: var(--shadow-md);
		transform: translateY(-1px);
		border-color: rgba(var(--primary), 0.3);
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
		transition: all var(--transition-fast);
		border-radius: 50%;
		width: 20px;
		height: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.toggle-btn:hover {
		opacity: 1;
		background-color: var(--hover-bg);
		color: var(--primary);
		transform: scale(1.1);
	}

	.toggle-btn:active {
		transform: scale(0.95);
	}

	.tree-node-children {
		margin-left: var(--space-4);
		padding-left: var(--space-3);
		border-left: 2px solid var(--border-color);
		transition: all var(--transition-normal);
		animation: slide-in-right 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
	}

	.tree-node:hover > .tree-node-children {
		border-left: 2px solid rgba(var(--primary), 0.4);
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
		transition: color var(--transition-normal);
		padding: 2px 6px;
		border-radius: var(--border-radius-sm);
		background-color: rgba(var(--primary), 0.05);
		display: inline-block;
	}

	.tree-node-content:hover .node-type {
		background-color: rgba(var(--primary), 0.1);
	}

	.property-key {
		color: var(--text-color);
		opacity: 0.7;
		transition: opacity var(--transition-normal);
	}

	.property-value {
		color: var(--success);
		margin-left: var(--space-1);
		transition: color var(--transition-normal);
		font-family: var(--font-mono);
		font-size: 0.85em;
	}

	.node-property:hover .property-key {
		opacity: 0.9;
	}

	.node-property:hover .property-value {
		color: color-mix(in srgb, var(--success), white 10%);
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
