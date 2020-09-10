import { writable } from 'svelte/store';

export enum componentsAvailable {
  'Timetable',
  'SelectStation',
  'None'
}

export const activeComponent = writable<componentsAvailable>(componentsAvailable.None);