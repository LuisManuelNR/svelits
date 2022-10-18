<div class="sv-app">
	<slot />
</div>

<style lang="scss" global>
	@use './styles/reset.scss';
	@use './styles/layout.scss';
	.sv-app {
		background-color: rgb(22, 21, 21);
		min-height: 100vh;
		padding: 24px;
	}
</style>
