<script lang="ts">
  import type { IArivalBoardItem } from "../../interfaces";
  export let item: IArivalBoardItem;
</script>

<div class="item">
  <div>
    {@html item.origin}
  </div>
  <div class="col-track">
    {item.track}
  </div>
</div>

<style>
  .item {
    display: flex;
    background-color: darkblue;
    color: white;
    padding: 1rem 3rem;
    margin-bottom: 0.2rem;
  }
  .col-track {
    font-size: larger;
  }
</style>