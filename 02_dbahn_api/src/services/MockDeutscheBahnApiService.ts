import axios from 'axios';
import type { IDeutscheBahnApiService, ILocation, IArivalBoardItem } from "../interfaces";
import dateFormat from 'dateformat';
const LOG_SOURCE = 'MockDeutscheBahnApiService';

export class MockDeutscheBahnApiService implements IDeutscheBahnApiService {
  
  public async checkApiAvailabillity(): Promise<boolean> {
    return true;
  }
  
  public async getArivalBoard(location: ILocation, time: Date): Promise<IArivalBoardItem[]> {
    return [
      {
        "name": "ICE 1099",
        "type": "ICE",
        "boardId": 8000157,
        "stopId": 8000157,
        "stopName": "Heilbronn Hbf",
        "dateTime": "2020-09-03T21:04",
        "origin": "Berlin Hbf &#x0028;tief&#x0029;",
        "track": "2",
        "detailsId": "902577%2F302167%2F669338%2F33810%2F80%3fstation_evaId%3D8000157"
      },
      {
        "name": "ICE 1098",
        "type": "ICE",
        "boardId": 8000157,
        "stopId": 8000157,
        "stopName": "Heilbronn Hbf",
        "dateTime": "2020-09-04T06:32",
        "origin": "Stuttgart Hbf",
        "track": "2",
        "detailsId": "154992%2F52962%2F63670%2F19829%2F80%3fstation_evaId%3D8000157"
      }
    ];
  }

  public async findLocation(name): Promise<ILocation[]> {
    return [
      {
        "name": "Heilbronn Hbf",
        "lon": 9.207714,
        "lat": 49.143308,
        "id": 8000157
      },
      {
        "name": "Heidelberg Hbf",
        "lon": 8.675444,
        "lat": 49.403564,
        "id": 8000156
      },
      {
        "name": "Heide(Holst)",
        "lon": 9.10103,
        "lat": 54.193565,
        "id": 8000155
      },
      {
        "name": "Heidelberg Alte Eppelheimer Str./Emil-Maier-Str.",
        "lon": 8.673116,
        "lat": 49.406045,
        "id": 8089495
      },
      {
        "name": "Weilheim(Oberbay)",
        "lon": 11.142858,
        "lat": 47.845365,
        "id": 8000220
      },
      {
        "name": "Weil am Rhein",
        "lon": 7.608416,
        "lat": 47.593972,
        "id": 8006272
      }
    ];
  }

}