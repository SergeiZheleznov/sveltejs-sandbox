<script lang="ts">
  import type { IStation, ITrainOnRoute } from "../../../interfaces";

  export let station: IStation;
  export let train: ITrainOnRoute;
</script>

<div class="wrapper">
  {#if train.arrival}
    {#each train.arrival.stations as stationName}
      <div>
        {stationName}
      </div>
    {/each}
  {/if}
  <div class="current">
    {station.name}
  </div>
  {#if train.departure}
  {#each train.departure.stations as stationName}
    <div>
      {stationName}
    </div>
  {/each}
{/if}
</div>

<style>
  .wrapper {
    border: 1px solid white;
    padding: .1rem;
  }
  .wrapper>div {
    display: inline-block;
    padding: .3rem;
    margin: 0 .1rem .1rem 0;
  }
  .wrapper>div.current {
    background-color: darkolivegreen;
    color:white;
  }
</style>