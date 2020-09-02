import App from './App.svelte';
declare var __app: any;

const app = new App({
	target: document.body,
	props: {
		token: __app.API_TOKEN
	}
});

export default app;