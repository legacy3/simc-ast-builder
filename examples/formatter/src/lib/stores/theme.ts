import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Define theme type
type Theme = 'light' | 'dark';

// Function to get initial theme based on:
// 1. User's stored preference
// 2. System preference
// 3. Default to dark theme if neither is available
function getInitialTheme(): Theme {
	if (!browser) return 'dark';

	// Check localStorage first
	const storedTheme = localStorage.getItem('theme');
	if (storedTheme === 'light' || storedTheme === 'dark') {
		return storedTheme;
	}

	// Check system preference
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
		return 'light';
	}

	// Default to dark theme
	return 'dark';
}

// Create theme store
export const theme = writable<Theme>(getInitialTheme());

// Function to toggle theme
export function toggleTheme(): void {
	theme.update((currentTheme) => {
		const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
		if (browser) {
			localStorage.setItem('theme', newTheme);
			document.documentElement.classList.toggle('is-dark-theme', newTheme === 'dark');
		}
		return newTheme;
	});
}

// Function to initialize theme on app start
export function initializeTheme(): void {
	if (!browser) return;

	// Apply initial theme class to document
	const currentTheme = getInitialTheme();
	document.documentElement.classList.toggle('is-dark-theme', currentTheme === 'dark');

	// Listen for system preference changes
	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
		// Only update if user hasn't set a preference
		if (!localStorage.getItem('theme')) {
			const newTheme = event.matches ? 'dark' : 'light';
			theme.set(newTheme);
			document.documentElement.classList.toggle('is-dark-theme', newTheme === 'dark');
		}
	});
}
