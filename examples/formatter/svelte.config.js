import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			// Use default options for Cloudflare Pages
			fallback: 'index.html',
			strict: true
		}),

		// Ensure SPA mode works correctly
		prerender: {
			entries: []
		},

		// Add paths configuration for Cloudflare Pages
		paths: {
			base: ''
		}
	}
};

export default config;
