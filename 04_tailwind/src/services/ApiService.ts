import axios from 'axios';
import type { IApiService, IElement } from '../models';

interface IDataObj {
  text: string;
  createdAt: string;
  updatedAt: string;
  ['key']: string;
}

interface IResponse {
  data: IDataObj[];
  ['key']: string | number;
}

export class ApiService implements IApiService {
  constructor(private _apiUrl: string) {}

  public async getElements(): Promise<IElement[]> {
    const amount = 15;
    /* eslint-disable @typescript-eslint/naming-convention */
    const response: IResponse = await axios.get(`${this._apiUrl}/random/?amount=${amount}`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    /* eslint-disable @typescript-eslint/naming-convention */
    return response.data.map((el) => ({
      id: el['_id'],
      text: el.text,
    } as IElement));
  }
}
