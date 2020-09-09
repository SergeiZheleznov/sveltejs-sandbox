<script lang="ts">
	import {onMount} from 'svelte';
	import type { IConfigurationService, IDeutscheBahnApiService } from './interfaces';
	import {DeutscheBahnApiService} from './services/DeutscheBahnApiService';
	import defaultLocation from './repository/DefaultLocation';
	import ArivalBoard from './containers/ArivalBoard/ArivalBoard.svelte';
	import location from './stores/station-store';
	import dateFormat from 'dateformat';
	import Clock from './components/Clock/Clock.svelte';
	import ApiStatus from './components/ApiStatus/ApiStatus.svelte';
	import ApolloClient from 'apollo-boost';
	import { createHttpLink } from "apollo-link-http";
	import { setClient } from 'svelte-apollo';
	import type { HttpOptions } from "apollo-link-http-common";
	import StationSelect from './containers/StationSelect/StationSelect.svelte';
	import {activeComponent, componentsAvailable} from './stores/active-component-store';
	
	export let configurationService: IConfigurationService;

	let status: 'loading' | 'loaded' = "loading";
	let searchString: string;

	const onFormSubmit = () => {
		$activeComponent = componentsAvailable.SelectStation;
	}

	let dbApiService: IDeutscheBahnApiService;

	onMount(async () => {
		const token = await configurationService.getBearer();
		const client = new ApolloClient({
			headers: {
				authorization: `Bearer ${token}`
			},
			uri: configurationService.getGraphQLEndpoint()
		});
		dbApiService = new DeutscheBahnApiService(client);
		status = "loaded";
	});
</script>

<div class="container">
	<div class="location-search-form">
		<form on:submit|preventDefault={onFormSubmit}>
			<input placeholder="Find location" class="station-input" bind:value={searchString} on:blur={()=>{
				(async()=>{
					setTimeout(()=>{
						$activeComponent = componentsAvailable.None;
						searchString = '';
					}, 100)
				})();
			}} />
		</form>
	</div>
	<div class="main">
		{#if status === "loading"}
			<div>
				Connecting to DB API ...
			</div>
		{:else}
			<div class="header">
				<div class="main-col">
					{$location ? $location.name : '...'}
				</div>
				<div class="secondary-col">
					<Clock />
					{#if dbApiService}
						<ApiStatus dbApiService={dbApiService} />
					{/if}
				</div>
			</div>
			{#if $activeComponent === componentsAvailable.SelectStation}
				<StationSelect dbApiService={dbApiService} searchString={searchString} />			
			{/if}
		{/if}
	</div>
</div>

<style>
	.container {
		width:60%;
		margin: 10% auto 0;
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
		justify-content: space-between;
		margin-bottom: 1rem;
	}
	.main-col {
		flex-grow: 1;
		font-size: 2rem;
	}
	.secondary-col {
		flex-grow: 0;
		display: inline-flex;
		flex-wrap: wrap;
		gap: 12px;
		align-items: center;
	}
</style>