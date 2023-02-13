<script lang="ts">
	import CInput from './CInput.svelte'
	import CIcon from '../CIcon/CIcon.svelte'
	import { scale } from 'svelte/transition'
	import {
		mdiCheckboxBlankOutline,
		mdiCheckboxMarked,
		mdiRadioboxBlank,
		mdiRadioboxMarked
	} from '@mdi/js'

	export let label: string = ''
	export let rules: Array<(inputValue: boolean) => string | boolean> = []
	export let type: 'checkbox' | 'radio' = 'checkbox'
	export let group: any = ''
	export let value: any = undefined
	export let checked = false
	export let disabled = false
	export let loading = false

	$: type === 'radio' && updateRadio(group, value)

	$: type === 'checkbox' && group && updateChekbox(group, value)
	$: type === 'checkbox' && group && updateGroup(checked, value)

	function updateRadio(g: typeof group, v: typeof value) {
		checked = g === v
	}

	function updateChekbox(g: typeof group, v: typeof value) {
		if (type === 'checkbox' && g) {
			checked = g.indexOf(v) >= 0
		}
	}

	function updateGroup(c: typeof checked, v: typeof value) {
		const index = group.indexOf(v)
		if (c) {
			if (index < 0) {
				group = [...group, v]
			}
		} else {
			if (index >= 0) {
				const cloneG = group
				cloneG.splice(index, 1)
				group = cloneG
			}
		}
	}
</script>

<div class="c-toggle" class:checked>
	<CInput {rules} {label} value={checked} {disabled} {loading}>
		{#if type === 'radio'}
			<input type="radio" {value} bind:group disabled={disabled || loading} />
		{:else}
			<input type="checkbox" {value} bind:checked disabled={disabled || loading} />
		{/if}
		<svelte:fragment slot="prepend">
			{#if checked}
				<div class="icon" in:scale={{ duration: 100, start: 0.7 }}>
					<CIcon icon={type === 'checkbox' ? mdiCheckboxMarked : mdiRadioboxMarked} />
				</div>
			{:else}
				<div class="icon" in:scale={{ duration: 100, start: 0.7 }}>
					<CIcon icon={type === 'checkbox' ? mdiCheckboxBlankOutline : mdiRadioboxBlank} />
				</div>
			{/if}
		</svelte:fragment>
	</CInput>
</div>

<style lang="scss">
	.c-toggle {
		--border-color-input: transparent;
		input {
			position: absolute;
			inset: 0;
			opacity: 0;
		}
		:global(.c-input) {
			padding-left: 0;
		}
		:global(.label-text) {
			transform: translate(0, 0) scale(1);
			font-size: 1.1rem;
			cursor: pointer;
		}
		:global(:focus-within:not(.error-state)) {
			--border-color-input: transparent;
		}
		.icon {
			display: flex;
			pointer-events: none;
		}
		&.checked .icon {
			color: var(--secondary);
		}
	}
</style>
