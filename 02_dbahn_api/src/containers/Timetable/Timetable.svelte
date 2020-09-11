<script lang="ts">
  import type { IStation, IDBTimetablesService, ITrainOnRoute } from "../../interfaces";
  import { getContext, onMount } from 'svelte';
  import TrainOnRoute from "../../components/TrainOnRoute/TrainOnRoute.svelte";
  
  export let station: IStation;
  export let dbTimetableService: IDBTimetablesService;

  let time = new Date();
  let status: "loading" | "loaded" | "error" = "loading";
  let errorMessage: string = null;

  let trainsOnRoute: ITrainOnRoute[];

  onMount(async ()=> {
    const response = await dbTimetableService.getTrainsOnRoute(station.primaryEvaId.toString());
    trainsOnRoute = [...response.sort((a, b)=> {
      let result = 0;
      if (!a?.arrival?.time) {
        result = 1;
      } else if (!b?.arrival?.time) {
        result = -1;
      } else if (a.arrival.time && b.arrival.time) {
        result = a.arrival.time > b.arrival.time ? 1 : -1;
      }
      return result;
    })];
    console.log('trainsOnRoute', trainsOnRoute);
    status = "loaded"
  });

</script>

<svelte:head>
  <title>Board: {station && station.name ? station.name : '..'}</title>
</svelte:head>

<section>
  {#if status == "loaded"}
    {#if trainsOnRoute && trainsOnRoute.length}
      {#each trainsOnRoute as train}
        <TrainOnRoute station={station} train={train} />
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