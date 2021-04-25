import {
  Subscriber, Unsubscriber, Writable, writable,
} from 'svelte/store';
import type { IApiService, IElement } from '../models';

export interface IElementStore {
  subscribe: (this: void, run: Subscriber<IElement[]>)=> Unsubscriber;
  getElements: () => Promise<void>;
  addElement: (element: IElement) => void;
}

export const ElementStore = (apiService: IApiService): IElementStore => {
  const { subscribe, set, update }: Writable<IElement[]> = writable([]);

  const getElements = async () => {
    const response = await apiService.getElements();
    set(response);
  };

  const addElement = (el) => {
    update((value) => ([...value, el]));
  };

  return { subscribe, getElements, addElement };
};
