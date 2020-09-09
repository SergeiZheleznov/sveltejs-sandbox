import axios from 'axios';
import type { IDeutscheBahnApiService, IStation, IArivalBoardItem } from "../interfaces";
import {query} from 'svelte-apollo';
import Logger from 'js-logger';
import type {ApolloClient} from 'apollo-boost';
import { FIND_LOCATION_BY_NAME } from '../queries/findLocationByName';

const LOG_SOURCE = 'DeutscheBahnApiService';

export class DeutscheBahnApiService implements IDeutscheBahnApiService {

  constructor(private client: ApolloClient<any>) {
    Logger.info(`[${LOG_SOURCE}]`);
  }

  public async checkApiAvailabillity(): Promise<boolean> {
    let apiIsAvailable = false;
    try {
      await axios.get(`https://api.deutschebahn.com/freeplan/v1`);
      apiIsAvailable = true;
    } catch (error) {
      apiIsAvailable = error.response.status === 401 ? true : false;
    } finally {
      Logger.info(`[${LOG_SOURCE}] API available - ${apiIsAvailable}`);
      return apiIsAvailable;
    }
  }
  
  public async getArivalBoard(station: IStation, time: Date): Promise<IArivalBoardItem[]> {
    Logger.info(`[${LOG_SOURCE}] getArivalBoard()`);
    let data: IArivalBoardItem[];
    try {
      // data = await this.request(`arrivalBoard/${location.id}?date=${dateFormat(time, 'yyyy-mm-dd%3AHH:MM')}`);

    } catch (error) {
      Logger.warn(`[${LOG_SOURCE}] api endpoint is unavailable`, error);
    } finally {
      Logger.info(`[${LOG_SOURCE}]`, data);
      return data.slice(0,5);
    }
  }

  public async findStation(searchString): Promise<IStation[]> {
    let data: IStation[];
    try {
      const {client} = this;
      const locations = await query(client, { 
        query: FIND_LOCATION_BY_NAME,
        variables: {
          searchString
        }
      });
      const result = await locations.result();
      console.log('result', result);
      data = result.data.search.stations as IStation[];

    } catch (error) {
      Logger.warn(`[${LOG_SOURCE}] api endpoint is unavailbale`, error);
    } finally {
      Logger.info(`[${LOG_SOURCE}] findLocation(${name})`, data);
      return data;
    }
  }
}