<script lang="ts">
	type CDLSrcset = {
		width: number
		height: number
		src: string
	}
	export let image: CDLImage | undefined = undefined
	export let src = image && (image.srcset.length > 1 ? image.srcset[4].src : image.srcset[0].src)
	export let alt = image?.alt
	export let srcset: string | CDLSrcset[] = image?.srcset || []
	export let width: number | string
	export let height: number | string
	export let sizes: string = `${width}px`
	export let loading: 'eager' | 'lazy' = 'lazy'

	const _srcset = typeof srcset === 'string' ? srcset : parseSrcet(srcset)

	function parseSrcet(set: CDLSrcset[]) {
		if (!set[0] || !set[0].width) return ''
		return set.map((s) => `${s.src} ${s.width}w`).join(',')
	}
</script>

{#if src}
	<img {src} {alt} {width} {height} {sizes} srcset={_srcset} {loading} />
{/if}

<style>
	img {
		background-color: var(--brand);
		height: auto;
	}
</style>
