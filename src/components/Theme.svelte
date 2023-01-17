<script lang="ts">
	import { onMount } from 'svelte'
	import { generateTheme, DEFAULTS_THEME } from '$lib/scripts/theme'
	let selected = 'dark'
	$: colors = Object.keys(DEFAULTS_THEME[selected]).map((color) => color)

	let mainAppElement: HTMLElement
	onMount(() => {
		mainAppElement = document.querySelector(':root') || document.body
	})
	let oldSelected = ''
	$: {
		if (mainAppElement) {
			mainAppElement.classList.remove(`${oldSelected}-theme`)
			mainAppElement.classList.add(`${selected}-theme`)
			oldSelected = selected
		}
	}

	function generateAndCopy() {
		const result = generateTheme()
		navigator.clipboard.writeText(result)
	}
</script>

<div class="options">
	{#each Object.keys(DEFAULTS_THEME) as theme}
		<label>
			<input type="radio" bind:group={selected} name={theme} value={theme} />
			{theme}
		</label>
	{/each}
</div>
<button class="btn" on:click={generateAndCopy}> generate and copy </button>
<h3>{selected}</h3>
<div class="theme-container pa-4">
	{#each colors as color}
		<div>
			<p>.{color}</p>
			<div class="box {color}" />
		</div>
	{/each}
</div>

<style>
	.options {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
	.theme-container {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		font-size: x-large;
	}
	.box {
		width: 100px;
		height: 100px;
		border-radius: var(--size-1);
		display: grid;
		place-content: center;
		font-weight: 700;
		border: 2px solid rgba(0, 0, 0, 0.504);
	}
</style>
