import { writable } from 'svelte/store';

export enum componentsAvailable {
  'ArivalBoard',
  'DepartureBoard',
  'SelectStation',
  'None'
}

export const activeComponent = writable<componentsAvailable>(componentsAvailable.None);