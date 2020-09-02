<script lang="ts">
	import {onMount} from 'svelte';
	import LocationList from './containers/LocationList/LocationList.svelte';
	import type { IConfigurationService, IDeutscheBahnApiService, ILocationResponse } from './interfaces';
	import {DeutscheBahnApiService} from './services/DeutscheBahnApiService';


	export let configurationService: IConfigurationService;

	let db: IDeutscheBahnApiService;
	let locations: ILocationResponse[] = [];
	let status: 'loading' | 'loaded' = "loading";

	onMount(async ()=> {
		const token = await configurationService.getBearer();
		db = new DeutscheBahnApiService(token);
		locations = await db.findLocation('Heilbronn');
		status = "loaded";
	});
</script>

<main>
	{#if status === "loading"}
		<div>
			Loading ...
		</div>
	{:else}
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