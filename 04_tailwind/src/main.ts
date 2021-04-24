import { writable } from 'svelte/store';
import App from './App.svelte';
import { ApiMockService } from './services';
import { ElementStore } from './stores';


const apiService = new ApiMockService();
const elementStore = writable(new ElementStore(apiService))
const app = new App({
	target: document.body,
	props: {
		elementStore
	}
});

export default app;