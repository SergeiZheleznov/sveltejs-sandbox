import { writable } from 'svelte/store';
import type { IDeutscheBahnApiService } from '../interfaces';

const service = writable(null);

const customStore = {
  subscribe: service.subscribe,
  setDBApiService: (item: IDeutscheBahnApiService) => {
    service.set(item);
  }
}
export default customStore;