import { browser } from '$app/environment';

export function load() {
	return {
		title: 'SimC AST Formatter',
		description: 'Parse SimulationCraft code and visualize the Abstract Syntax Tree',
		defaultCode: 'actions=frost_strike,if=runic_power>=80&!buff.killing_machine.up'
	};
}
