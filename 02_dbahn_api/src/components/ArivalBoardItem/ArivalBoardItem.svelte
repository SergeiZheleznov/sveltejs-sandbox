<script lang="ts">
  import type { IArivalBoardItem } from "../../interfaces";
  import dateFormat from 'dateformat';

  export let item: IArivalBoardItem;

  const time = new Date(item.dateTime);
</script>

<svelte:head>
  <title>Arival Board</title>
</svelte:head>
<div class="wrapper">
  <div class="item">
    <div class="col-1_3">
      <div class="name">{item.name}</div>
      <div class="origin">
        {@html item.origin}
      </div>
    </div>
    <div class="col-1_3 track">
      {item.track}
    </div>
    <div class="col-1_3 time">
      {dateFormat(time, 'HH:MM')}
    </div>
  </div>
</div>


<style>
  .col-1_3 {
    width: 33.33%;
  }
  .wrapper {
    padding: 1rem;
    margin-bottom: 0.2rem;
    background-color: darkblue;
    color: white;
  }
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .name {
    font-size: 2rem;
  }
  .origin {
    font-size: 0.8rem;
  }
  .track {
    font-size: larger;
    text-align: center;
  }
  .time {
    font-size: 1.4rem;
    text-align: right;
  }
</style>