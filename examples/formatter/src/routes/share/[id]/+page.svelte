<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;

	onMount(() => {
		// Redirect to the main page with the shared code via query parameter
		goto(`/?id=${data.id}`, {
			replaceState: true
		});
	});
</script>

<!-- Simple loading indicator while redirecting -->
<div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
	<p>Loading shared code...</p>
</div>
