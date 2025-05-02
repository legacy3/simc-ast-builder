import { createClient } from '@supabase/supabase-js';
import * as LZString from 'lz-string';
import shorthash from 'shorthash2';
import { browser } from '$app/environment';

// Create a single supabase client for interacting with your database
export const supabase = createClient(
	import.meta.env.VITE_SUPABASE_DATABASE_URL,
	import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Type definition for the shared code snippets
export interface SharedSnippet {
	id: string;
	code: string;
	created_at: string;
}

/**
 * Client-side only: Compresses a string using LZ compression
 * @param data The string to compress
 * @returns The compressed string
 */
function clientCompressData(data: string): string {
	if (!browser) return data;

	try {
		return LZString.compressToUTF16(data);
	} catch (error) {
		console.error('Error compressing data:', error);
		return data;
	}
}

/**
 * Client-side only: Decompresses a string that was compressed with LZ compression
 * @param data The compressed string
 * @returns The decompressed string
 */
function clientDecompressData(data: string): string {
	if (!browser) return data;

	try {
		const decompressed = LZString.decompressFromUTF16(data);
		if (!decompressed) {
			return data;
		}
		return decompressed;
	} catch (error) {
		console.error('Error decompressing data:', error);
		return data;
	}
}

/**
 * Generates a hash from the code content to use as the snippet ID
 * @param code The SimC code to hash
 * @returns A hash string to use as ID
 */
function generateCodeHash(code: string): string {
	// Using shorthash2 to generate a short, unique hash
	// This produces shorter, URL-friendly hashes
	return shorthash(code);
}

/**
 * Saves a code snippet to Supabase and returns the ID
 * @param code The SimC code to save
 * @returns The ID of the saved snippet
 */
export async function saveSnippet(code: string): Promise<string> {
	// Generate a hash ID based on the content
	const id = generateCodeHash(code);

	try {
		// Compress the code before saving if in browser environment
		const codeToSave = clientCompressData(code);

		// Check if a snippet with this ID already exists
		const { data: existingSnippet, error: fetchError } = await supabase
			.from('snippets')
			.select('id')
			.eq('id', id)
			.single();

		if (fetchError && fetchError.code !== 'PGRST116') {
			console.error('Error checking for existing snippet:', fetchError);
			throw new Error(`Failed to check for existing snippet: ${fetchError.message}`);
		}

		// If the snippet already exists, just return the ID
		if (existingSnippet) {
			return id;
		}

		// Otherwise, insert the new snippet with the code (compressed if in browser)
		const { error } = await supabase.from('snippets').insert([{ id, code: codeToSave }]);

		if (error) {
			console.error('Error saving snippet:', error);
			throw new Error(`Failed to save snippet: ${error.message}`);
		}

		return id;
	} catch (error) {
		console.error('Unexpected error in saveSnippet:', error);
		throw error;
	}
}

/**
 * Retrieves a code snippet from Supabase by ID
 * @param id The ID of the snippet to retrieve
 * @returns The snippet data or null if not found
 */
export async function getSnippet(id: string): Promise<SharedSnippet | null> {
	try {
		const { data, error } = await supabase.from('snippets').select('*').eq('id', id).single();

		if (error) {
			console.error('Error retrieving snippet:', error);
			return null;
		}

		if (!data) {
			return null;
		}

		// Try to decompress the code if in browser environment
		if (browser && data.code) {
			return {
				...data,
				code: clientDecompressData(data.code)
			} as SharedSnippet;
		}

		// Return the raw data in server environment
		return data as SharedSnippet;
	} catch (error) {
		console.error('Unexpected error in getSnippet:', error);
		return null;
	}
}
