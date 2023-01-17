<div class="buttons-section">
	<div>
		<h3 class="mb-1">Styles</h3>
		<button> default </button>
		<button class="outlined"> outlined</button>
		<button class="tonal"> tonal</button>
		<button class="tonal outlined"> tonal outlined</button>
	</div>
	<div>
		<h3 class="mb-1">Styles with brand color</h3>
		<button class="brand"> default </button>
		<button class="outlined brand"> outlined</button>
		<button class="tonal brand-text"> tonal</button>
		<button class="tonal outlined brand-text"> tonal outlined</button>
	</div>
	<div>
		<h3 class="mb-1">Styles with success color</h3>
		<button class="success"> default </button>
		<button class="outlined success"> outlined</button>
		<button class="tonal success-text"> tonal</button>
		<button class="tonal outlined success-text"> tonal outlined</button>
	</div>
	<div>
		<h3 class="mb-1">As icon</h3>
		<button class="icon"> D </button>
		<button class="outlined icon"> O</button>
		<button class="tonal icon"> T</button>
		<button class="tonal outlined icon"> TO</button>
	</div>
	<div>
		<h3 class="mb-1">As icon color</h3>
		<button class="icon brand">
			<i class="gg-alarm" />
		</button>
		<button class="outlined icon brand"> O</button>
		<button class="tonal icon brand-text"> T</button>
		<button class="tonal outlined icon brand-text"> TO</button>
	</div>
</div>

<style lang="scss">
	.buttons-section {
		display: flex;
		flex-direction: column;
		gap: var(--size-3);
	}
</style>
