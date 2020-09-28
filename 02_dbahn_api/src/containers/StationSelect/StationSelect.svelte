<script lang="ts">
  import type { IAppContext, IStation } from "../../interfaces";
  import {onMount, getContext} from 'svelte';
  import currentStation from '../../stores/station-store';
  import Station from "../../components/Station/Station.svelte";

  const ctx = getContext<IAppContext>('appContext');
  let searchString: string;
  
  const { dbApiService } = ctx;

  let stations: IStation[] = [];

  const updateItems = async () => {
    stations = await dbApiService.getStationsByName(searchString);
  };

  onMount(async() => {
    await updateItems();
  });

  const onItemSelect = (el) => {
    const station = el.detail as IStation;
    console.log('station.picture.url',station.picture.url);
    document.getElementById('header').style.backgroundImage = station.picture.url ? `url(${station.picture.url})` : '';
    currentStation.setStation({...station});
  }

  const onFormSubmit = async () => {
		await updateItems();
	}
</script>

<div class="location-search-form">
  <form on:submit|preventDefault={onFormSubmit}>
    <input name="q" placeholder="Find location" class="station-input" bind:value={searchString} />
  </form>
</div>

<section>
  {#each stations as station}
    <Station active={false} on:stationselect="{onItemSelect}" station={station} />{@html ' '}
  {/each}
</section>

<style>
  section {
    padding: .3rem 0;
  }
	.location-search-form {
		margin-bottom: .3rem;
	}

	.station-input {
		border: 1px solid #ccc;
		color: #444;
		padding: 10px;
		width: 100%;
		margin: 0;
		background-color: white;
		outline: transparent;
		box-sizing: border-box;
		font-size: 2rem;
	}
	.station-input::placeholder {
		color: #ccc;
	}
</style>