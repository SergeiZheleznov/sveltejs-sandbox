<script lang="ts">
  import type { IStation, IDBTimetablesService, ITrainOnRoute } from "../../interfaces";
  import { getContext, onMount } from 'svelte';
  import TrainOnRoute from "../../components/TrainOnRoute/TrainOnRoute.svelte";
  
  export let station: IStation;
  export let dbTimetableService: IDBTimetablesService;
  let stationFull: IStation;

  let time = new Date();
  let status: "loading" | "loaded" | "error" = "loading";
  let errorMessage: string = null;

  let trainsOnRoute: ITrainOnRoute[];

  onMount(async ()=> {
    trainsOnRoute = await dbTimetableService.getTrainsOnRoute(station.primaryEvaId.toString());
    status = "loaded"
  });

</script>

<svelte:head>
  <title>Arival Board: {station && station.name ? station.name : '..'}</title>
</svelte:head>

<section>
  {#if status == "loaded"}
    {#each trainsOnRoute as train}
      <TrainOnRoute train={train} />
    {/each}
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