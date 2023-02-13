<script lang="ts">
	import { slide } from 'svelte/transition'

	export let closeOnClick = false
	export let visible = false

	let menuElement: HTMLDivElement
	let orientation = 'to-top'

	$: {
		if (visible) {
			const { bottom } = menuElement.getBoundingClientRect()
			orientation = window.innerHeight - bottom < 350 ? 'to-bottom' : 'to-top'
		}
	}

	function openMenu() {
		visible = true
	}
	function closeMenu() {
		visible = false
	}
	function toggle(e: MouseEvent | KeyboardEvent) {
		e.stopPropagation()
		if (visible) closeMenu()
		else openMenu()
	}
	function onContentClick(e: MouseEvent) {
		if (!closeOnClick) e.stopPropagation()
	}
</script>

<svelte:window on:click={closeMenu} />

<div class="c-menu" bind:this={menuElement}>
	<slot name="action">
		<button class="btn" on:click={toggle}>open</button>
	</slot>
	{#if visible}
		<div
			transition:slide={{ duration: 150 }}
			tabindex="-1"
			class="c-menu-content {orientation}"
			on:click={onContentClick}
			on:keydown
		>
			<slot {toggle} {visible} />
		</div>
	{/if}
</div>

<style lang="scss">
	@layer CMenu {
		.c-menu {
			position: relative;
			.c-menu-content {
				width: 100%;
				max-width: 98vw;
				position: absolute;
				left: 0;
				background-color: var(--n-100);
				box-shadow: var(--shadow-3);
				border-radius: var(--size-1);
				padding: var(--size-3);
				display: inline-block;
				max-height: 350px;
				overflow-x: hidden;
				overflow-y: auto;
				z-index: 999;
				& > * {
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}
				&.to-bottom {
					bottom: 100%;
				}
				&.to-top {
					top: 100%;
				}
			}
		}
	}
</style>
