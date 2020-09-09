import { writable } from 'svelte/store';
import type { IStation } from '../interfaces';

const station = writable<IStation>(null);

const customStore = {
  subscribe: station.subscribe,
  setStation: (item: IStation) => {
    station.set(item);
  }
}
export default customStore;