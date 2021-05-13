<script lang="ts">
  import type { ICell } from "src/interfaces";

  export let cell: ICell;
</script>

<div
  class="bg-gray-700 text-white w-10 h-10 flex flex-wrap justify-center content-center"
>
  <div>
    {cell.minesCount}
  </div>
</div>
