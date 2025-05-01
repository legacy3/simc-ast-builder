<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';

	// Access theme state from layout
	let isDarkTheme = $state(false);

	// Toggle theme function
	function toggleTheme() {
		const event = new CustomEvent('toggleTheme');
		window.dispatchEvent(event);
	}

	// Listen for theme changes
	$effect(() => {
		if (typeof document !== 'undefined') {
			isDarkTheme = document.documentElement.classList.contains('is-dark-theme');
		}
	});

	onMount(() => {
		// Handle navbar burger menu for mobile
		// Get all "navbar-burger" elements
		const navbarBurgers = Array.prototype.slice.call(
			document.querySelectorAll('.navbar-burger'),
			0
		);

		// Add a click event on each of them
		navbarBurgers.forEach((el) => {
			el.addEventListener('click', () => {
				// Get the target from the "data-target" attribute
				const target = el.dataset.target;
				const targetElement = document.getElementById(target);

				// Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
				el.classList.toggle('is-active');
				targetElement?.classList.toggle('is-active');
			});
		});

		// Listen for theme toggle events
		window.addEventListener('toggleTheme', () => {
			const isCurrentlyDark = document.documentElement.classList.contains('is-dark-theme');
			document.documentElement.classList.toggle('is-dark-theme', !isCurrentlyDark);
			localStorage.setItem('theme', isCurrentlyDark ? 'light' : 'dark');
		});
	});
</script>

<header class="navbar is-spaced" role="navigation" aria-label="main navigation">
	<div class="navbar-brand">
		<a class="navbar-item" href="/">
			<h1 class="title is-4 has-text-primary">SimC AST Formatter</h1>
		</a>

		<button class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navMenu">
			<span aria-hidden="true"></span>
			<span aria-hidden="true"></span>
			<span aria-hidden="true"></span>
		</button>
	</div>

	<div id="navMenu" class="navbar-menu">
		<div class="navbar-start">
			<a class="navbar-item" class:is-active={page.url.pathname === '/'} href="/"> Home </a>
		</div>

		<div class="navbar-end">
			<div class="navbar-item">
				<ThemeToggle {isDarkTheme} {toggleTheme} />
			</div>

			<div class="navbar-item">
				<div class="buttons">
					<a
						class="button is-primary is-small"
						href="https://github.com/your-username/simc-ast-builder"
						target="_blank"
						rel="noopener noreferrer"
					>
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
								<path
									d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
								></path>
							</svg>
						</span>
						<span>GitHub</span>
					</a>
				</div>
			</div>
		</div>
	</div>
</header>
