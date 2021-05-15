<script lang="ts">
  import type { ICell } from "src/interfaces";
  import { fade } from "svelte/transition";
  export let cell: ICell;
</script>

{#if cell.state === "closed"}
  <div class="cellWrapper closed" on:click on:contextmenu|preventDefault>
    {" "}
  </div>
{:else if cell.state === "marked"}
  <div class="cellWrapper marked" on:contextmenu|preventDefault>
    {"M"}
  </div>
{:else if cell.state === "opened"}
  <div
    in:fade
    class="cellWrapper"
    class:danger={cell.danger}
    class:opened={!cell.danger}
  >
    {cell.danger ? "x" : cell.minesCount}
  </div>
{/if}

<style style lang="postcss">
  .cellWrapper {
    @apply text-white w-10 h-10 flex flex-wrap justify-center content-center cursor-default;
  }
  .danger {
    @apply bg-red-700;
  }
  .closed {
    @apply bg-gray-700 cursor-pointer;
  }
  .opened {
    @apply bg-gray-400 cursor-pointer;
  }
  .marked {
    @apply bg-yellow-700;
  }
</style>
