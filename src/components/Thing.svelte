<script lang="ts">
  let active = false
</script>

<button class="thing" on:click={() => active = !active}>
  <span class:active></span>
  the thing
</button>


<style>
  .thing {
    padding: 8px 25px;
  }
  span {
    display: block;
    width: 100%;
    height: 5px;
    background-color: rgb(156, 42, 8);
    transition: translate 150ms ease;
  }
  .active {
    translate: 0px -15px;
    scale: .8;
  }
</style>