<div
	style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; gap: var(--space-4);"
>
	<p>Failed to load the shared code</p>

	<a href="/" class="button is-primary">
		<span class="icon">
			<i class="fas fa-home"></i>
		</span>
		<span>Back to Editor</span>
	</a>
</div>

<style>
	p {
		font-size: var(--responsive-font-lg);
		margin-bottom: 0;
		color: var(--text-color);
	}

	.button {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-2) var(--space-3);
		transition:
			transform var(--transition-fast),
			box-shadow var(--transition-normal);
	}

	.button:hover {
		transform: translateY(-2px);
		text-decoration: none;
	}

	.icon {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
