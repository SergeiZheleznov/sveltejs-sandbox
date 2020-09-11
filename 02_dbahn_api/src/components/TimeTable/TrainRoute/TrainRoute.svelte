<script lang="ts">
  import type { IStation, ITrainOnRoute } from "../../../interfaces";
  import dateFormat from 'dateformat';

  export let station: IStation;
  export let train: ITrainOnRoute;

  const origin = train?.arrival?.stations[0];
  const destination = train?.departure?.stations.slice(-1).pop();
</script>

<div class="wrapper">
  {#if origin}
    <div class="origin"><span>{@html origin}</span> &ctdot;</div>
  {/if}
  <div class="current">
    <div class="flex">
      {#if train?.arrival?.time}
        <div class="time">{dateFormat(train.arrival.time, 'HH:MM')} &rtrif;&nbsp;</div>
      {/if}
      <div>
        {@html station.name}
      </div>
      {#if train?.departure?.time}
        <div class="time">&nbsp;&rtrif; {dateFormat(train.departure.time, 'HH:MM')}</div>
      {/if}
    </div>
  </div>
  {#if destination}
    <div class="destination">&ctdot; <span>{@html destination}</span></div>
  {/if}
</div>

<style>
  .wrapper {
    display: flex;
    gap: .5rem;
  }
  .wrapper>div {
    padding: .2rem;
  }
  .wrapper .current {
    background-color: white;
    color:blue;
    display: inline-block;
    justify-items: stretch;
    gap: 0.3rem;
  }

  .flex {
    display: flex;
  }
  .time {
    color: black;
  }

</style>