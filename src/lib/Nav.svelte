<script lang="ts">
	import { paddingLeft, paddingRight } from './App.svelte'
	import { fade } from 'svelte/transition'
	export let app = false
	export let width = '250px'
	export let right = false
	export let visible = false
	if (app) {
		const offset = `calc(${width} + var(--size-3))`
		if (right) {
			paddingRight.set(offset)
		} else {
			paddingLeft.set(offset)
		}
	}
	function toggle() {
		visible = !visible
	}
</script>

<div class="nav-action">
	<slot name="action" />
</div>

<aside class="nav card" class:app class:visible class:right style="width: {width};">
	<slot name="prepend" />
	<div class="nav-content">
		<slot {toggle} />
	</div>
	<slot name="append" />
</aside>

{#if visible}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="nav-overlay" transition:fade={{ duration: 100 }} on:click={toggle} />
{/if}

<style lang="scss">
	@use './styles/breakpoints.scss';
	.nav {
		height: calc(100% - var(--size-3) * 2);
		transition: transform 0.15s ease;
		// isolation: isolate;
		&.right {
			left: initial;
			right: var(--size-3);
		}
	}
	.nav-content {
		display: flex;
		flex-direction: column;
		gap: var(--size-2);
	}
	.app {
		position: fixed;
		top: var(--size-3);
		left: var(--size-3);
		z-index: 5;
		transform: translate(-109%);
	}
	.nav-overlay {
		position: fixed;
		inset: 0;
		background-color: rgba(0, 0, 0, 0.5);
	}
	.nav-action {
		z-index: 4;
	}
	@media only screen and (min-width: breakpoints.$md) {
		.app {
			transform: translate(0);
		}
		.nav-action,
		.nav-overlay {
			display: none;
		}
	}
	.visible {
		transform: translate(0);
		box-shadow: var(--shadow-3);
	}
</style>
