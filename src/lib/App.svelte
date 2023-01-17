<script context="module" lang="ts">
	import { writable } from 'svelte/store'
	export let paddingLeft = writable<string>('0')
	export let paddingRight = writable<string>('0')
</script>

<script lang="ts">
	let klass = ''
	export { klass as class }
</script>

<div
	class="sv-app {klass}"
	style="--app-padding-left: {$paddingLeft}; --app-padding-right: {$paddingRight}"
>
	<slot />
</div>

<style lang="scss" global>
	@use './styles/reset.scss';
	@use './styles/variables.scss';
	@use './styles/breakpoints.scss';
	@use './styles/animations.scss';

	@use './styles/buttons.scss';
	@use './styles/list-item.scss';
	@use './styles/cards.scss';

	@use './styles/theme.scss';
	@use './styles/utils.scss';

	:root {
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
		line-height: 1.5;
		font-size: 100%; /*16px*/
		-webkit-text-size-adjust: 100%;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		:has(dialog[open]) {
			overflow: hidden;
			padding-right: 7.5px;
		}
	}
	.sv-app {
		min-height: 100vh;
		padding-bottom: var(--app-padding-bottom);
		padding-top: var(--app-padding-top);
		@media only screen and (min-width: breakpoints.$md) {
			padding-left: var(--app-padding-left);
			padding-right: var(--app-padding-right);
		}
	}

	p {
		font-size: 1.1rem;
	}
</style>
