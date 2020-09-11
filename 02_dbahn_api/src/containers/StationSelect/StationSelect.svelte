<script lang="ts">
  import type { IDBGraphQlService, IStation } from "../../interfaces";
  import {onMount} from 'svelte';
  import currentStation from '../../stores/station-store';
  import Station from "../../components/Station/Station.svelte";
  import {activeComponent, componentsAvailable} from '../../stores/active-component-store';
  
  export let searchString: string;
  export let dbApiService: IDBGraphQlService;

  let stations: IStation[] = [];

  onMount(async() => {
    stations = await dbApiService.getStationsByName(searchString);
  });

  const onItemSelect = (el) => {
    const station = el.detail as IStation;
    console.log('station.picture.url',station.picture.url);
    document.getElementById('header').style.backgroundImage = station.picture.url ? `url(${station.picture.url})` : '';
    //document.querySelector('#header').innerHTML = `<img src="${station.picture.url}" />`;
    currentStation.setStation({...station});
    $activeComponent = componentsAvailable.Timetable;
  }

  $: {
    (async()=>{
      stations = await dbApiService.getStationsByName(searchString);
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