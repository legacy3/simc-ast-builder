<script lang="ts">
	import Header from './Header.svelte';
	import '../app.scss';
	import { browser } from '$app/environment';

	let { children } = $props();

	// Theme management with Svelte 5 runes
	const storedTheme = browser ? localStorage.getItem('theme') : null;
	let isDarkTheme = $state(storedTheme === 'light' ? false : true); // Default to dark theme

	// Toggle theme function
	function toggleTheme() {
		isDarkTheme = !isDarkTheme;
		if (browser) {
			localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
		}
	}

	// Apply theme class to document root
	$effect(() => {
		if (browser) {
			document.documentElement.classList.toggle('is-dark-theme', isDarkTheme);
		}
	});
</script>

<div class="app">
	<Header />

	<main class="container">
		{@render children()}
	</main>

	<footer class="footer">
		<div class="content has-text-centered">
			<p>
				<strong>SimC AST Formatter</strong> - A tool for parsing and visualizing SimulationCraft code.
			</p>
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
		padding: 1.5rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	.footer {
		padding: 1.5rem;
		margin-top: 2rem;
	}
</style>
