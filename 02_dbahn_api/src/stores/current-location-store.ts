import { writable } from 'svelte/store';
import type { ILocation } from '../interfaces';

const location = writable(null);

const customStore = {
  subscribe: location.subscribe,
  setLocation: (item: ILocation) => {
    console.log(`location store new value`, item)
    location.set(item);
  }
}
export default customStore;