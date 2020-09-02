<script lang="ts">
	import {onMount} from 'svelte';
import LocationList from './containers/LocationList/LocationList.svelte';
import type { ILocationResponse } from './interfaces';
	import {DeutscheBahnApiService} from './services/DeutscheBahnApiService';

	export let token: string;

	const db = new DeutscheBahnApiService(token);

	let locations: ILocationResponse[] = [];

	onMount(async ()=>{
		locations = await db.findLocation('Heilbronn');
	});
</script>

<main>
	<LocationList locations={locations} />
</main>

<style>
	main {
		padding: 1em;
		max-width: 940px;
		display: block;
		margin: 0 auto;
	}

</style>