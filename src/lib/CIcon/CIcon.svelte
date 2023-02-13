<script lang="ts">
	export let icon: string
	export let size = 24
	let klass = ''
	export { klass as class }
</script>

<svg viewBox="0 0 24 24" aria-hidden="true" class="c-icon {klass}" width={size} height={size}>
	<path d={icon} />
</svg>

<style lang="scss">
	.c-icon {
		fill: currentColor;
	}
</style>
