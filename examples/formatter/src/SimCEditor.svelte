<script>
  import { onMount, createEventDispatcher } from 'svelte';
  import CodeMirror from 'codemirror';
  import 'codemirror/lib/codemirror.css';
  
  // Import basic modes that might be helpful
  import 'codemirror/mode/clike/clike.js';
  
  // Export props
  export let value = '';
  export let placeholder = '';
  export let rows = 5;
  
  // Create event dispatcher
  const dispatch = createEventDispatcher();
  
  // Reference to the element where CodeMirror will be mounted
  let textarea;
  let editor;
  
  onMount(() => {
    // Define custom SimC mode for syntax highlighting
    CodeMirror.defineMode('simc', function() {
      return {
        token: function(stream, state) {
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
              'buff', 'debuff', 'cooldown', 'dot', 'talent', 'equipped',
              'active', 'pet', 'target', 'health', 'time', 'gcd',
              'spell_targets', 'variable', 'prev_gcd', 'prev_off_gcd'
            ];
            
            if (simcApiFunctions.includes(word)) {
              return 'builtin';
            }
            
            // Resources
            const resources = [
              'runic_power', 'rune', 'mana', 'rage', 'energy', 'combo_points',
              'holy_power', 'soul_shard', 'astral_power', 'maelstrom',
              'insanity', 'fury', 'pain', 'focus'
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
    
    // Initialize CodeMirror
    editor = CodeMirror.fromTextArea(textarea, {
      mode: 'simc',
      lineNumbers: true,
      theme: 'default',
      lineWrapping: true,
      tabSize: 2,
      indentWithTabs: false,
      autofocus: false,
      placeholder: placeholder,
      viewportMargin: Infinity
    });
    
    // Set initial value
    editor.setValue(value);
    
    // Handle changes
    editor.on('change', () => {
      const newValue = editor.getValue();
      if (value !== newValue) {
        value = newValue;
        dispatch('input', { value });
      }
    });
    
    // Handle editor height based on rows
    const lineHeight = editor.defaultTextHeight();
    const editorHeight = lineHeight * rows + 14; // Add some padding
    editor.getWrapperElement().style.height = `${editorHeight}px`;
    
    return () => {
      // Clean up on component destruction
      if (editor) {
        editor.toTextArea();
      }
    };
  });
  
  // Update editor when value changes externally
  $: if (editor && editor.getValue() !== value) {
    editor.setValue(value);
  }
</script>

<div class="simc-editor">
  <textarea bind:this={textarea} {placeholder}>{value}</textarea>
</div>

<style>
  .simc-editor {
    position: relative;
    width: 100%;
  }
  
  .simc-editor :global(.CodeMirror) {
    height: auto;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    font-family: monospace;
    font-size: 14px;
    line-height: 1.5;
  }
  
  .simc-editor :global(.CodeMirror-focused) {
    border-color: #86b7fe;
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
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
</style>