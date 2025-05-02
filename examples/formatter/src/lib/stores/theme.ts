import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'light' | 'dark';

function getInitialTheme(): Theme {
	if (!browser) return 'dark';

	const storedTheme = localStorage.getItem('theme');
	if (storedTheme === 'light' || storedTheme === 'dark') {
		return storedTheme;
	}

	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
		return 'light';
	}

	return 'dark';
}

export const theme = writable<Theme>(getInitialTheme());

export function toggleTheme(): void {
	theme.update((currentTheme) => {
		const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

		if (browser) {
			localStorage.setItem('theme', newTheme);
			document.documentElement.classList.toggle('is-dark-theme', newTheme === 'dark');

			// Dispatch a custom event to notify listeners of the theme change
			window.dispatchEvent(
				new CustomEvent('themeChanged', {
					detail: { theme: newTheme }
				})
			);
		}

		return newTheme;
	});
}

export function initializeTheme(): void {
	if (!browser) return;

	const currentTheme = getInitialTheme();
	document.documentElement.classList.toggle('is-dark-theme', currentTheme === 'dark');

	// Dispatch initial theme event to ensure all components are in sync
	window.dispatchEvent(
		new CustomEvent('themeChanged', {
			detail: { theme: currentTheme, source: 'initialization' }
		})
	);

	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
		if (!localStorage.getItem('theme')) {
			const newTheme = event.matches ? 'dark' : 'light';
			theme.set(newTheme);
			document.documentElement.classList.toggle('is-dark-theme', newTheme === 'dark');

			// Dispatch event when theme changes due to system preference
			window.dispatchEvent(
				new CustomEvent('themeChanged', {
					detail: { theme: newTheme, source: 'system-preference' }
				})
			);
		}
	});
}
