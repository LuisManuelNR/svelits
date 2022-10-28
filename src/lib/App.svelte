<div class="sv-app">
	<slot />
</div>

<style lang="scss" global>
	@use './styles/reset.scss';
	@use './styles/variables.scss';

	@use './styles/buttons.scss';

	@use './styles/theme.scss';
	@use './styles/utils.scss';
	.sv-app {
		min-height: 100vh;

		font-family: var(--font-family);
		font-size: var(--font-size);

		accent-color: var(--brand);
		background-color: var(--n-400);
		color: var(--contrast);
		block-size: 100%;

		*,
		*::after,
		*::before {
			box-sizing: border-box;
		}

		scroll-behavior: smooth;
		font-size: 100%; /*16px*/
		-webkit-text-size-adjust: 100%;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
</style>
