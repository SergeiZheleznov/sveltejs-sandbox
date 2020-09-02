import axios from 'axios';
import type { IDeutscheBahnApiService, ILocationResponse } from "../interfaces";
import Logger from 'js-logger';
const LOG_SOURCE = 'DeutscheBahnApiService';

export class DeutscheBahnApiService implements IDeutscheBahnApiService {
  constructor(private bearer: string) {}
  public async findLocation(str): Promise<ILocationResponse[]> {
    Logger.debug(`[${LOG_SOURCE}] findLocation(${str})`);
    const {bearer} = this;
    try {
      const response = await axios.get(`https://api.deutschebahn.com/freeplan/v1/location/${str}`,{
        headers:{
          "Authorization": `Bearer ${bearer}`,
          "Accept": 'application/json'
        }
      });
      const data: ILocationResponse[] = await response.data;
      return data;
    } catch (error) {
      Logger.error(LOG_SOURCE, error);
    }
  }

}