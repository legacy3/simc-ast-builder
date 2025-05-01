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
		<span
			>Proudly using
			<a href="https://svelte.dev" target="_blank" rel="noopener noreferrer">Svelte</a>,
			<a href="https://codemirror.net" target="_blank" rel="noopener noreferrer">CodeMirror</a>,
			<a href="https://konvajs.org" target="_blank" rel="noopener noreferrer">Konva</a> &
			<a
				href="https://github.com/legacy3/simc-ast-builder"
				target="_blank"
				rel="noopener noreferrer">SimC AST</a
			>
			❤️
		</span>
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
		height: 2.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.75rem;
		color: var(--text-color);
		opacity: 0.5;
		border-top: 1px solid var(--border-color);
	}

	.zen-footer a {
		color: inherit;
		text-decoration: none;
	}

	.zen-footer a:hover {
		text-decoration: underline;
	}
</style>
