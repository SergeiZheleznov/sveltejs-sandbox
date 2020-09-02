import { writable } from 'svelte/store';
import type { ILocation } from '../interfaces';

const locations = writable(null);

const customStore = {
  subscribe: locations.subscribe,
  setLocation: (item: ILocation) => {
    locations.set(item);
  }
}
export default customStore;