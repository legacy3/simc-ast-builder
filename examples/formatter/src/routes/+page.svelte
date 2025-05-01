<script lang="ts">
	import { onMount } from 'svelte';
	import type { TreeNodeData } from '$lib/types';
	import SimCEditor from '$lib/components/SimCEditor.svelte';

	// Define the type for the data from page.ts
	interface PageData {
		title: string;
		description: string;
		defaultCode: string;
	}

	// Get data from page.ts
	const { data } = $props<{ data: PageData }>();

	// State variables using Svelte 5 runes
	let simcCode = $state(data.defaultCode);
	let activeTab = $state<'text' | 'visual'>('text'); // 'text' or 'visual'

	// Placeholder for parsing functionality
	function parseCode() {
		// This functionality will be implemented later
		console.log('Parsing code:', simcCode);
	}

	// Handle editor changes
	function handleEditorChange(value: string) {
		simcCode = value;
	}

	// Parse the initial code on mount
	onMount(() => {
		// Placeholder for parsing functionality
	});

	// Switch between tabs
	function setActiveTab(tab: 'text' | 'visual') {
		activeTab = tab;
	}
</script>

<svelte:head>
	<title>{data.title}</title>
	<meta name="description" content={data.description} />
</svelte:head>

<div class="content">
	<header class="mb-4 has-text-centered">
		<h1 class="title is-3 has-text-primary">{data.title}</h1>
		<p class="subtitle is-5">{data.description}</p>
	</header>

	<div class="card mb-4">
		<div class="card-content">
			<div class="mb-4">
				<label for="simc-input" class="label">SimC Code</label>
				<div class="monaco-editor-container">
					<SimCEditor
						value={simcCode}
						placeholder="Enter SimC code here..."
						rows={8}
						onChange={handleEditorChange}
					/>
				</div>
			</div>

			<div class="field is-grouped">
				<div class="control">
					<label class="checkbox">
						<input type="checkbox" disabled />
						Optimize AST (Coming Soon)
					</label>
				</div>

				<div class="control">
					<button onclick={parseCode} class="button is-primary" disabled>
						Parse Code (Coming Soon)
					</button>
				</div>
			</div>
		</div>
	</div>

	<div class="card">
		<header class="card-header">
			<div class="tabs">
				<ul>
					<li class:is-active={activeTab === 'text'}>
						<button
							class="button is-text"
							role="tab"
							aria-selected={activeTab === 'text'}
							onclick={() => setActiveTab('text')}
						>
							Text View
						</button>
					</li>
					<li class:is-active={activeTab === 'visual'}>
						<button
							class="button is-text"
							role="tab"
							aria-selected={activeTab === 'visual'}
							onclick={() => setActiveTab('visual')}
						>
							Visual Tree
						</button>
					</li>
				</ul>
			</div>
		</header>
		<div class="card-content">
			<div class="notification is-info">
				<p class="has-text-centered">
					<strong>Coming Soon!</strong>
				</p>
				<p>
					The AST parser functionality is currently being updated to work with the latest web
					standards. Check back soon for the full functionality.
				</p>
			</div>
		</div>
	</div>
</div>

<style>
	.monaco-editor-container {
		width: 100%;
		height: 200px;
		margin-bottom: 1rem;
	}

	.ast-tree {
		max-height: 600px;
		overflow: auto;
	}

	.visual-tree-container {
		width: 100%;
		height: 600px;
	}

	.tabs button.is-text {
		background: none;
		border: none;
		border-bottom: 2px solid transparent;
		border-radius: 0;
		padding: 0.5rem 1rem;
		cursor: pointer;
	}

	.tabs li.is-active button.is-text {
		border-bottom-color: var(--primary, #0d6efd);
		color: var(--primary, #0d6efd);
	}
</style>
