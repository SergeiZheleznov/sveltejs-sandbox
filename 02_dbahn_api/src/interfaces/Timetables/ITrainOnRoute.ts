import type { IRouteInfo } from ".";

export interface ITrainOnRoute {
  arrival?: IRouteInfo,
  departure?: IRouteInfo,
  type: string;
}