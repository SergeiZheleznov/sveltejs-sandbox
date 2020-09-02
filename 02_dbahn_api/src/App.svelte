<script lang="ts">
	import {onMount} from 'svelte';
	import LocationList from './containers/LocationList/LocationList.svelte';
	import type { IConfigurationService, IDeutscheBahnApiService, ILocation } from './interfaces';
	import {DeutscheBahnApiService} from './services/DeutscheBahnApiService';
	import defaultLocation from './repository/DefaultLocation';
	import ArivalBoard from './containers/ArivalBoard/ArivalBoard.svelte';
	import locationStore from './stores/current-location-store';

	export let configurationService: IConfigurationService;

	let location;
	locationStore.subscribe(value => {
		location = value;
	});

	let dbApiService: IDeutscheBahnApiService;
	let locations: ILocation[] = [];
	let status: 'loading' | 'loaded' = "loading";

	let searchString: string;

	onMount(async ()=> {
		const token = await configurationService.getBearer();
		dbApiService = new DeutscheBahnApiService(token);
		// locations = await db.findLocation('Heilbronn');
		locationStore.setLocation(defaultLocation);
		searchString = defaultLocation.name;
		status = "loaded";
	});
</script>

<div class="container">
	<div class="main">
		{#if status === "loading"}
			<div>
				Loading ...
			</div>
		{:else}
			<input class="station-input" bind:value={searchString} on:focus={()=>{

			}} />
			<ArivalBoard dbApiService={dbApiService} />
		{/if}
	</div>
</div>

<style>
	.container {
		width:100%;
		height:100%;
		display:flex;
		justify-content:center;
		align-items:center;
	}

	.main {
		padding: 1rem;
		max-width: 940px;
		min-width: 640px;
		border: 1px solid #ccc;
    background-color: #222;
    color: white;
    -webkit-box-shadow: 0px -1px 70px -1px rgba(0,0,0,0.27);
    -moz-box-shadow: 0px -1px 70px -1px rgba(0,0,0,0.27);
    box-shadow: 0px -1px 70px -1px rgba(0,0,0,0.27);
	}

	.station-input {
		border: none;
		color: white;
		padding: 10px;
		margin: 0;
		background-color: transparent;
		outline: transparent;
		box-sizing: border-box;
		font-size: 2rem;
	}
</style>