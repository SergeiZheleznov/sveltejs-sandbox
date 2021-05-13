<script lang="ts">
  import { Field } from "src/models";
  import MineCell from "components/MineCell.svelte";

  export let colCount: number;
  export let rowCount: number;

  const field = new Field(colCount, rowCount);
</script>

<div class="fieldWrapper">
  {#each field.cells as row}
    <div class="flex flex-row">
      {#each row as cell}
        <div>
          <MineCell {cell} />
        </div>
      {/each}
    </div>
  {/each}
</div>

<style style lang="postcss">
  .fieldWrapper {
    @apply font-bold py-2 px-2 rounded bg-gray-100;
  }
</style>
