<script lang="ts">
  import type { IStation, ITrainOnRoute } from "../../interfaces";
  import dateFormat from 'dateformat';
  import {fade} from 'svelte/transition';
  import TrainRoute from "../TimeTable/TrainRoute/TrainRoute.svelte";

  export let train: ITrainOnRoute;
  export let station: IStation;
</script>

<div transition:fade class="wrapper">
  <div class="item">
    <div class="col-1_3">
      <div class="name">{train.type}</div>
      <div class="origin">
        <!-- {@html train.departure.stations[0]} -->
      </div>
    </div>
    <div class="col-1_3 track">
      <!-- {train.arrival.platform} -->
    </div>
    <div class="col-1_3 time">
      <!-- {dateFormat(train.arrival.time, 'HH:MM')} -->
    </div>
  </div>
  <TrainRoute station={station} train={train} />
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