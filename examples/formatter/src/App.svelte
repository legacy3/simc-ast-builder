<script>
	import { onMount } from 'svelte';
	import { parse, optimize } from 'simc-ast-builder';
	import TreeNode from './TreeNode.svelte';
	import VisualTreeView from './VisualTreeView.svelte';

	// State variables
	let simcCode = 'actions=frost_strike,if=runic_power>=80&!buff.killing_machine.up';
	let ast = null;
	let error = null;
	let shouldOptimize = false;
	let activeTab = 'text'; // 'text' or 'visual'

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

	// Switch between tabs
	function setActiveTab(tab) {
		activeTab = tab;
	}
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
				<ul class="nav nav-tabs card-header-tabs">
					<li class="nav-item">
						<button 
							class="nav-link {activeTab === 'text' ? 'active' : ''}" 
							on:click={() => setActiveTab('text')}>
							Text View
						</button>
					</li>
					<li class="nav-item">
						<button 
							class="nav-link {activeTab === 'visual' ? 'active' : ''}" 
							on:click={() => setActiveTab('visual')}>
							Visual Tree
						</button>
					</li>
				</ul>
			</div>
			<div class="card-body">
				{#if activeTab === 'text'}
					<div class="ast-tree">
						<TreeNode node={ast} />
					</div>
				{:else}
					<VisualTreeView {ast} />
				{/if}
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

	.nav-link {
		cursor: pointer;
	}
</style>