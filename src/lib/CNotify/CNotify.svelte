<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import { slide } from 'svelte/transition'
	import CIcon from '../CIcon/CIcon.svelte'
	import { mdiClose } from '@mdi/js'

	const dispatch = createEventDispatcher()
	const duration = 250

	export let visible = false
	export let title = ''
	export let text = ''
	export function close() {
		visible = false
		setTimeout(() => {
			dispatch('close')
		}, duration)
	}
	export let type = ''
</script>

{#if visible}
	<div transition:slide={{ duration: duration }} class="c-notify {type}">
		<slot {close}>
			<div class="d-flex align-center justify-between px-3 py-1">
				<strong>{title}</strong>
				<button class="btn icon tonal" on:click={close}>
					<CIcon icon={mdiClose} />
				</button>
			</div>
			{#if text}
				<p class="px-3 pb-3">{text}</p>
			{/if}
		</slot>
	</div>
{/if}

<style lang="scss">
	.c-notify {
		width: 100%;
		margin-bottom: 16px;
		border-radius: var(--size-1);
		position: relative;
		overflow: hidden;
	}
	:global(.notifications-holder) {
		position: fixed;
		bottom: 0;
		right: 0;
		padding: 0 1rem;
		width: 100%;
		max-width: 400px;
		z-index: 100;
	}
</style>
