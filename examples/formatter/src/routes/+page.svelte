<script lang="ts">
	import { onMount } from 'svelte';
	import type { TreeNodeData } from '$lib/types';

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
	let sidebarVisible = $state(true);

	// Handle textarea changes
	function handleTextareaChange(event: Event) {
		const target = event.target as HTMLTextAreaElement;
		simcCode = target.value;

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

	// Toggle sidebar visibility
	function toggleSidebar() {
		sidebarVisible = !sidebarVisible;
	}

	// Switch between tabs
	function setActiveTab(tab: 'text' | 'visual') {
		activeTab = tab;
	}

	// Parse code functionality (placeholder)
	function parseCode() {
		console.log('Parsing code:', simcCode);
	}

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
		// Alt+S for toggling sidebar
		else if (event.altKey && event.key === 's') {
			toggleSidebar();
		}
	}

	onMount(() => {
		// Add keyboard shortcut handling
		window.addEventListener('keydown', handleKeyboardShortcuts);

		return () => {
			window.removeEventListener('keydown', handleKeyboardShortcuts);
		};
	});
</script>

<svelte:head>
	<title>{data.title}</title>
	<meta name="description" content={data.description} />
</svelte:head>

<div class="app-container">
	<!-- Top Toolbar -->
	<div class="toolbar">
		<div class="toolbar-left">
			<button class="toolbar-button" on:click={parseCode}>
				<span class="icon">
					<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<polyline points="16 18 22 12 16 6"></polyline>
						<polyline points="8 6 2 12 8 18"></polyline>
					</svg>
				</span>
				<span>Parse</span>
			</button>
			
			<label class="toolbar-checkbox">
				<input type="checkbox" />
				<span>Optimize AST</span>
			</label>
		</div>
		
		<div class="toolbar-right">
			<div class="save-status" class:saved={saveStatus === 'saved'} class:saving={saveStatus === 'saving'}>
				{saveStatus === 'saved' ? 'Changes saved' : 'Saving...'}
			</div>
		</div>
	</div>

	<!-- Main Content Area -->
	<div class="content-area">
		<!-- Editor Area -->
		<div class="editor-area" class:full-width={!sidebarVisible}>
			<textarea
				class="editor-textarea"
				value={simcCode}
				placeholder="Enter SimC code here..."
				on:input={handleTextareaChange}
				spellcheck="false"
			></textarea>
		</div>

		<!-- Sidebar Toggle Button -->
		<button class="sidebar-toggle" on:click={toggleSidebar} title="Toggle Sidebar (Alt+S)">
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				{#if sidebarVisible}
					<polyline points="13 17 18 12 13 7"></polyline>
				{:else}
					<polyline points="11 17 6 12 11 7"></polyline>
				{/if}
			</svg>
		</button>

		<!-- Sidebar -->
		<div class="sidebar" class:visible={sidebarVisible}>
			<!-- Sidebar Tabs -->
			<div class="sidebar-tabs">
				<button
					class="sidebar-tab"
					class:active={activeTab === 'text'}
					on:click={() => setActiveTab('text')}
					aria-selected={activeTab === 'text'}
				>
					<span class="icon">
						<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<line x1="21" y1="6" x2="3" y2="6"></line>
							<line x1="15" y1="12" x2="3" y2="12"></line>
							<line x1="17" y1="18" x2="3" y2="18"></line>
						</svg>
					</span>
					<span>Text</span>
					<span class="shortcut">Alt+1</span>
				</button>
				<button
					class="sidebar-tab"
					class:active={activeTab === 'visual'}
					on:click={() => setActiveTab('visual')}
					aria-selected={activeTab === 'visual'}
				>
					<span class="icon">
						<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<polyline points="7 8 3 12 7 16"></polyline>
							<polyline points="17 8 21 12 17 16"></polyline>
							<line x1="14" y1="4" x2="10" y2="20"></line>
						</svg>
					</span>
					<span>Tree</span>
					<span class="shortcut">Alt+2</span>
				</button>
			</div>

			<!-- Sidebar Content -->
			<div class="sidebar-content">
				{#if activeTab === 'text'}
					<div class="sidebar-panel">
						<p class="placeholder-text">Text view panel placeholder</p>
					</div>
				{:else if activeTab === 'visual'}
					<div class="sidebar-panel">
						<p class="placeholder-text">Visual tree view panel placeholder</p>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	/* Main Container */
	.app-container {
		display: flex;
		flex-direction: column;
		height: 100vh;
		width: 100%;
		overflow: hidden;
		transition: background var(--transition-normal);
	}

	/* Top Toolbar */
	.toolbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem var(--space-3);
		border-bottom: 1px solid var(--border-color);
		background-color: var(--card-bg);
		box-shadow: 0 1px 3px var(--shadow-color);
		transition:
			background-color var(--transition-normal),
			border-color var(--transition-normal),
			box-shadow var(--transition-normal);
	}

	.toolbar-left, .toolbar-right {
		display: flex;
		align-items: center;
		gap: var(--space-3);
	}

	.toolbar-button {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.35rem 0.85rem;
		background-color: transparent;
		border: 1px solid var(--border-color);
		border-radius: var(--border-radius-md);
		color: var(--text-color);
		font-size: 0.85rem;
		cursor: pointer;
		transition:
			all var(--transition-normal),
			transform var(--transition-fast);
		position: relative;
		overflow: hidden;
		box-shadow: 0 1px 2px var(--shadow-color);
	}

	.toolbar-button::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: var(--hover-bg);
		opacity: 0;
		transition: opacity var(--transition-normal);
	}

	.toolbar-button:hover {
		border-color: var(--primary);
		transform: translateY(-1px);
		box-shadow: 0 2px 4px var(--shadow-color);
	}
	
	.toolbar-button:hover::before {
		opacity: 1;
	}
	
	.toolbar-button:active {
		transform: translateY(1px);
		box-shadow: 0 0 1px var(--shadow-color);
	}
	
	.toolbar-button .icon,
	.toolbar-button span:not(.icon) {
		position: relative;
		z-index: 1;
	}

	.toolbar-checkbox {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.85rem;
		cursor: pointer;
		padding: 0.35rem 0.5rem;
		border-radius: var(--border-radius-sm);
		transition: background-color var(--transition-normal);
	}
	
	.toolbar-checkbox:hover {
		background-color: var(--hover-bg);
	}
	
	.toolbar-checkbox input {
		accent-color: var(--primary);
	}

	.save-status {
		font-size: 0.8rem;
		opacity: 0.6;
		padding: 0.35rem 0.75rem;
		border-radius: var(--border-radius-md);
		background-color: var(--hover-bg);
		transition:
			opacity var(--transition-normal),
			background-color var(--transition-normal);
	}

	.save-status.saving {
		opacity: 0.9;
		animation: pulse 1.5s infinite ease-in-out;
	}

	.save-status.saved {
		opacity: 0.6;
	}
	
	@keyframes pulse {
		0% { opacity: 0.6; }
		50% { opacity: 0.9; }
		100% { opacity: 0.6; }
	}

	/* Content Area */
	.content-area {
		display: flex;
		flex: 1;
		position: relative;
		overflow: hidden;
		transition: background var(--transition-normal);
	}

	/* Editor Area */
	.editor-area {
		flex: 1;
		transition:
			width var(--transition-normal),
			background-color var(--transition-normal);
		width: 82%;
		height: 100%;
		position: relative;
	}

	.editor-area.full-width {
		width: 100%;
	}
	
	.editor-area::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		pointer-events: none;
		box-shadow: inset 0 0 0 1px var(--border-color);
		opacity: 0.5;
		transition: opacity var(--transition-normal), box-shadow var(--transition-normal);
	}

	.editor-textarea {
		width: 100%;
		height: 100%;
		padding: var(--space-4);
		border: none;
		resize: none;
		font-family: var(--font-mono, monospace);
		font-size: 0.95rem;
		line-height: 1.6;
		color: var(--text-color);
		background-color: var(--bg-color);
		outline: none;
		box-shadow: inset 0 1px 3px var(--shadow-color);
		transition:
			color var(--transition-normal),
			background-color var(--transition-normal),
			box-shadow var(--transition-normal);
	}
	
	.editor-textarea:focus {
		box-shadow: inset 0 1px 3px var(--shadow-color), 0 0 0 1px rgba(var(--primary), 0.2);
	}

	/* Sidebar Toggle Button */
	.sidebar-toggle {
		position: absolute;
		top: 50%;
		right: 18%;
		transform: translateY(-50%);
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background-color: var(--card-bg);
		border: 1px solid var(--border-color);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		z-index: 10;
		transition:
			right var(--transition-normal),
			background-color var(--transition-normal),
			border-color var(--transition-normal),
			box-shadow var(--transition-normal),
			transform var(--transition-fast);
		box-shadow: 0 2px 4px var(--shadow-color);
		color: var(--text-color);
	}

	.sidebar-toggle:hover {
		box-shadow: 0 3px 8px var(--shadow-color);
		background-color: var(--hover-bg);
		border-color: var(--primary);
		transform: translateY(-50%) scale(1.05);
	}
	
	.sidebar-toggle:active {
		transform: translateY(-50%) scale(0.95);
		box-shadow: 0 1px 2px var(--shadow-color);
	}

	.editor-area.full-width + .sidebar-toggle {
		right: 10px;
	}

	/* Sidebar */
	.sidebar {
		width: 18%;
		height: 100%;
		background-color: var(--card-bg);
		border-left: 1px solid var(--border-color);
		display: flex;
		flex-direction: column;
		transition:
			transform var(--transition-normal),
			background-color var(--transition-normal),
			border-color var(--transition-normal);
		transform: translateX(0);
		box-shadow: -1px 0 3px var(--shadow-color);
	}

	.sidebar:not(.visible) {
		transform: translateX(100%);
	}

	/* Sidebar Tabs */
	.sidebar-tabs {
		display: flex;
		border-bottom: 1px solid var(--border-color);
		background-color: var(--hover-bg);
		transition:
			background-color var(--transition-normal),
			border-color var(--transition-normal);
	}

	.sidebar-tab {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1rem;
		background: none;
		border: none;
		border-bottom: 2px solid transparent;
		color: var(--text-color);
		opacity: 0.7;
		font-size: 0.9rem;
		cursor: pointer;
		transition:
			all var(--transition-normal),
			transform var(--transition-fast);
		flex: 1;
		justify-content: center;
		position: relative;
		overflow: hidden;
	}
	
	.sidebar-tab::before {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 2px;
		background-color: var(--primary);
		transform: scaleX(0);
		transition: transform var(--transition-normal);
		transform-origin: center;
	}

	.sidebar-tab:hover {
		opacity: 0.9;
		background-color: var(--hover-bg);
	}
	
	.sidebar-tab:hover::before {
		transform: scaleX(0.5);
	}

	.sidebar-tab.active {
		opacity: 1;
		background-color: var(--active-bg);
	}
	
	.sidebar-tab.active::before {
		transform: scaleX(1);
	}

	.shortcut {
		font-size: 0.7rem;
		opacity: 0.5;
		margin-left: 0.5rem;
		padding: 0.1rem 0.3rem;
		background-color: var(--hover-bg);
		border-radius: var(--border-radius-sm);
		transition: background-color var(--transition-normal);
	}

	/* Sidebar Content */
	.sidebar-content {
		flex: 1;
		overflow: auto;
		transition: background-color var(--transition-normal);
	}

	.sidebar-panel {
		padding: var(--space-3);
		height: 100%;
		transition: background-color var(--transition-normal);
	}

	.placeholder-text {
		color: var(--text-color);
		opacity: 0.7;
		font-size: 1rem;
		text-align: center;
		margin-top: 3rem;
		padding: var(--space-4);
		border: 1px dashed var(--border-color);
		border-radius: var(--border-radius-md);
		background-color: var(--hover-bg);
		transition:
			color var(--transition-normal),
			border-color var(--transition-normal),
			background-color var(--transition-normal);
	}

	.icon {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* Responsive Adjustments */
	@media (max-width: 768px) {
		.editor-area {
			width: 75%;
		}
		
		.sidebar {
			width: 25%;
		}
		
		.sidebar-toggle {
			right: 25%;
		}
		
		.toolbar {
			padding: 0.5rem var(--space-2);
		}
		
		.toolbar-left, .toolbar-right {
			gap: var(--space-2);
		}
	}
</style>
