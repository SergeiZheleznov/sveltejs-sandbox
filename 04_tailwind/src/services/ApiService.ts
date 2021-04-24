import type { IApiService, IElement } from "../models";
import axios from 'axios';

interface IDataObj {
  text: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

interface IResponse {
  data: IDataObj[];
  ["key"]: any;
}

export class ApiService implements IApiService {

  constructor (private api_url: string) {}
  public async getElements(){
    const response: IResponse = await axios.get(this.api_url, {
      headers:{
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return response.data.map(el => ({
      id: el._id,
      text: el.text
    } as IElement));
  }
}