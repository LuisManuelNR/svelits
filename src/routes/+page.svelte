<script lang="ts">
	import { App, Grid } from '$lib'
	import Layouts from '../components/Layouts.svelte'
</script>

<App>
	<nav class="side-nav">hola</nav>
	<main>
		<Layouts />
	</main>
</App>

<style>
	:global(.sv-app) {
		display: grid;
		grid-template-columns: 250px minmax(0, 1fr);
		gap: 2rem;
		color: rgb(213, 213, 213);
	}
	.side-nav {
		min-height: 100%;
		background-color: rgb(50, 50, 50);
	}
</style>
