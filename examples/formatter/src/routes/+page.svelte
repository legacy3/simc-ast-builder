<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import SimCEditor from '$lib/components/SimCEditor.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import humanizeDuration from 'humanize-duration';
	import copy from 'clipboard-copy';

	const isBrowser = typeof window !== 'undefined';

	interface PageData {
		title: string;
		description: string;
		defaultCode: string;
	}

	const { data } = $props<{ data: PageData }>();

	let simcCode = $state(data.defaultCode);
	let activeTab = $state<'text' | 'visual'>('text'); // 'text' or 'visual'
	let saveStatus = $state<'saved' | 'saving'>('saved');
	let lastSaveTime = $state<number | null>(null);
	let saveTimeout: ReturnType<typeof setTimeout> | null = null;
	let sidebarVisible = $state(false); // Always default to collapsed
	let isMenuOpen = $state(false);
	let isShareModalOpen = $state(false);
	let timeDisplay = $state('Not saved yet');
	let updateInterval: ReturnType<typeof setInterval> | null = null;
	let shareLink = $state(
		`https://simc-ast-builder.example.com/share/${Math.random().toString(36).substring(2, 10)}`
	);

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
			lastSaveTime = Date.now();
			updateTimeDisplay();
			// Update share link with new content hash
			shareLink = `https://simc-ast-builder.example.com/share/${Math.random().toString(36).substring(2, 10)}`;
		}, 1000);
	}

	function updateTimeDisplay(): void {
		if (!lastSaveTime) {
			timeDisplay = 'Not saved yet';
			return;
		}

		const elapsed = Date.now() - lastSaveTime;
		timeDisplay =
			humanizeDuration(elapsed, {
				largest: 1,
				round: true,
				units: ['d', 'h', 'm', 's'],
				language: 'en'
			}) + ' ago';
	}

	function copyShareLink() {
		copy(shareLink)
			.then(() => {
				// Show a temporary "Copied!" message
				if (isBrowser) {
					const copyButton = document.getElementById('copy-link-button');
					if (copyButton) {
						const originalText = copyButton.textContent;
						copyButton.textContent = 'Copied!';
						setTimeout(() => {
							copyButton.textContent = originalText;
						}, 2000);
					}
				}
			})
			.catch((err) => {
				console.error('Failed to copy text: ', err);
			});
	}

	function toggleSidebar() {
		sidebarVisible = !sidebarVisible;
	}

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function closeMenu() {
		isMenuOpen = false;
	}

	function setActiveTab(tab: 'text' | 'visual') {
		activeTab = tab;
	}

	function optimizeCode() {
		console.log('Optimizing code:', simcCode);
	}

	function toggleShareModal() {
		isShareModalOpen = !isShareModalOpen;
	}

	function closeShareModal() {
		isShareModalOpen = false;
	}

	function simCode() {
		console.log('Sending code to Raidbots:', simcCode);
	}

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
		if (isBrowser) {
			// Add keyboard shortcut handling
			window.addEventListener('keydown', handleKeyboardShortcuts);

			// Set up interval to update the time display every second
			updateInterval = setInterval(() => {
				if (lastSaveTime) {
					updateTimeDisplay();
				}
			}, 1000);

			// Function to check screen size and set sidebar visibility
			const checkScreenSize = () => {
				// Force a reflow to ensure we get the correct window dimensions
				document.body.offsetHeight;

				// Get the current window width
				const windowWidth = window.innerWidth;

				// Set sidebar visibility based on screen size
				if (windowWidth >= 769) {
					sidebarVisible = true;
				} else {
					sidebarVisible = false;
				}
			};

			// Initial check with a slight delay to ensure DOM is fully loaded
			setTimeout(() => {
				checkScreenSize();
			}, 50);

			// Debounced resize handler
			let resizeTimer: ReturnType<typeof setTimeout> | null = null;
			window.addEventListener('resize', () => {
				if (resizeTimer) {
					clearTimeout(resizeTimer);
				}
				resizeTimer = setTimeout(() => {
					checkScreenSize();
				}, 100);
			});
		}
	});

	onDestroy(() => {
		if (isBrowser) {
			// Clean up event listeners and intervals
			window.removeEventListener('keydown', handleKeyboardShortcuts);
			if (updateInterval) {
				clearInterval(updateInterval);
			}
		}
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
			<button class="toolbar-button" onclick={optimizeCode}>
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
						<path d="M18.5 2h-13L7 10H2l8 14L18 10h-5l1.5-8z"></path>
					</svg>
				</span>
				<span class="button-text">Optimize</span>
			</button>

			<button class="toolbar-button raidbots-button" onclick={simCode}>
				<span class="icon">
					<svg style="width: 28px; height: 28px;" viewBox="0 0 47 42">
						<defs>
							<style>
								.rb-yellow {
									fill: currentColor;
									opacity: 0.6;
								}
							</style>
						</defs>
						<title>Raidbots</title>
						<!-- Just using the robot head part of the logo -->
						<path
							class="rb-yellow"
							d="M34.41077,10.64148H25.16163l-.29836-2.68523A4.09583,4.09583,0,0,0,27.648,4.07758,4.03305,4.03305,0,0,0,23.57038,0a3.95064,3.95064,0,0,0-3.97812,4.07758A4.12667,4.12667,0,0,0,22.178,7.85679l-.29836,2.78469H12.63055A6.2395,6.2395,0,0,0,6.365,16.907V29.73648A6.23949,6.23949,0,0,0,12.63055,36.002h3.282V40.0796a1.7022,1.7022,0,0,0,1.19344,1.59125,1.5856,1.5856,0,0,0,1.8896-1.4918v-.99453a.3643.3643,0,0,1,.39782-.39781.455.455,0,0,1,.49726.39781V40.179a1.70221,1.70221,0,0,0,1.19344,1.59125,1.5856,1.5856,0,0,0,1.88961-1.4918V39.284a.36429.36429,0,0,1,.39781-.39781.455.455,0,0,1,.49727.39781v.99453a1.70219,1.70219,0,0,0,1.19343,1.59125,1.5856,1.5856,0,0,0,1.88961-1.4918v-.99453a.3643.3643,0,0,1,.39781-.39781.455.455,0,0,1,.49727.39781l-.0608.844a1.7022,1.7022,0,0,0,1.19343,1.59125,1.5856,1.5856,0,0,0,1.88961-1.4918l.06081-3.92709h3.28195a6.23949,6.23949,0,0,0,6.26554-6.26554V16.907A5.89877,5.89877,0,0,0,34.41077,10.64148ZM15.41523,31.52663a4.8732,4.8732,0,1,1,4.8732-4.8732A4.81833,4.81833,0,0,1,15.41523,31.52663Zm9.94531,2.68524H21.87968c-.39781,0-.59672-.39782-.39781-.79563L23.272,30.33319a.55943.55943,0,0,1,.89507,0l1.79016,3.08305C25.95726,33.81405,25.75835,34.21187,25.36054,34.21187Zm6.365-2.68524a4.8732,4.8732,0,1,1,4.8732-4.8732A4.81833,4.81833,0,0,1,31.72554,31.52663Z"
						></path>
						<path
							class="rb-yellow"
							d="M4.97265,28.24468a.7686.7686,0,0,1-.79562.69617A5.30368,5.30368,0,0,1,0,23.57038a5.30368,5.30368,0,0,1,4.177-5.37046.70473.70473,0,0,1,.79562.69617Z"
						></path>
						<path
							class="rb-yellow"
							d="M42.16812,28.24468c0,.39781.39781.79562.69617.69617a5.30368,5.30368,0,0,0,4.177-5.37047,5.30368,5.30368,0,0,0-4.177-5.37046c-.39782-.09946-.69617.29836-.69617.69617Z"
						></path>
					</svg>
				</span>
				<span class="button-text">Sim</span>
			</button>

			<button class="toolbar-button" onclick={toggleShareModal}>
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
						<circle cx="18" cy="5" r="3"></circle>
						<circle cx="6" cy="12" r="3"></circle>
						<circle cx="18" cy="19" r="3"></circle>
						<line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
						<line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
					</svg>
				</span>
				<span class="button-text">Share</span>
			</button>

			<div
				class="save-status"
				class:saved={saveStatus === 'saved'}
				class:saving={saveStatus === 'saving'}
			>
				{saveStatus === 'saved' ? timeDisplay : 'Saving...'}
			</div>
		</div>

		<div class="header-right">
			<ThemeToggle />

			<a
				class="github-link"
				href="https://github.com/legacy3/simc-ast-builder/tree/main/examples/formatter"
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

<!-- Share Modal -->
{#if isShareModalOpen}
	<div
		class="modal-overlay"
		onclick={closeShareModal}
		onkeydown={(e) => e.key === 'Escape' && closeShareModal()}
		role="dialog"
		aria-modal="true"
		aria-labelledby="share-modal-title"
		tabindex="-1"
	>
		<div class="modal-container" onclick={(e) => e.stopPropagation()} role="document">
			<div class="modal-header">
				<h2 id="share-modal-title">Share Your Code</h2>
				<button class="modal-close-button" onclick={closeShareModal} aria-label="Close modal">
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
				</button>
			</div>
			<div class="modal-content">
				<div class="share-link-container">
					<input
						type="text"
						value={shareLink}
						readonly
						class="share-link-input"
						onclick={(e) => {
							if (e.target instanceof HTMLInputElement) {
								e.target.select();
							}
						}}
					/>
					<button id="copy-link-button" class="share-button" onclick={copyShareLink}>
						<span class="icon">
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
								<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
								<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
							</svg>
						</span>
						<span>Copy</span>
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}

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
		box-shadow: 0 2px 4px var(--shadow-color);
	}

	.toolbar-button:hover::before {
		opacity: 1;
	}

	.toolbar-button:active {
		box-shadow: 0 0 1px var(--shadow-color);
	}

	.toolbar-button .icon,
	.toolbar-button span:not(.icon) {
		position: relative;
		z-index: 1;
	}

	/* Save status styling */

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
	}

	.sidebar-toggle:active {
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
	}

	.sidebar-toggle-mobile:active {
		background-color: var(--active-bg);
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

		/* Mobile styling adjustments */

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

	/* Modal Styles */
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		backdrop-filter: blur(2px);
	}

	.modal-container {
		background-color: var(--card-bg);
		border-radius: var(--border-radius-lg);
		box-shadow: 0 4px 20px var(--shadow-color);
		width: 90%;
		max-width: 500px;
		max-height: 90vh;
		overflow-y: auto;
		border: 1px solid var(--border-color);
		animation: modal-appear 0.2s ease-out;
	}

	@keyframes modal-appear {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		border-bottom: 1px solid var(--border-color);
	}

	.modal-header h2 {
		margin: 0;
		font-size: 1.25rem;
		color: var(--text-color);
	}

	.modal-close-button {
		background: transparent;
		border: none;
		color: var(--text-color);
		cursor: pointer;
		padding: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		transition: background-color var(--transition-normal);
	}

	.modal-close-button:hover {
		background-color: var(--hover-bg);
	}

	.modal-content {
		padding: 1rem;
	}

	.share-link-container {
		display: flex;
		gap: 0.5rem;
		margin-top: 1rem;
		width: 100%;
	}

	.share-link-input {
		flex: 1;
		padding: 0.5rem 0.75rem;
		background-color: var(--hover-bg);
		border: 1px solid var(--border-color);
		border-radius: var(--border-radius-md);
		color: var(--text-color);
		font-size: 0.9rem;
		cursor: pointer;
		transition: all var(--transition-normal);
	}

	.share-link-input:hover,
	.share-link-input:focus {
		border-color: var(--primary);
		outline: none;
	}

	.share-button {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		background-color: var(--hover-bg);
		border: 1px solid var(--border-color);
		border-radius: var(--border-radius-md);
		color: var(--text-color);
		font-size: 0.9rem;
		cursor: pointer;
		transition: all var(--transition-normal);
	}

	.share-button:hover {
		background-color: var(--active-bg);
		border-color: var(--primary);
	}

	.share-button:active {
		background-color: var(--hover-bg);
	}
</style>
