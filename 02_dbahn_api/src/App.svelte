<script lang="ts">
	import {onMount} from 'svelte';
	import LocationList from './containers/LocationList/LocationList.svelte';
	import type { IConfigurationService, IDeutscheBahnApiService, ILocation } from './interfaces';
	import {DeutscheBahnApiService} from './services/DeutscheBahnApiService';
	import defaultLocation from './repository/DefaultLocation';
	import ArivalBoard from './containers/ArivalBoard/ArivalBoard.svelte';

	export let configurationService: IConfigurationService;

	let dbApiService: IDeutscheBahnApiService;
	let locations: ILocation[] = [];
	let status: 'loading' | 'loaded' = "loading";
	let currentLocation: ILocation = defaultLocation;

	onMount(async ()=> {
		const token = await configurationService.getBearer();
		dbApiService = new DeutscheBahnApiService(token);
		// locations = await db.findLocation('Heilbronn');

		status = "loaded";
	});
</script>

<main>
	{#if status === "loading"}
		<div>
			Loading ...
		</div>
	{:else}
		<ArivalBoard location={currentLocation} dbApiService={dbApiService} />
		<LocationList locations={locations} />
	{/if}
</main>

<style>
	main {
		padding: 1em;
		max-width: 940px;
		display: block;
		margin: 0 auto;
	}

</style>