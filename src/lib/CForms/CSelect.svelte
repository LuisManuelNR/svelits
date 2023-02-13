<script lang="ts">
	import CInput from './CInput.svelte'
	import CMenu from '../CMenu/CMenu.svelte'
	import CIcon from '../CIcon/CIcon.svelte'
	import { mdiChevronDown } from '@mdi/js'
	import { createEventDispatcher, tick } from 'svelte'

	type T = $$Generic<Record<string, any> | string | number>
	type X = $$Generic<keyof T | undefined>
	export let label = ''
	export let items: T[] = []
	export let itemText: keyof T | undefined = undefined
	export let itemValue: X | undefined = undefined
	export let value:
		| (T extends Record<string, any> ? (X extends keyof T ? T[X] : T) : T)
		| undefined = undefined
	export let rules: Array<(inputValue: typeof value) => string | boolean> = []
	export let filter = false
	export let disabled = false
	export let loading = false

	let filteredItems: typeof items = items
	let visibleMenu = false
	let hoveredItem = -1
	let selectText: string | undefined = ''
	let dispatch = createEventDispatcher()
	let selectElement: HTMLDivElement
	const ssr = import.meta.env.SSR
	let dirty = false

	$: {
		if (value) {
			const currentValue = itemValue && value instanceof Object ? value[itemValue] : value
			selectText = `${
				itemText && currentValue instanceof Object ? currentValue[itemText] : currentValue
			}`
		}
	}
	$: {
		if (!visibleMenu) {
			filteredItems = items
			hoveredItem = -1
			if (!ssr && dirty && window.history.state === 'select open') {
				window.history.back()
			}
		} else {
			dirty = true
			if (window.history.state !== 'select open') {
				window.history.pushState('select open', '')
			}
		}
	}

	function onSelectItem(v: T) {
		const input = selectElement.querySelector('input')!
		return () => {
			// @ts-ignore
			value = itemValue && v instanceof Object ? v[itemValue] : v
			visibleMenu = false
			input.focus()
			dispatch('change', value)
		}
	}

	function onFilter(e: Event) {
		hoveredItem = -1
		const inputValue = (e.target as HTMLInputElement).value
		filteredItems = items.filter((v: T) => {
			const toNormalize = itemText && v instanceof Object ? v[itemText] : v
			if (typeof toNormalize === 'string' || typeof toNormalize === 'number') {
				const a = normalizeItems(`${toNormalize}`)
				const b = normalizeItems(`${inputValue}`)
				return a.indexOf(b) > -1
			}
			return v
		})
	}

	function normalizeItems(str: string) {
		return str
			.toLowerCase()
			.normalize('NFD')
			.replace(/[\u0300-\u036F]/g, '')
	}

	function handleKeyDown(isFilter = false) {
		return async (e: KeyboardEvent) => {
			const kUp = e.code === 'ArrowUp'
			const kDown = e.code === 'ArrowDown'
			const kSpace = e.code === 'Space'
			const kTab = e.code === 'Tab'
			const kEnter = e.code === 'Enter'
			if ((kTab || kSpace) && visibleMenu && !isFilter) {
				e.stopPropagation()
				e.preventDefault()
				visibleMenu = false
				return
			}
			if (kUp || kDown || (kSpace && !isFilter)) {
				visibleMenu = true
				e.preventDefault()
				e.stopPropagation()
			}
			if (kUp) {
				hoveredItem -= hoveredItem <= 0 ? -filteredItems.length + 1 : 1
				await tick()
				scrollItemSelectIntoView()
			}
			if (kDown) {
				hoveredItem += hoveredItem === filteredItems.length - 1 ? -filteredItems.length + 1 : 1
				await tick()
				scrollItemSelectIntoView()
			}
			if (kEnter) {
				e.preventDefault()
				e.stopPropagation()
				const selected = filteredItems[hoveredItem]
				if (selected) {
					onSelectItem(selected)()
				}
			}
		}
	}

	function scrollItemSelectIntoView() {
		const element = selectElement.querySelector('.c-select-item.hovered')
		if (!element) return
		if ('scrollIntoViewIfNeeded' in window) {
			//@ts-ignore
			element.scrollIntoViewIfNeeded({ block: 'end' })
		} else {
			element.scrollIntoView({ block: 'end' })
		}
	}
	function handlePopState(e: PopStateEvent) {
		console.log(e)
		if (visibleMenu) {
			visibleMenu = false
			// window.history.back()
		}
	}
</script>

<svelte:window on:popstate={handlePopState} />

<div class="c-select" bind:this={selectElement} role="textbox" class:is-filter={filter}>
	<div class="overlay" class:show-overlay={visibleMenu} />
	<CMenu let:toggle bind:visible={visibleMenu} closeOnClick>
		<svelte:fragment slot="action">
			<CInput
				type="select"
				{label}
				{rules}
				{value}
				{disabled}
				{loading}
				on:click={toggle}
				on:keydown={handleKeyDown()}
			>
				<slot slot="prepend" name="prepend" />
				<input readonly value={selectText} disabled={disabled || loading} type="button" />
				<svelte:fragment slot="append">
					<CIcon icon={mdiChevronDown} />
				</svelte:fragment>
			</CInput>
		</svelte:fragment>
		{#if filter}
			<div class="px-3 pt-2 pb-1 filter-input" on:click|stopPropagation on:keydown>
				<CInput>
					<!-- svelte-ignore a11y-autofocus -->
					<input
						autofocus
						placeholder="Filtrar Lista"
						on:input={onFilter}
						on:keydown={handleKeyDown(true)}
					/>
				</CInput>
			</div>
		{/if}
		{#each filteredItems as item, i}
			<div
				class="c-select-item"
				class:hovered={hoveredItem === i}
				on:click={onSelectItem(item)}
				on:mouseenter={() => (hoveredItem = i)}
				on:keydown|stopPropagation
			>
				<slot name="item" {item} index={i}>
					{itemText ? item[itemText] : item}
				</slot>
			</div>
		{/each}
	</CMenu>
</div>

<style lang="scss">
	.c-select {
		.overlay {
			position: fixed;
			inset: 0;
			background-color: #0000006e;
			pointer-events: none;
			opacity: 0;
			transition: opacity 200ms ease;
			z-index: 1;
		}
		:global(.c-menu-content) {
			padding: 0;
		}
		input {
			cursor: initial;
			display: flex;
			user-select: none;
		}
		:global(label) {
			pointer-events: none;
		}
		:global(.c-select-item) {
			padding: var(--size-1) var(--size-3);
			position: relative;
			&::before {
				content: '';
				position: absolute;
				inset: 0;
				opacity: 0;
				background-color: currentColor;
				border-radius: inherit;
				pointer-events: none;
			}
			&.hovered::before,
			:global(&.active):before {
				opacity: 0.15;
			}
			&.hovered {
				color: var(--n-500);
			}
		}
		.filter-input {
			position: sticky;
			top: 0;
			background-color: var(--n-100);
			z-index: 1;
			:global(.c-input) {
				margin: 0;
			}
		}
		/* smartphones, touchscreens */
		@media (hover: none) and (pointer: coarse) {
			.show-overlay {
				opacity: 1;
			}
			:global(.c-menu-content) {
				position: fixed;
				inset: 16px;
				width: auto;
				height: fit-content;
				max-height: -webkit-fill-available;
				top: 50%;
				transform: translate(0, -50%);
			}
			&.is-filter :global(.c-menu-content) {
				height: auto;
				width: auto;
				top: 16px;
				max-height: 100%;
				transform: translate(0, 0);
			}
			.c-select-item {
				padding: var(--size-3) var(--size-3);
				border-bottom: 1px solid var(--n-300);
			}
		}
	}
</style>
