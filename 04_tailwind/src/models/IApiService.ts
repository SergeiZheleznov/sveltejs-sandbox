import type { IElement } from ".";

export interface IApiService {
  getElements: () => Promise<IElement[]>;
}
