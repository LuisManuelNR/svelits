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

<dialog bind:this={dialogElement}>
	<slot {close} {open} />
</dialog>

<style lang="scss">
	dialog {
		max-width: var(--dialog-max-width, 70ch);
		margin: auto;
		animation: scale 0.1s ease;
		padding: var(--size-3);
		border: none;
		box-shadow: var(--shadow-3);
		border-radius: var(--size-1);
		&::backdrop {
			background-color: #0000006e;
			animation: fade 0.2s ease;
		}
	}
</style>
