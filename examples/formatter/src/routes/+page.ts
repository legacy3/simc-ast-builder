import { getSnippet } from '$lib/supabase';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url }) => {
	// Check if we have a snippet ID in the URL
	const id = url.searchParams.get('id');

	if (id) {
		try {
			// Try to load the shared snippet
			const snippet = await getSnippet(id);

			if (snippet && snippet.code) {
				return {
					title: 'SimC Editor - Shared Code',
					description: 'Shared SimulationCraft code',
					defaultCode: snippet.code,
					isShared: true
				};
			}
		} catch (error) {
			console.error('Error loading shared snippet:', error);
			// Fall back to default if there's an error
		}
	}

	// Default return if no ID or snippet not found
	return {
		title: 'SimC Editor',
		description: 'Parse SimulationCraft code and visualize the Abstract Syntax Tree',
		defaultCode: 'actions=frost_strike,if=runic_power>=80&!buff.killing_machine.up',
		isShared: false
	};
};
