<script lang="ts">
  import { MineCell } from "src/components";
  import { field } from "src/stores";
</script>

<div class="fieldWrapper">
  {#each $field.cells as row}
    <div class="flex flex-row gap-1">
      {#each row as cell}
        <div class="mb-1">
          <MineCell
            on:click={() => field.openCell(cell.row, cell.col)}
            {cell}
          />
        </div>
      {/each}
    </div>
  {/each}
  <button on:click={() => field.reset()}>Reset</button>
</div>

<style style lang="postcss">
  .fieldWrapper {
    @apply font-bold py-2 px-2 rounded bg-gray-100;
  }
</style>
