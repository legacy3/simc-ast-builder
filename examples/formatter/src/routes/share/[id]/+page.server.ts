import { error } from '@sveltejs/kit';
import { getSnippet } from '$lib/supabase';

export const load = async ({ params }: { params: { id: string } }) => {
	try {
		const snippet = await getSnippet(params.id);

		if (!snippet) {
			throw error(404, 'Snippet not found');
		}

		if (!snippet.code) {
			throw error(500, 'Retrieved snippet has invalid content');
		}

		return {
			title: 'SimC Editor',
			description: 'SimulationCraft expression editor and formatter',
			defaultCode: snippet.code,
			id: params.id
		};
	} catch (err) {
		// Provide more detailed error information
		if (err instanceof Error) {
			throw error(500, `Failed to load the shared code: ${err.message}`);
		} else {
			throw error(500, 'Failed to load the shared code');
		}
	}
};
