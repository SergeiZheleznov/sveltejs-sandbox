<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import ApolloClient from 'apollo-boost';
	import type { IConfigurationService, IDBGraphQlService, IDBTimetablesService } from './interfaces';
	import {DeutscheBahnApiService} from './services/DeutscheBahnApiService';
	import StationSelect from './containers/StationSelect/StationSelect.svelte';
	import TableHeader from './components/TableHeader/TableHeader.svelte';
	import Timetable from './containers/Timetable/Timetable.svelte';
	import {activeComponent, componentsAvailable} from './stores/active-component-store';
	import currentStation from './stores/station-store';
	import { TimetableService } from './services';
	import DbLogo from './components/DBLogo/DBLogo.svelte';

	export let configurationService: IConfigurationService;

	let status: 'loading' | 'loaded' = "loading";
	let searchString: string;

	const onFormSubmit = () => {
		$activeComponent = componentsAvailable.SelectStation;
	}

	let dbApiService: IDBGraphQlService;
	let dbTimetableService: IDBTimetablesService;

	onMount(async () => {
		const token = await configurationService.getBearer();
		const client = new ApolloClient({
			headers: {
				authorization: `Bearer ${token}`
			},
			uri: configurationService.getGraphQLEndpoint()
		});
		dbApiService = new DeutscheBahnApiService(client);
		dbTimetableService = new TimetableService(configurationService.getTimetableApiUrl(), token);
		status = "loaded";
	});
</script>

<div id="header"><div></div></div>
<div class="container">
	<DbLogo />
	<div class="location-search-form">
		<form on:submit|preventDefault={onFormSubmit}>
			<input placeholder="Find location" class="station-input" bind:value={searchString} />
		</form>
	</div>
	<div class="main">
		{#if status === "loading"}
			<div>
				Connecting to DB API ...
			</div>
		{:else}
			<TableHeader dbApiService={dbApiService} />
			{#if $activeComponent === componentsAvailable.SelectStation}
				<StationSelect dbApiService={dbApiService} searchString={searchString} />
			{:else if $activeComponent === componentsAvailable.Timetable}
				<Timetable dbTimetableService={dbTimetableService} station={$currentStation} />
			{/if}
		{/if}
	</div>
</div>

<style>
	.container {
		width:80%;
		margin: 0 auto;
		padding: 2rem 0;
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

	#header {
		width: 100%;
		height: 80%;
		position: absolute;
		top: 0;
		z-index: -1;
		opacity: .9;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
	}

	#header>div {
		background: rgb(255,255,255);
		background: linear-gradient(0deg, rgba(255,255,255,1) 20%, rgba(0,0,0,0) 100%);
		height: 100%;
	}

</style>