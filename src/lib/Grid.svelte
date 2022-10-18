<div class="grid">
	<slot />
</div>

<style>
	.grid {
		display: grid;
		gap: var(--grid-gap, 1rem);
	}
</style>
