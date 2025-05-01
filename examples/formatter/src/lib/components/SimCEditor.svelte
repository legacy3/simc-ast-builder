<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { EditorView, lineNumbers } from '@codemirror/view';
	import { EditorState, Compartment } from '@codemirror/state';
	import { basicSetup } from 'codemirror';

	// Props
	const {
		value = '',
		placeholder = '',
		rows = 5,
		onChange = (val: string) => {}
	} = $props<{
		value: string;
		placeholder?: string;
		rows?: number;
		onChange?: (value: string) => void;
	}>();

	// References
	let editorContainer: HTMLDivElement;
	let editor: EditorView;

	// State
	let internalValue = $state(value);

	// Theme compartment for dynamic theme switching
	const themeCompartment = new Compartment();

	// Initialize CodeMirror
	function initializeCodeMirror() {
		if (!browser || !editorContainer) return;

		// Determine if dark theme is active
		const isDarkTheme = document.documentElement.classList.contains('is-dark-theme');

		// Create the editor state
		const state = EditorState.create({
			doc: internalValue,
			extensions: [
				basicSetup,
				// Custom line numbers extension with proper styling
				lineNumbers({
					formatNumber: (lineNo) => lineNo.toString()
				}),
				EditorView.updateListener.of((update) => {
					if (update.docChanged) {
						const newValue = update.state.doc.toString();
						if (internalValue !== newValue) {
							internalValue = newValue;
							onChange(newValue);
						}
					}
				}),
				EditorView.theme({
					'&': {
						height: `${rows * 1.6}em`,
						fontFamily: 'var(--font-mono, monospace)',
						fontSize: '12px',
						lineHeight: '1.6',
						letterSpacing: '0.01em'
					},
					'.cm-content': {
						padding: 'var(--space-3) 0'
					},
					'.cm-line': {
						padding: '0 var(--space-4)'
					},
					'.cm-gutters': {
						backgroundColor: 'transparent',
						borderRight: '1px solid var(--border-color)',
						width: '50px',
						minWidth: '50px'
					},
					'.cm-lineNumbers': {
						minWidth: '40px'
					},
					'.cm-lineNumbers .cm-gutterElement': {
						color: 'var(--text-color)',
						opacity: '0.4',
						padding: '0 var(--space-2)',
						textAlign: 'right',
						minWidth: '30px'
					},
					'.cm-cursor': {
						borderLeft: '2px solid var(--primary)',
						marginLeft: '0'
					},
					'.cm-scroller': {
						overflow: 'auto'
					},
					'&.cm-focused': {
						outline: 'none'
					}
				})
			]
		});

		// Create the editor view
		editor = new EditorView({
			state,
			parent: editorContainer
		});

		// Apply dark theme styles if needed
		if (isDarkTheme) {
			editorContainer.classList.add('cm-dark-theme');
		}

		// Listen for theme changes
		window.addEventListener('themeChanged', () => {
			const isDarkTheme = document.documentElement.classList.contains('is-dark-theme');
			if (isDarkTheme) {
				editorContainer.classList.add('cm-dark-theme');
			} else {
				editorContainer.classList.remove('cm-dark-theme');
			}
		});
	}

	onMount(() => {
		// Initialize CodeMirror in the browser environment
		if (browser) {
			initializeCodeMirror();
		}

		return () => {
			// Clean up on component destruction
			if (editor) {
				editor.destroy();
			}
		};
	});

	// Update editor when value changes externally
	$effect(() => {
		if (browser && editor && editor.state.doc.toString() !== value) {
			editor.dispatch({
				changes: { from: 0, to: editor.state.doc.length, insert: value }
			});
		}
	});

	// Update internal value when value changes externally
	$effect(() => {
		internalValue = value;
	});
</script>

<div class="simc-editor" bind:this={editorContainer}>
	{#if !browser}
		<textarea
			{placeholder}
			value={internalValue}
			oninput={(e) => {
				const target = e.target as HTMLTextAreaElement;
				internalValue = target.value;
				onChange(internalValue);
			}}
			{rows}
			class="textarea"
		></textarea>
	{/if}
</div>

<style>
	.simc-editor {
		position: relative;
		width: 100%;
		height: 100%;
		border: 1px solid var(--border-color, #ced4da);
		border-radius: var(--border-radius-md);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
		overflow: hidden;
	}

	.textarea {
		width: 100%;
		height: 100%;
		font-family: var(--font-mono, monospace);
		resize: none;
		padding: var(--space-4);
		border: none;
		outline: none;
	}

	/* Dark theme styles */
	:global(.cm-dark-theme) {
		background-color: #1a1a1a;
		color: #d4d4d4;
	}

	:global(.cm-dark-theme .cm-gutters) {
		border-right: 1px solid #333 !important;
	}

	:global(.cm-dark-theme .cm-lineNumbers .cm-gutterElement) {
		color: #858585 !important;
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		:global(.cm-content) {
			font-size: 14px;
		}

		.textarea {
			padding: var(--space-3);
			font-size: 14px;
		}
	}

	@media (max-width: 480px) {
		:global(.cm-content) {
			font-size: 13px;
		}

		.textarea {
			padding: var(--space-2);
			font-size: 13px;
		}
	}

	/* Touch-friendly adjustments */
	@media (pointer: coarse) {
		:global(.cm-content) {
			padding: var(--space-4) 0;
		}

		:global(.cm-line) {
			padding: 0 var(--space-4);
		}

		:global(.cm-lineNumbers .cm-gutterElement) {
			padding: 0 var(--space-3);
			min-width: 40px;
		}

		:global(.cm-gutters) {
			width: 60px !important;
			min-width: 60px !important;
		}
	}
</style>
