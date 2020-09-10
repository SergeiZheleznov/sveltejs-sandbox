<script lang="ts">
  import type { IStation, ITrainOnRoute } from "../../../interfaces";
  import dateFormat from 'dateformat';

  export let station: IStation;
  export let train: ITrainOnRoute;
</script>

<div class="wrapper">
  {#if train.arrival && train.arrival.stations && train.arrival.stations.length > 0}
    {#each train.arrival.stations as stationName}
      <div>
        {@html stationName}
      </div>
    {/each}
  {/if}
  <div class="current">
    <div class="flex">
      {#if train.arrival && train.arrival.time}
        <div class="time">{dateFormat(train.arrival.time, 'HH:MM')}</div>
      {/if}
      <div>
        {@html station.name}
      </div>
      {#if train.departure && train.departure.time}
        <div class="time">{dateFormat(train.departure.time, 'HH:MM')}</div>
      {/if}
    </div>
  </div>
  {#if train.departure && train.departure.stations && train.departure.stations.length > 0}
    {#each train.departure.stations as stationName}
      <div>
        {@html stationName}
      </div>
    {/each}
  {/if}
</div>

<style>
  .wrapper {
    border: 1px solid white;
    padding: .1rem;
    font-size: .8rem;
  }
  .wrapper>div {
    display: inline-block;
    padding: .3rem;
    margin: 0 .1rem .1rem 0;
  }
  .wrapper>div.current {
    background-color: darkolivegreen;
    color:white;
    padding: 0 !important;
    display: inline-block;
    justify-items: stretch;
    gap: 0.3rem;
  }
  .wrapper>div.current>div {
    padding: .3rem;
  }
  .flex {
    display: flex;
  }
  .time {
    background-color: gray;
    padding: .3rem;
  }
</style>