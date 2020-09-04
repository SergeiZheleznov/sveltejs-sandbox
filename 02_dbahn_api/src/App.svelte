<script lang="ts">
	import {onMount} from 'svelte';
	import LocationList from './containers/LocationList/LocationList.svelte';
	import type { IConfigurationService, IDeutscheBahnApiService, ILocation } from './interfaces';
	import {DeutscheBahnApiService} from './services/DeutscheBahnApiService';
	import defaultLocation from './repository/DefaultLocation';
	import ArivalBoard from './containers/ArivalBoard/ArivalBoard.svelte';
	import location from './stores/current-location-store';
	import dateFormat from 'dateformat';
	import Clock from './components/Clock/Clock.svelte';

	export let configurationService: IConfigurationService;

	let dbApiService: IDeutscheBahnApiService;
	let status: 'loading' | 'loaded' = "loading";
	let showLocationsList: boolean = false;
	let searchString: string;
	const onFormSubmit = () => {
		showLocationsList = true;
	}

	onMount(async ()=> {
		const token = await configurationService.getBearer();
		console.log('[App] onMount()', token);
		dbApiService = new DeutscheBahnApiService(token);
		status = "loaded";
	});
</script>

<div class="container">
	<div class="wrapper">
		<div class="location-search-form">
			<form on:submit|preventDefault={onFormSubmit}>
				<input placeholder="Find location" class="station-input" bind:value={searchString} on:blur={()=>{
					(async()=>{
						setTimeout(()=>{
							showLocationsList = false;
							searchString = '';
						}, 100)
					})();
				}} />
			</form>
		</div>
		<div class="main">
			{#if status === "loading"}
				<div>
					Loading ...
				</div>
			{:else}
				<div class="header">
					<div class="main-col">
						{$location ? $location.name : '...'}
					</div>
					<div class="secondary-col">
						<Clock />
					</div>
				</div>
				{#if showLocationsList}
					<LocationList dbApiService={dbApiService} name={searchString} />			
				{/if}
				{#if $location}
					<ArivalBoard dbApiService={dbApiService} location={$location} />
				{/if}
			{/if}
		</div>
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

	.wrapper {
		width: 60%;
	}

	.location-search-form {
		margin-bottom: 3rem;
	}

	.main {
		padding: 2rem;
		border: 4px solid #ccc;
    background-color: #222;
    color: white;
    -webkit-box-shadow: 0px -1px 70px -1px rgba(0,0,0,0.27);
    -moz-box-shadow: 0px -1px 70px -1px rgba(0,0,0,0.27);
    box-shadow: 0px -1px 70px -1px rgba(0,0,0,0.27);
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

	.header {
		display: flex;
		align-items: center;
		justify-items: stretch;
		margin-bottom: 1rem;
	}
	.main-col {
		width: 80%;
		font-size: 2rem;
	}
	.secondary-col {
		width: 20%;
		text-align: right;
	}
</style>