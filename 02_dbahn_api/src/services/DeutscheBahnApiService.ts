import axios from 'axios';
import type { IDeutscheBahnApiService, ILocation, IArivalBoardItem } from "../interfaces";
import Logger from 'js-logger';
const LOG_SOURCE = 'DeutscheBahnApiService';

export class DeutscheBahnApiService implements IDeutscheBahnApiService {
  private url: string = 'https://api.deutschebahn.com/freeplan/v1';
  
  constructor(private bearer: string) {
    Logger.info(`[${LOG_SOURCE}][${bearer}]`);
  }
  
  public async getArivalBoard(location: ILocation, time: Date): Promise<IArivalBoardItem[]> {
    try {
      const data: IArivalBoardItem[] = await this.request(`arrivalBoard/${location.id}?date=${time.toISOString()}`);
      Logger.info(`[${LOG_SOURCE}] getArivalBoard()`, data);
      return data;
    } catch (error) {
      Logger.error(LOG_SOURCE, error);
      throw new Error(`Service is unavailable`);
    }
  }

  public async findLocation(name): Promise<ILocation[]> {
    try {
      const data: ILocation[] = await this.request(`location/${name}`);
      Logger.info(`[${LOG_SOURCE}] findLocation(${name})`, data);
      return data;
    } catch (error) {
      Logger.error(LOG_SOURCE, error);
      throw new Error(`Service is unavailable`);
    }
  }

  private async request<TData>(endpoint: string): Promise<TData> {
    const {bearer, url} = this;
    const response = await axios.get(`${url}/${endpoint}`,{
      headers:{
        "Authorization": `Bearer ${bearer}`,
        "Accept": 'application/json'
      }
    });
    return response.data;
  }
}