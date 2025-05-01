<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

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
	let textarea: HTMLTextAreaElement;
	let editor: any;

	// State
	let internalValue = $state(value);

	// Handle input changes for the fallback textarea
	function handleInput(event: Event) {
		const target = event.target as HTMLTextAreaElement;
		internalValue = target.value;
		onChange(internalValue);
	}

	onMount(() => {
		// Only initialize CodeMirror in the browser environment
		if (browser) {
			// Dynamically import CodeMirror
			import('codemirror').then((CodeMirror) => {
				// Import required CSS
				import('codemirror/lib/codemirror.css');

				// Import clike mode (ignore TypeScript error)
				// @ts-ignore
				import('codemirror/mode/clike/clike.js');

				// Define custom SimC mode for syntax highlighting
				CodeMirror.default.defineMode('simc', function () {
					return {
						token: function (stream: any, state: any) {
							// Handle comments
							if (stream.match('#')) {
								stream.skipToEnd();
								return 'comment';
							}

							// Handle keywords
							if (stream.match(/^actions(?=\.|=|\+=)/)) {
								return 'keyword';
							}

							// Handle math functions
							if (stream.match(/^(ceil|floor)(?=\()/)) {
								return 'keyword';
							}

							// Handle operators
							if (stream.match(/[&|^!+\-*%@><]=?|%%|!=|==|<\?|>\?/)) {
								return 'operator';
							}

							// Handle parentheses
							if (stream.match(/[()]/)) {
								return 'bracket';
							}

							// Handle numbers
							if (stream.match(/\d+(\.\d+)?/)) {
								return 'number';
							}

							// Handle identifiers (starting with a letter)
							if (stream.match(/[a-zA-Z][a-zA-Z0-9_/]*/)) {
								// Check for specific SimC functions and variables
								const word = stream.current();

								// SimC API functions and variables
								const simcApiFunctions = [
									'buff',
									'debuff',
									'cooldown',
									'dot',
									'talent',
									'equipped',
									'active',
									'pet',
									'target',
									'health',
									'time',
									'gcd',
									'spell_targets',
									'variable',
									'prev_gcd',
									'prev_off_gcd'
								];

								if (simcApiFunctions.includes(word)) {
									return 'builtin';
								}

								// Resources
								const resources = [
									'runic_power',
									'rune',
									'mana',
									'rage',
									'energy',
									'combo_points',
									'holy_power',
									'soul_shard',
									'astral_power',
									'maelstrom',
									'insanity',
									'fury',
									'pain',
									'focus'
								];

								if (resources.includes(word)) {
									return 'variable-2';
								}

								return 'variable';
							}

							// Handle mixed identifiers (starting with a number)
							if (stream.match(/\d+[a-zA-Z][a-zA-Z0-9_/]*/)) {
								return 'string-2';
							}

							// Skip unrecognized characters
							stream.next();
							return null;
						}
					};
				});

				// Initialize CodeMirror with type assertion to handle placeholder
				editor = CodeMirror.default.fromTextArea(textarea, {
					mode: 'simc',
					lineNumbers: true,
					theme: 'default',
					lineWrapping: true,
					tabSize: 2,
					indentWithTabs: false,
					autofocus: false,
					viewportMargin: Infinity
				} as any); // Type assertion to bypass TypeScript error

				// Set initial value
				editor.setValue(internalValue);

				// Handle changes
				editor.on('change', () => {
					const newValue = editor.getValue();
					if (internalValue !== newValue) {
						internalValue = newValue;
						onChange(newValue);
					}
				});

				// Handle editor height based on rows
				const lineHeight = editor.defaultTextHeight();
				const editorHeight = lineHeight * rows + 14; // Add some padding
				editor.getWrapperElement().style.height = `${editorHeight}px`;

				// Determine if dark theme is active and apply appropriate theme
				if (typeof document !== 'undefined') {
					const isDarkTheme = document.documentElement.classList.contains('is-dark-theme');
					if (isDarkTheme) {
						editor.getWrapperElement().classList.add('cm-dark-theme');
					}

					// Listen for theme changes
					window.addEventListener('themeChanged', () => {
						const isDarkTheme = document.documentElement.classList.contains('is-dark-theme');
						if (isDarkTheme) {
							editor.getWrapperElement().classList.add('cm-dark-theme');
						} else {
							editor.getWrapperElement().classList.remove('cm-dark-theme');
						}
					});
				}
			});
		}

		return () => {
			// Clean up on component destruction
			if (editor) {
				editor.toTextArea();
			}
		};
	});

	// Update editor when value changes externally
	$effect(() => {
		if (browser && editor && editor.getValue() !== value) {
			editor.setValue(value);
		}
	});

	// Update internal value when value changes externally
	$effect(() => {
		internalValue = value;
	});
</script>

<div class="simc-editor">
	<textarea
		bind:this={textarea}
		{placeholder}
		value={internalValue}
		oninput={handleInput}
		{rows}
		class="textarea"
	></textarea>
</div>

<style>
	.simc-editor {
		position: relative;
		width: 100%;
	}

	.textarea {
		width: 100%;
		font-family: var(--font-mono, monospace);
		resize: vertical;
	}

	.simc-editor :global(.CodeMirror) {
		height: auto;
		border: 1px solid var(--border-color, #ced4da);
		border-radius: 0.25rem;
		font-family: var(--font-mono, monospace);
		font-size: 14px;
		line-height: 1.5;
	}

	.simc-editor :global(.CodeMirror-focused) {
		border-color: var(--primary, #86b7fe);
		outline: 0;
		box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
	}

	/* Dark theme styles */
	.simc-editor :global(.cm-dark-theme) {
		background-color: #1e1e1e;
		color: #d4d4d4;
	}

	.simc-editor :global(.cm-dark-theme .CodeMirror-gutters) {
		background-color: #1e1e1e;
		border-right: 1px solid #333;
	}

	.simc-editor :global(.cm-dark-theme .CodeMirror-linenumber) {
		color: #858585;
	}

	/* Syntax highlighting colors */
	.simc-editor :global(.cm-keyword) {
		color: #0000ff;
		font-weight: bold;
	}

	.simc-editor :global(.cm-operator) {
		color: #a52a2a;
	}

	.simc-editor :global(.cm-number) {
		color: #008000;
	}

	.simc-editor :global(.cm-variable) {
		color: #000000;
	}

	.simc-editor :global(.cm-variable-2) {
		color: #6f42c1; /* Resources */
	}

	.simc-editor :global(.cm-builtin) {
		color: #0086b3; /* SimC API functions */
	}

	.simc-editor :global(.cm-string-2) {
		color: #d63384; /* Mixed identifiers */
	}

	.simc-editor :global(.cm-comment) {
		color: #6c757d;
		font-style: italic;
	}

	.simc-editor :global(.cm-bracket) {
		color: #a52a2a;
	}

	/* Dark theme syntax highlighting */
	.simc-editor :global(.cm-dark-theme .cm-keyword) {
		color: #569cd6;
		font-weight: bold;
	}

	.simc-editor :global(.cm-dark-theme .cm-operator) {
		color: #d4d4d4;
	}

	.simc-editor :global(.cm-dark-theme .cm-number) {
		color: #b5cea8;
	}

	.simc-editor :global(.cm-dark-theme .cm-variable) {
		color: #9cdcfe;
	}

	.simc-editor :global(.cm-dark-theme .cm-variable-2) {
		color: #c586c0; /* Resources */
	}

	.simc-editor :global(.cm-dark-theme .cm-builtin) {
		color: #4ec9b0; /* SimC API functions */
	}

	.simc-editor :global(.cm-dark-theme .cm-string-2) {
		color: #ce9178; /* Mixed identifiers */
	}

	.simc-editor :global(.cm-dark-theme .cm-comment) {
		color: #6a9955;
		font-style: italic;
	}

	.simc-editor :global(.cm-dark-theme .cm-bracket) {
		color: #d4d4d4;
	}
</style>
