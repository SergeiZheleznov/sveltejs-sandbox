import type { IApiService, IElement } from "../models";

export class ApiMockService implements IApiService {
  public async getElements() {
    const res: IElement[] = [];

    for (let id = 0; id < 10; id++) {
      res.push(
      {
        id,
        name: `Element ${id}`
      });
    }

    return res;
  }
}