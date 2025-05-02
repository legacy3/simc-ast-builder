<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { EditorView, lineNumbers } from '@codemirror/view';
	import { EditorState, Compartment } from '@codemirror/state';
	import { basicSetup } from 'codemirror';
	import { simcExprLanguage } from '../simcExprLanguage';

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

	let editorContainer: HTMLDivElement;
	let editor: EditorView;

	let internalValue = $state(value);

	const themeCompartment = new Compartment();

	function initializeCodeMirror() {
		if (!browser || !editorContainer) return;

		const isDarkTheme = document.documentElement.classList.contains('is-dark-theme');

		const state = EditorState.create({
			doc: internalValue,
			extensions: [
				basicSetup,
				lineNumbers({
					formatNumber: (lineNo) => lineNo.toString()
				}),
				simcExprLanguage(),
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
						height: '100%',
						fontFamily: 'var(--font-mono, monospace)',
						fontSize: '12px',
						lineHeight: 'var(--line-height)',
						letterSpacing: 'var(--letter-spacing)'
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
						overflow: 'auto',
						height: '100%'
					},
					'&.cm-focused': {
						outline: 'none'
					}
				})
			]
		});

		editor = new EditorView({
			state,
			parent: editorContainer
		});

		if (isDarkTheme) {
			editorContainer.classList.add('cm-dark-theme');
		}

		// Function to update editor theme
		const updateEditorTheme = (event?: CustomEvent) => {
			const isDarkTheme = document.documentElement.classList.contains('is-dark-theme');

			if (isDarkTheme) {
				editorContainer.classList.add('cm-dark-theme');
			} else {
				editorContainer.classList.remove('cm-dark-theme');
			}

			// Force CodeMirror to refresh to ensure theme changes are applied
			if (editor) {
				// This triggers a redraw of the editor
				editor.requestMeasure();
			}
		};

		// Listen for theme changes
		window.addEventListener('themeChanged', updateEditorTheme as EventListener);
	}

	onMount(() => {
		if (browser) {
			initializeCodeMirror();
		}

		return () => {
			if (editor) {
				editor.destroy();
			}
		};
	});

	$effect(() => {
		if (browser && editor && editor.state.doc.toString() !== value) {
			editor.dispatch({
				changes: { from: 0, to: editor.state.doc.length, insert: value }
			});
		}
	});

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
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--border-radius-md);
		box-shadow: var(--shadow-sm);
		overflow: hidden;
		display: flex;
		flex-direction: column;
		flex: 1;
		transition:
			border-color var(--transition-normal),
			box-shadow var(--transition-normal);
	}

	.textarea {
		width: 100%;
		height: 100%;
		font-family: var(--font-mono);
		resize: none;
		padding: var(--space-4);
		border: none;
		outline: none;
		background-color: var(--card-bg);
		color: var(--text-color);
		transition:
			background-color var(--transition-normal),
			color var(--transition-normal);
	}

	:global(.cm-dark-theme) {
		background-color: var(--card-bg);
		color: var(--text-color);
	}

	:global(.cm-dark-theme .cm-gutters) {
		border-right: 1px solid var(--border-color) !important;
	}

	:global(.cm-dark-theme .cm-lineNumbers .cm-gutterElement) {
		color: var(--text-color) !important;
		opacity: 0.5;
	}

	@media (max-width: 768px) {
		:global(.cm-content) {
			font-size: var(--responsive-font-md);
		}

		.textarea {
			padding: var(--space-3);
			font-size: var(--responsive-font-md);
		}
	}

	@media (max-width: 480px) {
		:global(.cm-content) {
			font-size: var(--responsive-font-sm);
		}

		.textarea {
			padding: var(--space-2);
			font-size: var(--responsive-font-sm);
		}
	}

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
