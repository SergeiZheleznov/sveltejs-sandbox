import axios from 'axios';
import type { IDBGraphQlService, IStation } from "../interfaces";
import {query} from 'svelte-apollo';
import Logger from 'js-logger';
import type {ApolloClient} from 'apollo-boost';
import { FIND_LOCATIONS_BY_NAME } from '../queries/findLocationsByName';
import { GET_STATION_BY_PRIMARY_EVA_ID } from '../queries/getStationByPrimaryEvaId';
import xmlParser from 'fast-xml-parser';

const LOG_SOURCE = 'DeutscheBahnApiService';

export class DeutscheBahnApiService implements IDBGraphQlService {

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
  
  public async getStationByPrimaryEvaId(primaryEvaId: number): Promise<IStation> {
    Logger.info(`[${LOG_SOURCE}] getStationByPrimaryEvaId(primaryEvaId = ${primaryEvaId})`);
    let station: IStation;
    try {
      const {client} = this;
      const locations = await query(client, { 
        query: GET_STATION_BY_PRIMARY_EVA_ID,
        variables: {
          primaryEvaId
        }
      });
      const result = await locations.result();
      console.log(result);
      station = result.data.stationWithEvaId as IStation;
    } catch (error) {
      Logger.warn(`[${LOG_SOURCE}] api endpoint is unavailable`, error);
    } finally {
      Logger.info(`[${LOG_SOURCE}]`, station);
      return station;
    }
  }

  public async getStationsByName(searchString): Promise<IStation[]> {
    let data: IStation[];
    try {
      const {client} = this;
      const locations = await query(client, { 
        query: FIND_LOCATIONS_BY_NAME,
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
      Logger.info(`[${LOG_SOURCE}] getStationsByName(${name})`, data);
      return data;
    }
  }
}