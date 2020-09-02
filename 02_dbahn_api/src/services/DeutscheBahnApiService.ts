import axios from 'axios';
import type { IDeutscheBahnApiService, ILocationResponse } from "../interfaces";

export class DeutscheBahnApiService implements IDeutscheBahnApiService {

  constructor(private bearer: string) {

  }

  public async findLocation(str): Promise<ILocationResponse[]> {
    const response = await axios.get(`https://api.deutschebahn.com/freeplan/v1/location/${str}`,{
      headers:{
        "Authorization": `Bearer ${this.bearer}`,
        "Accept": 'application/json',
        'Access-Control-Allow-Origin': "*"
      }
    });
    const data: ILocationResponse[] = await response.data;
    return data;
  }

}