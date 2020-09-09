<script lang="ts">
  import LocationItem from "../../components/LocationItem/LocationItem.svelte";
  import type { IDeutscheBahnApiService, ILocation, IStation } from "../../interfaces";
  import {onMount} from 'svelte';
  import currentStation from '../../stores/station-store';
  import { getClient, query } from 'svelte-apollo';
  import { FIND_LOCATION_BY_NAME } from '../../queries/findLocationByName';
  import Station from "../../components/Station/Station.svelte";

  export let searchString: string;
  export let dbApiService: IDeutscheBahnApiService;
  // const client = getClient();

  let stations: IStation[] = [];

  onMount(async() => {
    // stations = await findStations(searchString);
    stations = await dbApiService.findStation(searchString);
  });

  const onItemSelect = (el) => {
    const station = el.detail as IStation;
    currentStation.setStation({...station});
  }

  $: {
    (async()=>{
      stations = await dbApiService.findStation(searchString);
    })
  }
</script>

<section>
  {#each stations as station}
    <Station active={false} on:stationselect="{onItemSelect}" station={station} />{@html ' '}
  {/each}
</section>

<style>
  section {
    padding: .3rem 0;
  }
</style>