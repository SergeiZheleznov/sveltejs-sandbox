import App from './App.svelte';
import Logger from 'js-logger';
import { ConfigurationService } from './services/ConfigurationService';

Logger.useDefaults({
	defaultLevel: Logger.DEBUG
})
// console.log(process.env)
const configurationService = new ConfigurationService();

const app = new App({
	target: document.body,
	props: {
		configurationService
	}
});

export default app;