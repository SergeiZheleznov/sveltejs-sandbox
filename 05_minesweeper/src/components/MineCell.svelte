<script lang="ts">
  import type { ICell } from "src/interfaces";

  export let cell: ICell;
</script>

<div
  class="cellWrapper"
  class:danger={cell.danger && cell.state == "opened"}
  class:notChecked={cell.state === "closed"}
  on:click
>
  <div>
    {#if cell.state === "closed"}
      {" "}
    {:else}
      {cell.danger ? "x" : cell.minesCount}
    {/if}
  </div>
</div>

<style style lang="postcss">
  .cellWrapper {
    @apply text-white w-10 h-10 flex flex-wrap justify-center content-center bg-gray-700;
  }
  .danger {
    @apply bg-red-700;
  }
  .notChecked {
    cursor: pointer;
  }
</style>
