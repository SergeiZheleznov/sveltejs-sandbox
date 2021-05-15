<script lang="ts">
  import { MineCell } from "src/components";
  import type { ICell } from "src/interfaces";
  import { field } from "src/stores";

  const onCellLeftClick = (cell: ICell) => {
    if (cell.state !== "marked") {
      field.openCell(cell.row, cell.col);
    }
  };

  const onCellRightClick = (cell: ICell) => {
    if (cell.state !== "opened") {
      field.toggleMark(cell.row, cell.col);
    }
  };
</script>

<div class="fieldWrapper">
  {#each $field.cells as row}
    <div class="flex flex-row gap-1">
      {#each row as cell}
        <div class="mb-1">
          <MineCell
            on:click={() => onCellLeftClick(cell)}
            on:contextmenu={() => onCellRightClick(cell)}
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
