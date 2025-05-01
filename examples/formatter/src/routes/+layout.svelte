<script lang="ts">
	import '../app.scss';
	import { onMount } from 'svelte';
	import { theme, initializeTheme } from '$lib/stores/theme';

	let { children } = $props();

	onMount(() => {
		initializeTheme();
	});
</script>

<div class="app">
	<main class="container">
		{@render children()}
	</main>

	<footer class="zen-footer">
		<div class="footer-content">
			<div class="tech-stack">
				Built with
				<a href="https://svelte.dev" target="_blank" rel="noopener noreferrer">Svelte</a> •
				<a href="https://codemirror.net" target="_blank" rel="noopener noreferrer">CodeMirror</a> •
				<a href="https://konvajs.org" target="_blank" rel="noopener noreferrer">Konva</a> •
				<a
					href="https://github.com/legacy3/simc-ast-builder"
					target="_blank"
					rel="noopener noreferrer">SimC AST</a
				>
			</div>
			<div class="hosting">
				<a href="https://netlify.com" target="_blank" rel="noopener noreferrer"
					>Powered by Netlify</a
				>
			</div>
		</div>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	.zen-footer {
		padding: 1rem 0;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.75rem;
		color: var(--text-color);
		opacity: 0.6;
		border-top: 1px solid var(--border-color);
	}

	.footer-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.tech-stack,
	.hosting {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		flex-wrap: wrap;
		justify-content: center;
	}

	.zen-footer a {
		color: inherit;
		text-decoration: none;
		transition:
			opacity 0.2s ease,
			color 0.2s ease;
	}

	.zen-footer a:hover {
		color: var(--primary);
		opacity: 0.9;
	}

	@media (min-width: 768px) {
		.footer-content {
			flex-direction: row;
			justify-content: space-between;
			width: 100%;
			max-width: 600px;
			gap: 1rem;
		}
	}
</style>
