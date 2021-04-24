import type { IApiService, IElement } from "../models";

export interface IElementStore {
  getElements: () => Promise<void>;
  elements: IElement[];
}

export class ElementStore implements IElementStore {

  constructor(private apiService: IApiService){}

  public async getElements() {
    this.elements = await this.apiService.getElements();
  }
  public elements: IElement[];
}