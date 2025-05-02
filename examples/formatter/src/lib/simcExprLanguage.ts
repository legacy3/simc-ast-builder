import { StreamLanguage, LanguageSupport, StringStream } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { EditorView } from '@codemirror/view';
import { StateEffect, Compartment } from '@codemirror/state';

/**
 * SimCExpr language support for CodeMirror 6
 *
 * This implements a non-AST based syntax highlighting for the SimCExpr language
 * based on the grammar defined in src/parser/antlr4/SimCExpr.g4
 */

// Define types for the state
interface SimCExprState {
	inActionLine: boolean;
	inActionParam: boolean;
	expectingActionName: boolean;
	expectingSublistName: boolean;
}

// Keywords in the SimCExpr language
const keywords = [
	// Basic keywords
	'actions',
	'ceil',
	'floor',

	// SimC API functions
	'action',
	'active_dot',
	'buff',
	'cooldown',
	'cycle_enemies',
	'debuff',
	'dot',
	'eclipse',
	'equipped',
	'fight_remains',
	'gcd',
	'health',
	'hero_tree',
	'main_hand',
	'movement',
	'pet',
	'prev',
	'prev_gcd',
	'prev_off_gcd',
	'raid_event',
	'set_bonus',
	'spell_targets',
	'stat',
	'target',
	'talent',
	'time',
	'toggle',
	'trinket',
	'variable',

	// Resource types
	'runic_power',
	'rage',
	'energy',
	'mana',
	'focus',
	'fury',
	'rune',
	'astral_power',
	'maelstrom',
	'insanity',
	'holy_power',
	'soul_shard',
	'soul_shards',
	'combo_points',
	'chi',
	'essence',

	// Class-specific handlers
	'death_knight',
	'druid',
	'evoker',
	'hunter',
	'mage',
	'monk',
	'paladin',
	'priest',
	'rogue',
	'shaman',

	// Special class abilities and mechanics
	'empowering',
	'release',
	'howl_summon',
	'boar_charge',
	'scorch_execute',
	'improved_scorch',
	'firestarter',
	'remaining_winters_chill',
	'feral_spirit',
	'lightning_rod',
	'stagger',
	'stealthed',
	'totem',
	'consecration',
	'death_and_decay',
	'rtb_buffs',

	// Special item handlers
	'hyperthread_wristwraps',

	// Hekili API handlers
	'boss',
	'group_members',
	'settings'
];

// Operators in the SimCExpr language
const operators = [
	// Logical operators
	'&',
	'|',
	'^',
	'!',
	// Arithmetic operators
	'+',
	'-',
	'*',
	'%',
	'%%',
	'@',
	// Comparison operators
	'>',
	'>=',
	'<',
	'<=',
	'=',
	'==',
	'!=',
	'<?',
	'>?',
	// Grouping operators
	'(',
	')'
];

/**
 * SimCExpr language definition for CodeMirror 6
 * Uses a stream parser for non-AST based highlighting
 */
export const simcExpr = StreamLanguage.define({
	name: 'simcexpr',

	startState(): SimCExprState {
		return {
			inActionLine: false,
			inActionParam: false,
			expectingActionName: false,
			expectingSublistName: false
		};
	},

	/**
	 * Maps token types to highlighting tags
	 */
	tokenTable: {
		comment: t.comment,
		keyword: t.keyword,
		operator: t.operator,
		number: t.number,
		string: t.string,
		punctuation: t.punctuation,
		actionName: t.variableName,
		actionParam: t.propertyName,
		actionParamKeyword: t.definitionKeyword,
		sublistName: t.propertyName,
		commonSublistName: t.standard(t.propertyName),
		mixedId: t.string,
		resourceType: t.special(t.variableName),
		classHandler: t.className,
		apiFunction: t.function(t.variableName)
	},

	/**
	 * Main tokenizing function that analyzes each token in the stream
	 */
	token(stream: StringStream, state: SimCExprState): string | null {
		// Handle comments (lines starting with #)
		if (stream.sol() && stream.peek() === '#') {
			stream.skipToEnd();
			return 'comment';
		}

		// Skip whitespace
		if (stream.eatSpace()) return null;

		// Check for action line start
		if (stream.sol() && stream.match(/actions/i)) {
			state.inActionLine = true;
			state.expectingSublistName = true;
			return 'keyword';
		}

		// Handle sublist name after 'actions.'
		if (state.expectingSublistName && stream.peek() === '.') {
			stream.next(); // consume the dot
			if (stream.match(/[a-zA-Z][a-zA-Z0-9_/]*/)) {
				const sublistName = stream.current();
				state.expectingSublistName = false;

				// Special highlighting for common sublist names
				if (
					[
						'precombat',
						'default',
						'aoe',
						'cleave',
						'st',
						'single_target',
						'opener',
						'cooldowns',
						'trinkets'
					].includes(sublistName)
				) {
					return 'commonSublistName';
				}

				return 'sublistName';
			}
		}

		// Handle action line assignment operators
		if (
			state.inActionLine &&
			!state.expectingActionName &&
			(stream.match('=') || stream.match('+='))
		) {
			state.expectingActionName = true;
			return 'operator';
		}

		// Handle optional slash before action name
		if (state.expectingActionName && stream.peek() === '/') {
			stream.next();
			return 'punctuation';
		}

		// Handle action name
		if (state.expectingActionName) {
			// Match a number, string, or mixed identifier
			if (
				stream.match(/[0-9]+(\.[0-9]+)?/) ||
				stream.match(/[a-zA-Z][a-zA-Z0-9_/]*/) ||
				stream.match(/[0-9]+[a-zA-Z][a-zA-Z0-9_/]*/)
			) {
				state.expectingActionName = false;
				state.inActionParam = false;
				return 'actionName';
			}
		}

		// Handle comma before action parameter
		if (state.inActionLine && stream.peek() === ',') {
			stream.next();
			state.inActionParam = true;
			return 'punctuation';
		}

		// Handle action parameter
		if (state.inActionParam) {
			// Match parameter name (identifier)
			if (
				stream.match(/[a-zA-Z][a-zA-Z0-9_/]*/) ||
				stream.match(/[0-9]+(\.[0-9]+)?/) ||
				stream.match(/[0-9]+[a-zA-Z][a-zA-Z0-9_/]*/)
			) {
				const paramName = stream.current();

				// Check if it's a known parameter type for better highlighting
				if (
					[
						'if',
						'target_if',
						'cycle_targets',
						'max_energy',
						'interrupt',
						'interrupt_if',
						'interrupt_global',
						'chain',
						'early_chain_if',
						'moving',
						'line_cd',
						'enabled',
						'strict',
						'use_off_gcd',
						'use_while_casting',
						'sync'
					].includes(paramName)
				) {
					return 'actionParamKeyword';
				}

				return 'actionParam';
			}

			// Match parameter assignment operator
			if (stream.match('=')) {
				state.inActionParam = false; // Now we expect an expression
				return 'operator';
			}
		}

		// Handle numbers
		if (stream.match(/[0-9]+(\.[0-9]+)?/)) {
			return 'number';
		}

		// Handle mixed identifiers (starting with digit but containing letters)
		if (stream.match(/[0-9]+[a-zA-Z][a-zA-Z0-9_/]*/)) {
			return 'mixedId';
		}

		// Handle string identifiers (traditional identifiers starting with a letter)
		if (stream.match(/[a-zA-Z][a-zA-Z0-9_/]*/)) {
			const word = stream.current();

			// Check if it's a keyword
			if (keywords.includes(word)) {
				// Categorize different types of keywords for better highlighting
				if (
					[
						'runic_power',
						'rage',
						'energy',
						'mana',
						'focus',
						'fury',
						'rune',
						'astral_power',
						'maelstrom',
						'insanity',
						'holy_power',
						'soul_shard',
						'soul_shards',
						'combo_points',
						'chi',
						'essence'
					].includes(word)
				) {
					return 'resourceType';
				} else if (
					[
						'death_knight',
						'druid',
						'evoker',
						'hunter',
						'mage',
						'monk',
						'paladin',
						'priest',
						'rogue',
						'shaman'
					].includes(word)
				) {
					return 'classHandler';
				} else if (
					[
						'action',
						'buff',
						'cooldown',
						'debuff',
						'dot',
						'pet',
						'talent',
						'target',
						'variable',
						'spell_targets',
						'gcd',
						'time'
					].includes(word)
				) {
					return 'apiFunction';
				} else {
					return 'keyword';
				}
			}

			return 'string';
		}

		// Handle operators
		for (const op of operators) {
			if (stream.match(op)) {
				return 'operator';
			}
		}

		// Handle dot for access expressions
		if (stream.peek() === '.') {
			stream.next();
			return 'punctuation';
		}

		// Default case: consume a single character and continue
		stream.next();
		return null;
	},

	/**
	 * Maps token types to highlighting tags
	 */
	languageData: {
		commentTokens: { line: '#' },
		wordChars: '_/'
	}
});

/**
 * Dark theme highlighting style for SimCExpr
 * Enhanced for better readability with high-contrast, highly visible colors
 * Optimized to avoid cyan colors and maximize readability on dark backgrounds
 */
export const darkThemeHighlightStyle = HighlightStyle.define([
	// Basic syntax elements
	{ tag: t.comment, color: '#8AE88A', fontStyle: 'italic' }, // Bright green for excellent visibility
	{ tag: t.keyword, color: '#FFD700' }, // Bright gold instead of cyan - much more readable
	{ tag: t.definitionKeyword, color: '#FFA500' }, // Bright orange for action parameter keywords
	{ tag: t.operator, color: '#FF9CAC' }, // Bright pink for operators to stand out clearly
	{ tag: t.number, color: '#7FFFAA' }, // Bright green for numbers
	{ tag: t.string, color: '#FFA07A' }, // Bright orange/salmon for better contrast
	{ tag: t.variableName, color: '#FFFFFF' }, // Pure white for action names - maximum visibility
	{ tag: t.propertyName, color: '#F8F8A0' }, // Bright yellow-white for property names
	{ tag: t.standard(t.propertyName), color: '#FFA500' }, // Bright orange for common sublist names
	{ tag: t.namespace, color: '#FF8C00' }, // Bright dark orange for namespaces
	{ tag: t.punctuation, color: '#FFFFFF' }, // Pure white for maximum visibility
	{ tag: t.className, color: '#FF6347' }, // Bright tomato red for class-specific handlers
	{ tag: t.function(t.variableName), color: '#FFFF00' }, // Bright yellow for API functions
	{ tag: t.special(t.variableName), color: '#FFD700' } // Bright gold for resource types
]);

/**
 * Light theme highlighting style for SimCExpr
 * Based on VS Code's "Light+" theme
 */
export const lightThemeHighlightStyle = HighlightStyle.define([
	// Basic syntax elements
	{ tag: t.comment, color: '#008000', fontStyle: 'italic' },
	{ tag: t.keyword, color: '#AF00DB' },
	{ tag: t.definitionKeyword, color: '#795E26' }, // For action parameter keywords
	{ tag: t.operator, color: '#AF00DB' },
	{ tag: t.number, color: '#098658' },
	{ tag: t.string, color: '#A31515' },
	{ tag: t.variableName, color: '#001080' },
	{ tag: t.propertyName, color: '#0070C1' },
	{ tag: t.standard(t.propertyName), color: '#267F99' }, // For common sublist names
	{ tag: t.namespace, color: '#0000FF' }, // For class-specific sublist names
	{ tag: t.punctuation, color: '#000000' },
	{ tag: t.className, color: '#267F99' }, // For class-specific handlers
	{ tag: t.function(t.variableName), color: '#795E26' }, // For API functions
	{ tag: t.special(t.variableName), color: '#795E26' } // For resource types
]);

/**
 * Get the appropriate highlight style based on the current theme
 */
function getThemeAwareHighlightStyle() {
	if (typeof document !== 'undefined') {
		const isDarkTheme = document.documentElement.classList.contains('is-dark-theme');
		return isDarkTheme ? darkThemeHighlightStyle : lightThemeHighlightStyle;
	}
	// Default to dark theme for SSR
	return darkThemeHighlightStyle;
}

/**
 * Complete language support for SimCExpr
 * This includes the parser and any additional extensions with theme-aware highlighting
 */
export function simcExprLanguage() {
	// Create a compartment for the syntax highlighting that can be reconfigured
	const highlightCompartment = new Compartment();

	// We'll use a simple flag to track if we've set up the listener
	let listenerSetup = false;

	// Create a function to set up the theme change listener
	const setupThemeChangeListener = EditorView.updateListener.of((update: { view: EditorView }) => {
		// Only set up the listener once
		if (!listenerSetup) {
			listenerSetup = true;

			// Function to update the highlighting based on theme
			const updateHighlighting = (event?: CustomEvent) => {
				const isDarkTheme = document.documentElement.classList.contains('is-dark-theme');
				const style = isDarkTheme ? darkThemeHighlightStyle : lightThemeHighlightStyle;

				update.view.dispatch({
					effects: highlightCompartment.reconfigure(syntaxHighlighting(style))
				});
			};

			// Listen for theme changes
			window.addEventListener('themeChanged', updateHighlighting as EventListener);

			// Force initial update to ensure correct theme is applied
			updateHighlighting();
		}
	});

	return new LanguageSupport(simcExpr, [
		highlightCompartment.of(syntaxHighlighting(getThemeAwareHighlightStyle())),
		setupThemeChangeListener
	]);
}
