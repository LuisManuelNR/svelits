<script lang="ts">
	import Themes from '../components/Theme.svelte'
	import Buttons from '../components/Buttons.svelte'
	import Dialogs from '../components/Dialogs.svelte'
</script>

<div class="page mt-4">
	<h2>Theme</h2>
	<section class="card" id="Colors">
		<Themes />
	</section>
	<h2>Buttons</h2>
	<section class="card" id="Buttons">
		<Buttons />
	</section>
	<h2>Dialogs</h2>
	<section class="card" id="Dialogs">
		<Dialogs />
	</section>
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		padding-bottom: var(--size-10);
	}
</style>
