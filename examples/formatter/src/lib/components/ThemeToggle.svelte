<script lang="ts">
	import { theme, toggleTheme } from '$lib/stores/theme';

	$effect(() => {
		isDarkTheme = $theme === 'dark';
	});

	let isDarkTheme = $state(true);
</script>

<button
	class="theme-toggle button is-small is-rounded"
	onclick={toggleTheme}
	aria-label="Toggle theme"
	title={isDarkTheme ? 'Switch to light theme' : 'Switch to dark theme'}
>
	<span class="icon">
		{#if isDarkTheme}
			<!-- Sun icon for dark mode (clicking switches to light) -->
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
				aria-hidden="true"
			>
				<circle cx="12" cy="12" r="5"></circle>
				<line x1="12" y1="1" x2="12" y2="3"></line>
				<line x1="12" y1="21" x2="12" y2="23"></line>
				<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
				<line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
				<line x1="1" y1="12" x2="3" y2="12"></line>
				<line x1="21" y1="12" x2="23" y2="12"></line>
				<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
				<line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
			</svg>
		{:else}
			<!-- Moon icon for light mode (clicking switches to dark) -->
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
				aria-hidden="true"
			>
				<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
			</svg>
		{/if}
	</span>
</button>

<style>
	.theme-toggle {
		margin: 0;
		background: transparent;
		border: none;
		color: var(--text-color);
		opacity: 0.7;
		transition:
			all var(--transition-normal),
			transform var(--transition-fast);
		padding: var(--space-2);
		height: auto;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		overflow: hidden;
	}

	.theme-toggle::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: var(--hover-bg);
		border-radius: 50%;
		transform: scale(0);
		transition: transform var(--transition-normal);
	}

	.theme-toggle:hover {
		opacity: 1;
		color: var(--primary);
		transform: translateY(-1px);
	}

	.theme-toggle:hover::before {
		transform: scale(1);
	}

	.theme-toggle:active {
		transform: translateY(1px);
	}

	.theme-toggle:focus {
		outline: none;
		box-shadow: 0 0 0 2px rgba(var(--primary), 0.25);
	}

	.icon {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		z-index: 1;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes fade-in {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	.icon svg {
		animation:
			fade-in var(--transition-normal) ease forwards,
			spin 0.5s ease;
	}

	@media (max-width: 768px) {
		.theme-toggle {
			width: 3rem;
			height: 3rem;
		}

		.icon svg {
			width: 24px;
			height: 24px;
		}
	}

	@media (max-width: 480px) {
		.theme-toggle {
			width: 2.75rem;
			height: 2.75rem;
		}
	}

	@media (pointer: coarse) {
		.theme-toggle {
			min-width: var(--touch-target-size);
			min-height: var(--touch-target-size);
		}

		.theme-toggle:hover::before {
			transform: scale(0);
		}

		.theme-toggle:active::before {
			transform: scale(1);
		}
	}
</style>
