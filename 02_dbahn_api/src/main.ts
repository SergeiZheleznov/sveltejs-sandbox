import App from './App.svelte';
import Logger from 'js-logger';

Logger.useDefaults({
	defaultLevel: Logger.DEBUG
})

declare var __app: any;

const app = new App({
	target: document.body,
	props: {
		token: __app.API_TOKEN
	}
});

export default app;