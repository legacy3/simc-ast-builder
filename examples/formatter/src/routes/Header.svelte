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
		background-color: var(--card-bg);
		border-bottom: 1px solid var(--border-color);
		box-shadow: 0 1px 3px var(--shadow-color);
		position: sticky;
		top: 0;
		z-index: var(--z-index-sticky);
		transition:
			background-color var(--transition-normal),
			border-color var(--transition-normal),
			box-shadow var(--transition-normal);
	}

	.header-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 var(--space-3);
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 3rem;
	}

	.header-logo {
		display: flex;
		align-items: center;
	}

	.logo-link {
		text-decoration: none;
		color: inherit;
		position: relative;
		padding: 0.25rem 0;
		transition: transform var(--transition-fast);
		
		&:hover {
			transform: translateY(-1px);
			
			.app-title {
				opacity: 1;
			}
			
			&::after {
				transform: scaleX(1);
				opacity: 0.5;
			}
		}
		
		&::after {
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
			transition: transform 0.3s ease, opacity 0.3s ease;
		}
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

	.nav-actions {
		display: flex;
		align-items: center;
		gap: 1rem;
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
		
		&:hover {
			opacity: 1;
			transform: translateY(-1px);
			color: var(--primary);
			background-color: var(--hover-bg);
		}
		
		&:active {
			transform: translateY(1px);
		}
	}

	.github-link .icon {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	@media (max-width: 768px) {
		.header-container {
			height: 2.75rem;
		}
		
		.app-title {
			font-size: 0.85rem;
		}
	}
</style>
