import type { 
  IDBTimetablesService,
  IRouteInfo,
  ITrainOnRoute,
  IXMLTrainOnRoute,
  IXMLRouteInfo
} from "../interfaces";
import axios from 'axios';
import Logger from 'js-logger';
import dateFormat from 'dateformat';
import xmlParser from 'fast-xml-parser';

const LOG_SOURCE = 'TimetableService';

export class TimetableService implements IDBTimetablesService {
  
  constructor(private url: string, private bearer) {

  }

  public async getTrainsOnRoute(evaId: string): Promise<ITrainOnRoute[]> {
    Logger.info(`[${LOG_SOURCE}] getBoard()`);
    let data: any;
    try {
      const time = new Date();
      const xml: string = await this.request(`plan/${evaId}/${dateFormat(time, 'yymmdd/HH')}`);

      const obj = xmlParser.parse(xml, {
        attributeNamePrefix : "",
        parseAttributeValue: true,
        ignoreNameSpace: false,
        ignoreAttributes: false
      });
      Logger.info(`[${LOG_SOURCE}] retrieved parsed xml`, obj);
      data = obj?.timetable?.s.map( el => this.convertXmlToObj(el))
        .filter((el: ITrainOnRoute) => {
          if (el.departure && el.departure.time) {
            return el.departure.time > new Date();
          }
          return true;
        })
        .sort( (a: ITrainOnRoute, b: ITrainOnRoute) => {
          if (!a.arrival && b.arrival) {
            return false;
          } else if (a.arrival && !b.arrival) {
            return true;
          }
          return a.arrival.time > b.arrival.time;
        });
    } catch (error) {
      Logger.warn(`[${LOG_SOURCE}] api endpoint is unavailbale`, error);
    } finally {
      Logger.info(`[${LOG_SOURCE}]`, data);
      return data;
    }
  }

  private async request<TData>(endpoint: string): Promise<TData> {
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

  private convertXmlToObj(item: IXMLTrainOnRoute): ITrainOnRoute {
    try {
      const arrival = item.ar ? this.getRouteInfo(item.ar) : null;
      const departure = item.dp ? this.getRouteInfo(item.dp) : null;
      const type = item.tl.o ? item.tl.o : '-';
      return { arrival, departure, type }
    } catch (error) {
      return;
    }
  }

  private getRouteInfo(routeInfo: IXMLRouteInfo): IRouteInfo {

    const dateString = routeInfo.pt.toString();
    const year = dateString.substr(0,2);
    const month = dateString.substr(2,2);
    const day = dateString.substr(4,2);
    const hour = dateString.substr(6,2);
    const min = dateString.substr(8,2);

    return {
      platform: routeInfo.pp,
      time: new Date(`20${year}-${month}-${day}T${hour}:${min}:00`),
      stations: routeInfo.ppth.split('|')
    }
  }
}