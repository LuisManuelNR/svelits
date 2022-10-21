<div class="sv-app">
	<slot />
</div>

<style lang="scss" global>
	@use './styles/reset.scss';
	@use './styles/variables.scss';
	@use './styles/app.scss';
	@use './styles/colors.scss';
	@use './styles/buttons.scss';
	.sv-app {
		min-height: 100vh;
	}
</style>
