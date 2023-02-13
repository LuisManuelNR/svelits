<script lang="ts">
	import { slide } from 'svelte/transition'
	import CIcon from '../CIcon/CIcon.svelte'
	import { mdiPlus } from '@mdi/js'

	export let active = false
	let klass = ''
	export { klass as class }
</script>

<button
	class="d-flex align-center pa-2 gap-2 {klass}"
	class:active
	on:click={() => (active = !active)}
>
	<slot name="header">Panel header</slot>
	<slot name="icon">
		<CIcon icon={mdiPlus} class="ml-auto" />
	</slot>
</button>
{#if active}
	<div transition:slide={{ duration: 180 }}>
		<slot />
	</div>
{/if}

<style>
	button {
		width: 100%;
		transition: 0.2s ease;
	}
	.active {
		padding: 12px 24px;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}
</style>
