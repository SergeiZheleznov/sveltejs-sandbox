<script lang="ts">
  import type { ITrainOnRoute, IAppContext } from "../../interfaces";
  import { getContext, onMount } from 'svelte';
  import TrainOnRoute from "../../components/TrainOnRoute/TrainOnRoute.svelte";
  import { params } from 'svelte-hash-router';
  import currentStation from '../../stores/station-store';

  const ctx = getContext<IAppContext>('appContext');
  const { dbTimetableService, dbApiService } = ctx;
 

  let time = new Date();
  let status: "loading" | "loaded" | "error" = "loading";
  let errorMessage: string = null;

  let trainsOnRoute: ITrainOnRoute[];

  onMount(async ()=> {

    if (!$currentStation) {
      const station = await dbApiService.getStationByPrimaryEvaId(+$params.stationId);
      currentStation.setStation(station);
    }

    const response = await dbTimetableService.getTrainsOnRoute($currentStation.primaryEvaId.toString());
    trainsOnRoute = [...response
      .filter(el => el.arrival && el.arrival.time)
      .sort((a, b) => a.arrival.time > b.arrival.time ? 1 : -1)];

    console.log('trainsOnRoute', trainsOnRoute);
    status = "loaded"
  });

</script>

<section>
  {#if status == "loaded"}
    {#if trainsOnRoute && trainsOnRoute.length}
      {#each trainsOnRoute as train}
        <TrainOnRoute station={$currentStation} train={train} />
      {/each}
    {:else}
      <div>No trains found</div>
    {/if}
  {:else if status == "loading"}
    <div class="message">
      loading...
    </div>
  {/if}
</section>

<style>
  section {
    border: 2px solid #333;
  }
  .message {
    padding: 1rem;
  }
</style>