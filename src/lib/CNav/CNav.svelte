<script lang="ts">
	let dialogElement: HTMLDialogElement
	function open() {
		dialogElement.showModal()
	}
	function close() {
		dialogElement.close()
	}
	function onClick(e: Event) {
		if (e.target === dialogElement) {
			close()
		}
	}
</script>

<slot name="action">
	<button class="btn" on:click={open}> open dialog </button>
</slot>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog bind:this={dialogElement} on:click={onClick}>
	<slot name="header" />
	<div class="nav-body">
		<slot {close} {open} />
	</div>
	<slot name="footer" />
</dialog>

<style lang="scss">
	dialog {
		height: 100%;
		width: 100%;
		max-height: 100%;
		max-width: 325px;
		animation: slideX 0.15s ease;
		box-shadow: var(--shadow-3);
		border: none;
		.nav-body {
			height: 100%;
			overflow-x: hidden;
			overflow-y: auto;
		}
		&::backdrop {
			background-color: #0000006e;
			animation: fade 0.2s ease;
		}
	}
</style>
