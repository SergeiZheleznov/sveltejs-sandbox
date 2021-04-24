import type { IApiService, IElement } from "../models";

export interface IElementStore {
  getElements: () => Promise<void>;
  elements: IElement[];
}

export class ElementStore implements IElementStore {
  public elements: IElement[] = [];
  constructor(private apiService: IApiService){}

  public async getElements() {
    this.elements = await this.apiService.getElements();
  }
  
}