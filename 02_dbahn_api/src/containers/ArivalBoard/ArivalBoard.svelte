<script lang="ts">
  import type { IArivalBoardItem, IDeutscheBahnApiService, ILocation } from "../../interfaces";
  import {onMount} from 'svelte';
import type { ComponentStatus } from "../../utils/ComponentStatus";
import ArivalBoardItem from "../../components/ArivalBoardItem/ArivalBoardItem.svelte";

  export let dbApiService: IDeutscheBahnApiService;
  export let location: ILocation;

  let arivalBoard: IArivalBoardItem[] = [];

  let time = new Date();
  let status: "loading" | "loaded" | "error";
  let error: any = null;

  onMount(async ()=> {
    try {
      arivalBoard = await dbApiService.getArivalBoard(location, time);
      error = null;
    } catch (e) {
      error = e;
    } finally {
      status = "loaded";
    }
	});
</script>

<section>
  {#if error}
    <div>
      {JSON.stringify(error)}
    </div>
  {:else if status === "loaded"}
    <h1>{location.name}</h1>
    {#each arivalBoard as item}
      <ArivalBoardItem item={item} />
    {/each}

  {:else if status === "loading"}
    <div>
      loading...
    </div>
  {/if}

</section>

<style>
  section {
    border: 1px solid #ccc;
    background-color: #333;
    color: white;
    padding: 3rem;
  }
</style>