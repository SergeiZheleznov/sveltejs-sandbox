import axios from 'axios';
import type { IDeutscheBahnApiService, ILocation, IArivalBoardItem } from "../interfaces";
import Logger from 'js-logger';
import dateFormat from 'dateformat';
import { MockDeutscheBahnApiService } from './MockDeutscheBahnApiService';
const LOG_SOURCE = 'DeutscheBahnApiService';

export class DeutscheBahnApiService implements IDeutscheBahnApiService {
  private url: string = 'https://api.deutschebahn.com/freeplan/v1';
  private mockService: IDeutscheBahnApiService = new MockDeutscheBahnApiService();

  constructor(private bearer: string) {
    Logger.info(`[${LOG_SOURCE}][${bearer}]`);
  }

  public async checkApiAvailabillity(): Promise<boolean> {
    return axios.get(`${this.url}`).then(resolve => true).catch(reject => {
      if (reject.response.status === 401) {
        return true;
      }
      return false;
    });
  }
  
  public async getArivalBoard(location: ILocation, time: Date): Promise<IArivalBoardItem[]> {
    Logger.info(`[${LOG_SOURCE}] getArivalBoard()`);
    let data: IArivalBoardItem[];
    try {
      data = await this.request(`arrivalBoard/${location.id}?date=${dateFormat(time, 'yyyy-mm-dd%3AHH:MM')}`);
    } catch (error) {
      Logger.warn(`[${LOG_SOURCE}] api endpoint is unavailable, using mock service instead!`, error);
      const {mockService} = this;
      data = await mockService.getArivalBoard(location, time);
    } finally {
      Logger.info(`[${LOG_SOURCE}]`, data);
      return data.slice(0,5);
    }
  }

  public async findLocation(name): Promise<ILocation[]> {
    let data: ILocation[];
    try {
      data = await this.request(`location/${name}`);
    } catch (error) {
      Logger.warn(`[${LOG_SOURCE}] api endpoint is unavailbale, using mock service instead!`, error);
      const {mockService} = this;
      data = await mockService.findLocation(name);
    } finally {
      Logger.info(`[${LOG_SOURCE}] findLocation(${name})`, data);
      return data.slice(0,5);
    }
  }

  private async request<TData>(endpoint: string = ''): Promise<TData> {
    Logger.info(`[${LOG_SOURCE}] /${endpoint}`);
    try {
      const {bearer, url} = this;
      const response = await axios.get(`${url}/${endpoint}`,{
        headers:{
          "Authorization": `Bearer ${bearer}`,
          "Accept": 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Service is unavailable`);
    }
  }
}