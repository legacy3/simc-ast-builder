<script lang="ts">
	import { onMount } from 'svelte';
	import type { TreeNodeData } from '$lib/types';
	import SimCEditor from '$lib/components/SimCEditor.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import { theme } from '$lib/stores/theme';

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
	let isMenuOpen = $state(false);

	// Handle editor changes
	function handleEditorChange(newValue: string) {
		simcCode = newValue;

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

	// Toggle mobile menu
	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	// Close menu when navigating or clicking outside
	function closeMenu() {
		isMenuOpen = false;
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
	<!-- Unified Header/Toolbar -->
	<div class="unified-header">
		<div class="header-left">
			<a href="/" class="logo-link">
				<h1 class="app-title">SimC AST Formatter</h1>
			</a>
		</div>

		<div class="header-center">
			<button class="toolbar-button" onclick={parseCode}>
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
				<span class="button-text">Parse</span>
			</button>

			<label class="toolbar-checkbox">
				<input type="checkbox" />
				<span>Optimize AST</span>
			</label>

			<div
				class="save-status"
				class:saved={saveStatus === 'saved'}
				class:saving={saveStatus === 'saving'}
			>
				{saveStatus === 'saved' ? 'Changes saved' : 'Saving...'}
			</div>
		</div>

		<div class="header-right">
			<ThemeToggle />

			<a
				class="github-link"
				href="https://github.com/simc-project/simc-ast-builder"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="View on GitHub"
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
						aria-hidden="true"
					>
						<path
							d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
						></path>
					</svg>
				</span>
			</a>

			<!-- Mobile menu button -->
			<button
				class="mobile-menu-button"
				onclick={toggleMenu}
				aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
				aria-expanded={isMenuOpen}
			>
				<span class="icon">
					{#if isMenuOpen}
						<!-- X icon for close -->
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<line x1="18" y1="6" x2="6" y2="18"></line>
							<line x1="6" y1="6" x2="18" y2="18"></line>
						</svg>
					{:else}
						<!-- Hamburger icon for open -->
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<line x1="3" y1="12" x2="21" y2="12"></line>
							<line x1="3" y1="6" x2="21" y2="6"></line>
							<line x1="3" y1="18" x2="21" y2="18"></line>
						</svg>
					{/if}
				</span>
			</button>
		</div>
	</div>

	<!-- Sidebar Toggle Button (only visible on small screens) -->
	<button class="sidebar-toggle-mobile" onclick={toggleSidebar} aria-label="Toggle sidebar">
		<span class="icon">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<line x1="3" y1="12" x2="21" y2="12"></line>
				<line x1="3" y1="6" x2="21" y2="6"></line>
				<line x1="3" y1="18" x2="21" y2="18"></line>
			</svg>
		</span>
	</button>

	<!-- Main Content Area -->
	<div class="content-area">
		<!-- Editor Area -->
		<div class="editor-area" class:full-width={!sidebarVisible}>
			<SimCEditor
				value={simcCode}
				placeholder="Enter SimC code here..."
				rows={20}
				onChange={handleEditorChange}
			/>
		</div>

		<!-- Sidebar Toggle Button (hidden on mobile) -->
		<button
			class="sidebar-toggle desktop-only"
			onclick={toggleSidebar}
			title="Toggle Sidebar (Alt+S)"
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
					onclick={() => setActiveTab('text')}
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
					class="sidebar-tab"
					class:active={activeTab === 'visual'}
					onclick={() => setActiveTab('visual')}
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

	/* Unified Header/Toolbar */
	.unified-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 var(--space-3);
		height: 3rem;
		border-bottom: 1px solid var(--border-color);
		background-color: var(--card-bg);
		box-shadow: 0 1px 3px var(--shadow-color);
		transition:
			background-color var(--transition-normal),
			border-color var(--transition-normal),
			box-shadow var(--transition-normal);
		z-index: var(--z-index-sticky);
	}

	.header-left,
	.header-center,
	.header-right {
		display: flex;
		align-items: center;
		gap: var(--space-3);
	}

	.header-left {
		min-width: 180px;
	}

	.header-center {
		flex: 1;
		justify-content: center;
	}

	.header-right {
		min-width: 180px;
		justify-content: flex-end;
	}

	.logo-link {
		text-decoration: none;
		color: inherit;
		position: relative;
		padding: 0.25rem 0;
		transition: transform var(--transition-fast);
	}

	.logo-link:hover {
		transform: translateY(-1px);
	}

	.logo-link:hover .app-title {
		opacity: 1;
	}

	.logo-link:hover::after {
		transform: scaleX(1);
		opacity: 0.5;
	}

	.logo-link::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 1px;
		background-color: var(--primary);
		transform: scaleX(0);
		opacity: 0;
		transform-origin: center;
		transition:
			transform 0.3s ease,
			opacity 0.3s ease;
	}

	.app-title {
		font-size: 0.95rem;
		font-weight: 500;
		color: var(--primary);
		opacity: 0.85;
		margin: 0;
		letter-spacing: 0.02em;
		transition:
			color var(--transition-normal),
			opacity var(--transition-normal);
	}

	.github-link {
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--text-color);
		opacity: 0.6;
		transition:
			opacity var(--transition-normal),
			transform var(--transition-fast),
			color var(--transition-normal);
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
	}

	.github-link:hover {
		opacity: 1;
		transform: translateY(-1px);
		color: var(--primary);
		background-color: var(--hover-bg);
	}

	.github-link:active {
		transform: translateY(1px);
	}

	.github-link .icon {
		display: flex;
		align-items: center;
		justify-content: center;
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
		0% {
			opacity: 0.6;
		}
		50% {
			opacity: 0.9;
		}
		100% {
			opacity: 0.6;
		}
	}

	/* Content Area */
	.content-area {
		display: flex;
		flex: 1;
		position: relative;
		overflow: hidden;
		transition: background var(--transition-normal);
		height: calc(
			100vh - 3rem
		); /* Explicit height calculation to ensure it fills the viewport minus unified header */
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
		display: flex; /* Added to ensure child elements can use flex properties */
		flex-direction: column; /* Stack children vertically */
	}

	.editor-area.full-width {
		width: 100%;
		transition: width var(--transition-normal) ease-in-out;
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
		transition:
			opacity var(--transition-normal),
			box-shadow var(--transition-normal);
	}

	/* Sidebar Toggle Button */
	.sidebar-toggle {
		position: absolute;
		top: 50%;
		right: 18%;
		transform: translateY(-50%);
		width: 36px;
		height: 36px;
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
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
		color: var(--text-color);
		padding: 0;
		overflow: hidden;
	}

	.sidebar-toggle svg {
		width: 14px;
		height: 14px;
		display: block;
		position: relative;
		left: 1px; /* Slight adjustment to center the arrow visually */
	}

	.sidebar-toggle:hover {
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
		background-color: var(--hover-bg);
		border-color: var(--primary);
		transform: translateY(-50%) scale(1.05);
	}

	.sidebar-toggle:active {
		transform: translateY(-50%) scale(0.95);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}

	.editor-area.full-width + .sidebar-toggle {
		right: 10px;
		transition: right var(--transition-normal) ease-in-out;
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
			width var(--transition-normal),
			background-color var(--transition-normal),
			border-color var(--transition-normal);
		transform: translateX(0);
		box-shadow: -1px 0 3px var(--shadow-color);
	}

	.sidebar:not(.visible) {
		transform: translateX(100%);
		width: 0;
		border-left: none;
		margin-left: 0;
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

	/* Mobile Menu Button */
	.mobile-menu-button {
		display: none;
		background: transparent;
		border: none;
		color: var(--text-color);
		cursor: pointer;
		padding: 0.5rem;
		transition: all var(--transition-fast);
		border-radius: 50%;
		width: 40px;
		height: 40px;
		align-items: center;
		justify-content: center;
	}

	.mobile-menu-button:hover {
		background-color: var(--hover-bg);
	}

	.mobile-menu-button:active {
		transform: scale(0.95);
	}

	/* Sidebar Toggle Mobile */
	.sidebar-toggle-mobile {
		display: none;
		position: fixed;
		top: 3.5rem;
		right: 0.5rem;
		z-index: 100;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background-color: var(--card-bg);
		border: 1px solid var(--border-color);
		box-shadow: 0 2px 4px var(--shadow-color);
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all var(--transition-normal);
	}

	.sidebar-toggle-mobile:hover {
		background-color: var(--hover-bg);
		transform: scale(1.05);
	}

	.sidebar-toggle-mobile:active {
		transform: scale(0.95);
	}

	/* Utility class for desktop-only elements */
	.desktop-only {
		display: flex;
	}

	/* Responsive Adjustments */
	/* Large screens (>1200px) */
	@media (min-width: 1201px) {
		.editor-area {
			width: 82%;
		}

		.sidebar {
			width: 18%;
		}

		.sidebar-toggle {
			right: 18%;
		}
	}

	/* Medium screens (768px-1200px) */
	@media (min-width: 769px) and (max-width: 1200px) {
		.editor-area {
			width: 75%;
		}

		.sidebar {
			width: 25%;
		}

		.sidebar-toggle {
			right: 25%;
		}

		.unified-header {
			padding: 0.5rem var(--space-2);
		}

		.header-left,
		.header-center,
		.header-right {
			gap: var(--space-2);
		}
	}

	/* Small screens (<768px) */
	@media (max-width: 768px) {
		.sidebar-toggle-mobile {
			display: flex;
		}

		.desktop-only {
			display: none;
		}

		.unified-header {
			padding: 0 var(--space-2);
			height: 3rem;
		}

		.header-left {
			min-width: auto;
		}

		.header-center {
			justify-content: flex-start;
			gap: var(--space-2);
		}

		.header-right {
			min-width: auto;
		}

		.mobile-menu-button {
			display: flex;
		}

		.app-title {
			font-size: 0.85rem;
		}

		.toolbar-button {
			padding: 0.35rem 0.6rem;
		}

		.button-text {
			display: none;
		}

		.editor-area {
			width: 100%;
		}

		.sidebar {
			position: fixed;
			top: 3rem; /* Position below the unified header */
			right: 0;
			width: 80%;
			height: calc(100vh - 3rem); /* Adjust height to account for header */
			z-index: 50;
			box-shadow: -2px 0 10px var(--shadow-color);
		}

		.sidebar-toggle {
			display: none;
		}

		.sidebar-tab {
			padding: 0.75rem 0.5rem;
		}

		.shortcut {
			display: none;
		}
	}

	/* Mobile devices (portrait phones) */
	@media (max-width: 480px) {
		.unified-header {
			padding: 0 var(--space-1);
			height: 2.75rem;
		}

		.app-title {
			font-size: 0.8rem;
		}

		.toolbar-checkbox span {
			font-size: 0.75rem;
		}

		.save-status {
			font-size: 0.7rem;
			padding: 0.25rem 0.5rem;
		}

		.sidebar {
			width: 90%;
			top: 2.75rem; /* Adjust for smaller header */
			height: calc(100vh - 2.75rem);
		}

		.sidebar-toggle-mobile {
			top: 3.25rem;
		}
	}

	/* Handle orientation changes */
	@media (max-height: 500px) and (orientation: landscape) {
		.unified-header {
			padding: 0 var(--space-2);
			height: 2.5rem;
		}

		.content-area {
			height: calc(100vh - 2.5rem);
		}

		.sidebar {
			top: 2.5rem;
			height: calc(100vh - 2.5rem);
		}

		.sidebar-tabs {
			height: 40px;
		}

		.sidebar-tab {
			padding: 0.5rem;
		}

		.sidebar-toggle-mobile {
			top: 3rem;
		}
	}
</style>
