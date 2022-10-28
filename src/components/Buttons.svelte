<section class="buttons-section pa-5 n-300">
	<h2>Buttons</h2>
	<div>
		<h3 class="mb-1">Styles</h3>
		<button class="btn"> default </button>
		<button class="btn outlined"> outlined</button>
		<button class="btn tonal"> tonal</button>
		<button class="btn tonal outlined"> tonal</button>
	</div>
	<div>
		<h3 class="mb-1">Styles with brand color</h3>
		<button class="btn brand"> default </button>
		<button class="btn outlined brand"> outlined</button>
		<button class="btn tonal brand-text"> tonal</button>
		<button class="btn tonal outlined brand-text"> tonal outlined</button>
	</div>
	<div>
		<h3 class="mb-1">Styles with success color</h3>
		<button class="btn success"> default </button>
		<button class="btn outlined success"> outlined</button>
		<button class="btn tonal success-text"> tonal</button>
		<button class="btn tonal outlined success-text"> tonal outlined</button>
	</div>
</section>

<style lang="scss">
	.buttons-section {
		display: flex;
		flex-direction: column;
		gap: var(--size-3);
	}
</style>
