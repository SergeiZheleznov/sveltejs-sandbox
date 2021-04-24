import { Writable, writable } from "svelte/store";
import type { IApiService, IElement } from "../models";

export interface IElementStore {
  getElements: () => Promise<void>;
  elements: Writable<IElement[]>;
  loading: Writable<boolean>;
  addElement: (element: IElement) => void;
}

export class ElementStore implements IElementStore {
  public elements: Writable<IElement[]> = writable([]);
  public loading: Writable<boolean> = writable(false);

  constructor(private apiService: IApiService){}

  public async getElements() {
    this.loading.set(true);
    const response = await this.apiService.getElements();
    this.elements.set(response);
    this.loading.set(false);
  }
  
  public addElement(el) {
    this.elements.update((value)=>([...value, el]));
  }
}