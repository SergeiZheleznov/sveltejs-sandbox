<script lang="ts">
  import LocationItem from "../../components/LocationItem/LocationItem.svelte";
  import type { IDeutscheBahnApiService, ILocation } from "../../interfaces";
  import {onMount} from 'svelte';
  import locationStore from '../../stores/current-location-store';
  
  export let name: string;

  let location;
	locationStore.subscribe(value => {
		location = value;
	});

  export let dbApiService: IDeutscheBahnApiService;
  let locations: ILocation[] = [];

  onMount(async()=>{
    locations = await dbApiService.findLocation(name);
  });

  const onItemSelect = (el) => {
    const newLocation = el.detail as ILocation;
    locationStore.setLocation({...newLocation});
  }

</script>

<section>
  {#each locations as item}
    <LocationItem isSelected={location && location.id === item.id} on:itemselect="{onItemSelect}" location={item} />{@html ' '}
  {/each}
</section>

<style>
  section {
    padding: .3rem 0;
  }
</style>