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
	let saveStatus = $state<'saved' | 'saving'>('saved');
	let saveTimeout: ReturnType<typeof setTimeout> | null = null;
	let showActionButtons = $state(false);

	// Placeholder for parsing functionality
	function parseCode() {
		// This functionality will be implemented later
		console.log('Parsing code:', simcCode);
	}

	// Handle editor changes
	function handleEditorChange(value: string) {
		simcCode = value;

		// Show saving indicator
		saveStatus = 'saving';

		// Clear previous timeout if exists
		if (saveTimeout) {
			clearTimeout(saveTimeout);
		}

		// Simulate auto-save after 1 second
		saveTimeout = setTimeout(() => {
			saveStatus = 'saved';
		}, 1000);
	}

	// Parse the initial code on mount
	onMount(() => {
		// Placeholder for parsing functionality

		// Add keyboard shortcut handling
		window.addEventListener('keydown', handleKeyboardShortcuts);

		return () => {
			window.removeEventListener('keydown', handleKeyboardShortcuts);
		};
	});

	// Handle keyboard shortcuts
	function handleKeyboardShortcuts(event: KeyboardEvent) {
		// Alt+1 for Text view
		if (event.altKey && event.key === '1') {
			setActiveTab('text');
		}
		// Alt+2 for Visual Tree view
		else if (event.altKey && event.key === '2') {
			setActiveTab('visual');
		}
	}

	// Switch between tabs
	function setActiveTab(tab: 'text' | 'visual') {
		activeTab = tab;
	}

	// Share code functionality (placeholder)
	function shareCode() {
		alert('Share functionality will be implemented soon');
	}

	// Run on Raider.io functionality (placeholder)
	function runOnRaiderIo() {
		alert('Run on Raider.io functionality will be implemented soon');
	}
</script>

<svelte:head>
	<title>{data.title}</title>
	<meta name="description" content={data.description} />
</svelte:head>

<div class="zen-content">
	<div class="zen-layout">
		<div
			class="editor-container"
			on:mouseenter={() => (showActionButtons = true)}
			on:mouseleave={() => (showActionButtons = false)}
		>
			<SimCEditor
				value={simcCode}
				placeholder="Enter SimC code here..."
				rows={16}
				onChange={handleEditorChange}
			/>

			<div class="action-buttons" class:visible={showActionButtons}>
				<button class="action-button share-button" on:click={shareCode} title="Share Code">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<circle cx="18" cy="5" r="3"></circle>
						<circle cx="6" cy="12" r="3"></circle>
						<circle cx="18" cy="19" r="3"></circle>
						<line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
						<line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
					</svg>
				</button>
				<button
					class="action-button raiderio-button"
					on:click={runOnRaiderIo}
					title="Run on Raider.io"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
						<polyline points="15 3 21 3 21 9"></polyline>
						<line x1="10" y1="14" x2="21" y2="3"></line>
					</svg>
				</button>
			</div>
		</div>

		<div class="view-container">
			<div class="view-tabs">
				<button
					class="zen-tab"
					class:active={activeTab === 'text'}
					on:click={() => setActiveTab('text')}
					aria-selected={activeTab === 'text'}
				>
					<span class="icon">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<line x1="21" y1="6" x2="3" y2="6"></line>
							<line x1="15" y1="12" x2="3" y2="12"></line>
							<line x1="17" y1="18" x2="3" y2="18"></line>
						</svg>
					</span>
					<span>Text</span>
					<span class="shortcut">Alt+1</span>
				</button>
				<button
					class="zen-tab"
					class:active={activeTab === 'visual'}
					on:click={() => setActiveTab('visual')}
					aria-selected={activeTab === 'visual'}
				>
					<span class="icon">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<polyline points="7 8 3 12 7 16"></polyline>
							<polyline points="17 8 21 12 17 16"></polyline>
							<line x1="14" y1="4" x2="10" y2="20"></line>
						</svg>
					</span>
					<span>Tree</span>
					<span class="shortcut">Alt+2</span>
				</button>
			</div>

			<div class="view-content">
				<p class="view-placeholder">
					The AST parser functionality is currently being updated to work with the latest web
					standards.
				</p>
			</div>
		</div>
	</div>

	<div class="controls-container">
		<div class="control-group">
			<label class="zen-checkbox">
				<input type="checkbox" disabled />
				<span>Optimize AST</span>
			</label>

			<button on:click={parseCode} class="zen-button" disabled>
				<span class="icon">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<polyline points="16 18 22 12 16 6"></polyline>
						<polyline points="8 6 2 12 8 18"></polyline>
					</svg>
				</span>
				<span>Parse Code</span>
			</button>

			<div
				class="save-status"
				class:saved={saveStatus === 'saved'}
				class:saving={saveStatus === 'saving'}
			>
				{saveStatus === 'saved' ? 'Changes saved' : 'Saving...'}
			</div>
		</div>
	</div>
</div>

<style>
	.zen-content {
		max-width: 1200px;
		margin: 0 auto;
		padding: var(--space-3);
		display: flex;
		flex-direction: column;
		height: calc(100vh - 6rem);
	}

	.zen-layout {
		display: flex;
		flex: 1;
		gap: var(--space-4);
		margin: var(--space-3) 0 var(--space-4) 0;
	}

	.editor-container {
		flex: 1;
		display: flex;
		align-items: stretch;
		position: relative;
	}

	.action-buttons {
		position: absolute;
		top: 10px;
		right: 10px;
		display: flex;
		flex-direction: column;
		gap: 8px;
		opacity: 0;
		transform: translateX(10px);
		transition:
			opacity 0.3s ease,
			transform 0.3s ease;
		z-index: 5;
	}

	.action-buttons.visible {
		opacity: 0.7;
		transform: translateX(0);
	}

	.action-button {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background-color: var(--card-bg);
		border: 1px solid var(--border-color);
		color: var(--text-color);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		transition: all var(--transition-fast);
	}

	.action-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
		opacity: 1;
	}

	.action-buttons:hover {
		opacity: 1;
	}

	.view-container {
		width: 40%;
		display: flex;
		flex-direction: column;
		border: 1px solid var(--border-color);
		border-radius: var(--border-radius-md);
		overflow: hidden;
		background-color: var(--card-bg);
		transition:
			opacity 0.3s ease,
			transform 0.3s ease;
		opacity: 0.95;
	}

	.view-container:hover {
		opacity: 1;
		transform: translateY(-1px);
	}

	.view-tabs {
		display: flex;
		border-bottom: 1px solid var(--border-color);
	}

	.zen-tab {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-2) var(--space-3);
		background: none;
		border: none;
		border-bottom: 2px solid transparent;
		color: var(--text-color);
		opacity: 0.7;
		font-size: 0.9rem;
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.zen-tab:hover {
		opacity: 0.9;
	}

	.zen-tab.active {
		opacity: 1;
		border-bottom-color: var(--primary);
	}

	.shortcut {
		font-size: 0.7rem;
		opacity: 0.5;
		margin-left: var(--space-2);
		padding: 0.1rem 0.3rem;
		background-color: rgba(0, 0, 0, 0.03);
		border-radius: 3px;
	}

	.view-content {
		flex: 1;
		padding: var(--space-4);
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: auto;
	}

	.view-placeholder {
		font-size: 0.9rem;
		color: var(--text-color);
		opacity: 0.5;
		text-align: center;
		max-width: 300px;
	}

	.controls-container {
		width: 100%;
		display: flex;
		justify-content: center;
		margin-bottom: var(--space-3);
	}

	.control-group {
		display: flex;
		align-items: center;
		gap: var(--space-4);
		opacity: 0.7;
	}

	.save-status {
		font-size: 0.8rem;
		opacity: 0.6;
		transition: opacity 0.3s ease;
	}

	.save-status.saving {
		opacity: 0.8;
	}

	.save-status.saved {
		opacity: 0.5;
	}

	.zen-checkbox {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		cursor: pointer;
		font-size: 0.9rem;
	}

	.zen-checkbox input[disabled] + span {
		opacity: 0.6;
	}

	.zen-button {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-2) var(--space-3);
		background-color: transparent;
		border: 1px solid var(--border-color);
		border-radius: var(--border-radius-md);
		color: var(--text-color);
		font-size: 0.9rem;
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.zen-button:hover:not([disabled]) {
		background-color: rgba(0, 0, 0, 0.03);
	}

	.zen-button[disabled] {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.icon {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	@media (max-width: 900px) {
		.zen-layout {
			flex-direction: column;
		}

		.view-container {
			width: 100%;
		}

		.control-group {
			flex-direction: column;
			gap: var(--space-3);
		}
	}
</style>
