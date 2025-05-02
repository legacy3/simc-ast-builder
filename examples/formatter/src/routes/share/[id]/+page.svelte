<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		// Redirect to the main page with the shared code
		goto('/', { replaceState: true });
	});
</script>

<!-- Simple loading indicator while redirecting -->
<div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
	<p>Loading...</p>
</div>
