<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import ApolloClient from 'apollo-boost';
	import type { IAppContext, IConfigurationService, IDBGraphQlService, IDBTimetablesService } from './interfaces';
	import {DeutscheBahnApiService} from './services/DeutscheBahnApiService';
	import TableHeader from './components/TableHeader/TableHeader.svelte';
	import currentStation from './stores/station-store';
	import { TimetableService } from './services';
	import DbLogo from './components/DBLogo/DBLogo.svelte';
	import { Router } from 'svelte-hash-router';


	export let configurationService: IConfigurationService;

	let status: 'loading' | 'loaded' = "loading";

	const token = configurationService.getBearer();
	const client = new ApolloClient({
		headers: {
			authorization: `Bearer ${token}`
		},
		uri: configurationService.getGraphQLEndpoint()
	});

	let dbApiService = new DeutscheBahnApiService(client);
	let dbTimetableService = new TimetableService(configurationService.getTimetableApiUrl(), token);
	
	setContext<IAppContext>('appContext', { dbApiService, dbTimetableService});

	onMount(async () => {
		status = "loaded";
	});

</script>

<div id="header"><div></div></div>
<div class="container">
	<DbLogo />
	<div class="main">
		{#if status === "loading"}
			<div>
				Connecting to DB API ...
			</div>
		{:else}
			<TableHeader />
			<Router/>
		{/if}
	</div>
</div>

<style>
	.container {
		max-width: 960px;
		margin: 0 auto;
		padding: 2rem 0;
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

	#header {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		z-index: -1;
		opacity: .9;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
	}

</style>