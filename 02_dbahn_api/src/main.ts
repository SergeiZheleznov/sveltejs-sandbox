import App from './App.svelte';
import Logger from 'js-logger';
import { ConfigurationService } from './services/ConfigurationService';
import { routes } from 'svelte-hash-router';
import Timetable from './containers/Timetable/Timetable.svelte';
import StationSelect from './containers/StationSelect/StationSelect.svelte';

Logger.useDefaults({
	defaultLevel: Logger.DEBUG
})
// console.log(process.env)
const configurationService = new ConfigurationService();

routes.set({
	'/:stationId/:board': Timetable,
	'/': StationSelect
})

const app = new App({
	target: document.body,
	props: {
		configurationService
	}
});

export default app;