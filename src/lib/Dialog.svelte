<script lang="ts">
	let dialogElement: HTMLDialogElement
	function open() {
		dialogElement.showModal()
	}
	function close() {
		dialogElement.close()
	}
</script>

<slot name="action">
	<button class="btn" on:click={open}> open dialog </button>
</slot>

<dialog class="card" bind:this={dialogElement}>
	<slot {close} {open} />
</dialog>

<style lang="scss">
	dialog {
		max-width: var(--dialog-max-width, 70ch);
		margin: auto;
		animation: scale 0.1s ease;
		&::backdrop {
			background-color: #0000006e;
			animation: fade 0.2s ease;
		}
	}
</style>
