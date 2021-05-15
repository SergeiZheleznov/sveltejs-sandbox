<script lang="ts">
  import type { ICell } from "src/interfaces";

  export let cell: ICell;
</script>

<div
  class="cellWrapper"
  class:danger={cell.danger && cell.state == "opened"}
  class:notChecked={cell.state === "closed"}
  class:marked={cell.state === "marked"}
  on:click
  on:contextmenu|preventDefault
>
  <div>
    {#if cell.state === "closed"}
      {" "}
    {:else if cell.state === "marked"}
      {"M"}
    {:else}
      {cell.danger ? "x" : cell.minesCount}
    {/if}
  </div>
</div>
<style style lang="postcss">
  .cellWrapper {
    @apply text-white w-10 h-10 flex flex-wrap justify-center content-center bg-gray-700;
    cursor: default;
  }
  .danger {
    @apply bg-red-700;
    cursor: default;
  }
  .notChecked {
    cursor: pointer;
  }
  .marked {
    @apply bg-yellow-700;
    cursor: default;
  }
</style>
