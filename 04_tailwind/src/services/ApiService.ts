import axios from 'axios';
import type { IApiService, IElement } from '../models';

interface IDataObj {
  text: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

interface IResponse {
  data: IDataObj[];
  ['key']: string | number;
}

export class ApiService implements IApiService {
  constructor(private apiUrl: string) {}

  public async getElements(): Promise<IElement[]> {
    const amount = 15;

    const response: IResponse = await axios.get(`${this.apiUrl}/random/?amount=${amount}`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return response.data.map((el) => ({
      id: el._id,
      text: el.text,
    } as IElement));
  }
}
