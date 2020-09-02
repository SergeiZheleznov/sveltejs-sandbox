<script lang="ts">
	import {onMount} from 'svelte';
	import LocationList from './containers/LocationList/LocationList.svelte';
	import type { ILocationResponse } from './interfaces';
	import {DeutscheBahnApiService} from './services/DeutscheBahnApiService';


	export let token: string;

	const db = new DeutscheBahnApiService(token);

	let status: 'loading' | 'loaded' = "loading";
	
	let locations: ILocationResponse[] = [];

	onMount(async ()=>{
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