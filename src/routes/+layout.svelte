<script lang="ts">
	import { App, Nav } from '$lib'
	import { page } from '$app/stores'
	const navItems = [
		{
			section: 'CSS Classes',
			links: ['Colors', 'Buttons', 'Typography']
		},
		{
			section: 'Components',
			links: ['Nav', 'Dialogs']
		}
	]
</script>

<App>
	<Nav app let:toggle>
		<button slot="action" class="fab icon" on:click={toggle}> -- </button>
		<h1 slot="prepend" class="mb-3">Svelits</h1>
		{#each navItems as item}
			<p>{item.section}</p>
			{#each item.links as link}
				<a class="list-item" class:selected={$page.url.hash === `#${link}`} href="#{link}">{link}</a
				>
			{/each}
		{/each}
	</Nav>
	<main class="px-3">
		<slot />
	</main>
</App>
