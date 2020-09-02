import axios from 'axios';
import type { IDeutscheBahnApiService, ILocation, IArivalBoardItem } from "../interfaces";
import Logger from 'js-logger';
const LOG_SOURCE = 'DeutscheBahnApiService';

export class DeutscheBahnApiService implements IDeutscheBahnApiService {
  private url: string = 'https://api.deutschebahn.com/freeplan/v1';
  
  constructor(private bearer: string) {
    Logger.info(`[${LOG_SOURCE}][${bearer}]`);
  }
  
  public async getArivalBoard(location: ILocation): Promise<IArivalBoardItem[]> {
    Logger.info(`[${LOG_SOURCE}] getArivalBoard()`);
    
    try {
      const data: IArivalBoardItem[] = await this.request('/arrivalBoard/${location.id}?date=2020-09-02T20%3A00');
      //const data: IArivalBoardItem[] = await response.data;
      return data;
    } catch (error) {
      Logger.error(LOG_SOURCE, error);
    }
  }

  public async findLocation(str): Promise<ILocation[]> {
    Logger.info(`[${LOG_SOURCE}] findLocation(${str})`);
    const {bearer, url} = this;
    try {
      const response = await axios.get(`${url}/location/${str}`,{
        headers:{
          "Authorization": `Bearer ${bearer}`,
          "Accept": 'application/json'
        }
      });
      const data: ILocation[] = await response.data;
      return data;
    } catch (error) {
      Logger.error(LOG_SOURCE, error);
    }
  }

  private async request<TData>(str: string): Promise<TData> {
    // arrivalBoard/8000157?date=2020-09-02T18%3A00
    const {bearer, url} = this;
    const response = await axios.get(`${url}`,{
      headers:{
        "Authorization": `Bearer ${bearer}`,
        "Accept": 'application/json'
      }
    });
    return response.data;
  }

}