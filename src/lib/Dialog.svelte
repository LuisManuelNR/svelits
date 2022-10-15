<script lang="ts">
	let dialogElement: HTMLDialogElement
	function open() {
		dialogElement.showModal()
	}
	function close() {
		dialogElement.close()
	}
</script>

<slot name="action" {open}>
	<button on:click={open}> open </button>
</slot>

<dialog bind:this={dialogElement}>
	<slot {close} />
</dialog>

<style lang="scss">
	dialog {
		max-width: var(--dialog-max-width, 70ch);
		&::backdrop {
			backdrop-filter: saturate(180%) blur(5px);
		}
	}
</style>
