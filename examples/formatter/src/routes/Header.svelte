<script lang="ts">
	import { page } from '$app/state';
	import { theme } from '$lib/stores/theme';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';

	// Mobile menu state
	let isMenuOpen = $state(false);

	// Toggle mobile menu
	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	// Close menu when navigating or clicking outside
	function closeMenu() {
		isMenuOpen = false;
	}
</script>

<header class="app-header" role="navigation" aria-label="main navigation">
	<div class="header-container">
		<div class="header-logo">
			<a href="/" class="logo-link">
				<h1 class="app-title">SimC AST Formatter</h1>
			</a>
		</div>

		<div class="nav-actions">
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
		</div>
	</div>
</header>

<style>
	.app-header {
		width: 100%;
		background-color: var(--bg-color);
		border-bottom: 1px solid var(--border-color);
		position: sticky;
		top: 0;
		z-index: 10;
		transition: background-color 0.3s ease;
	}

	.header-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 2.5rem;
	}

	.header-logo {
		display: flex;
		align-items: center;
	}

	.logo-link {
		text-decoration: none;
		color: inherit;
	}

	.app-title {
		font-size: 0.9rem;
		font-weight: 500;
		color: var(--text-color);
		opacity: 0.8;
		margin: 0;
	}

	.nav-actions {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.github-link {
		display: flex;
		align-items: center;
		color: var(--text-color);
		opacity: 0.6;
		transition: opacity 0.2s ease;
	}

	.github-link:hover {
		opacity: 1;
	}

	.github-link .icon {
		display: flex;
		align-items: center;
	}

	@media (max-width: 768px) {
		.app-title {
			font-size: 0.8rem;
		}
	}
</style>
