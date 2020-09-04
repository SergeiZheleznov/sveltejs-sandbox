<script lang="ts">
  import type { IArivalBoardItem, IDeutscheBahnApiService, ILocation } from "../../interfaces";
  import {onMount} from 'svelte';
  import ArivalBoardItem from "../../components/ArivalBoardItem/ArivalBoardItem.svelte";

  export let dbApiService: IDeutscheBahnApiService;
  export let location: ILocation;

  let arivalBoard: IArivalBoardItem[] = [];
  let time = new Date();
  let status: "loading" | "loaded" | "error" = "loading";
  let errorMessage: string = null;

  onMount(async ()=> {
    console.log(`[ArivalBoard] onMount(${location.name});`);
    try {
      arivalBoard = await dbApiService.getArivalBoard(location, time);
    } catch (e) {
      errorMessage = e.message;
    } finally {
      status = "loaded";
    }
  });

  $: {
    (async()=>{
      arivalBoard = await dbApiService.getArivalBoard(location, time);
    })();
	}
</script>

<svelte:head>
  <title>Arival Board: {location && location.name ? location.name : '..'}</title>
</svelte:head>

<section>
  {#if status == "loaded"}
    {#if arivalBoard.length}
      {#each arivalBoard as item}
        <ArivalBoardItem item={item} />
      {/each}
    {:else}
      <div class="message">No items</div>
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