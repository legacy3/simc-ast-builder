<script>
	import { onMount } from 'svelte';
	import { parse, optimize } from 'simc-ast-builder';
	import TreeNode from './TreeNode.svelte';

	// State variables
	let simcCode = 'actions=frost_strike,if=runic_power>=80&!buff.killing_machine.up';
	let ast = null;
	let error = null;
	let shouldOptimize = false;

	// Parse the SimC code and generate the AST
	function parseCode() {
		try {
			error = null;
			let parsedAst = parse(simcCode);
			
			// Optimize if requested
			if (shouldOptimize) {
				parsedAst = optimize(parsedAst);
			}
			
			ast = parsedAst;
		} catch (e) {
			error = `Error parsing SimC code: ${e.message}`;
			ast = null;
		}
	}

	// Parse the initial code on mount
	onMount(() => {
		parseCode();
	});
</script>

<main class="container py-4">
	<header class="mb-4 text-center">
		<h1 class="display-5 fw-bold text-primary">SimC AST Formatter</h1>
		<p class="lead">Parse SimulationCraft code and visualize the Abstract Syntax Tree</p>
	</header>

	<div class="card mb-4">
		<div class="card-body">
			<div class="mb-3">
				<label for="simc-input" class="form-label">SimC Code</label>
				<textarea 
					id="simc-input" 
					class="form-control" 
					rows="5"
					bind:value={simcCode}
					placeholder="Enter SimC code here..."></textarea>
			</div>

			<div class="d-flex align-items-center mb-3">
				<div class="form-check me-3">
					<input 
						type="checkbox" 
						id="optimize-checkbox" 
						class="form-check-input"
						bind:checked={shouldOptimize}>
					<label for="optimize-checkbox" class="form-check-label">
						Optimize AST
					</label>
				</div>
				
				<button 
					on:click={parseCode}
					class="btn btn-primary">
					Parse Code
				</button>
			</div>

			{#if error}
				<div class="alert alert-danger" role="alert">
					{error}
				</div>
			{/if}
		</div>
	</div>

	{#if ast}
		<div class="card">
			<div class="card-header">
				<h2 class="h5 mb-0">AST Visualization</h2>
			</div>
			<div class="card-body">
				<div class="ast-tree">
					<TreeNode node={ast} />
				</div>
			</div>
		</div>
	{/if}
</main>

<style>
	:global(body) {
		background-color: #f8f9fa;
		padding: 0;
	}

	.ast-tree {
		max-height: 600px;
		overflow: auto;
	}
</style>