/*
  {
    "name": "ICE 1099",
    "type": "ICE",
    "boardId": 8000157,
    "stopId": 8000157,
    "stopName": "Heilbronn Hbf",
    "dateTime": "2020-09-02T21:04",
    "origin": "Berlin Hbf &#x0028;tief&#x0029;",
    "track": "2",
    "detailsId": "621840%2F208585%2F91168%2F161696%2F80%3fstation_evaId%3D8000157"
  }
*/
export interface IArivalBoardItem {
  name: string;
  type: string;
  boardId: number;
  stopId: number;
  stopName: string;
  dateTime: string;
  origin: string;
  track: number;
  detailsId: string;
}
