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
		}

		return newTheme;
	});
}

export function initializeTheme(): void {
	if (!browser) return;

	const currentTheme = getInitialTheme();
	document.documentElement.classList.toggle('is-dark-theme', currentTheme === 'dark');

	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
		if (!localStorage.getItem('theme')) {
			const newTheme = event.matches ? 'dark' : 'light';
			theme.set(newTheme);
			document.documentElement.classList.toggle('is-dark-theme', newTheme === 'dark');
		}
	});
}
