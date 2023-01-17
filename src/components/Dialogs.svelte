<script lang="ts">
	import { Dialog } from '$lib'
</script>

<Dialog let:close>
	<p>
		Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus maxime maiores, quis eum
		quam placeat mollitia animi perferendis asperiores ipsum necessitatibus. Incidunt recusandae
		voluptates aperiam similique, quia dolore? Accusantium placeat molestias rem harum excepturi
		nostrum officiis odit veniam soluta, sapiente autem earum perferendis, quaerat quas. Deserunt
		maxime temporibus neque facere dolorem. Delectus quo in recusandae numquam, eaque iusto eveniet,
		perferendis nobis, ea aliquid tempore illum odit. Vero ex ad itaque, recusandae quae tempore
		molestias mollitia corporis ipsum voluptatem tempora similique? Repellat nostrum eligendi ab
		perspiciatis inventore eveniet fugiat iure natus porro quod, consectetur laboriosam officia
		asperiores error corrupti fugit molestiae.
	</p>
	<button on:click={close}> close </button>
</Dialog>
