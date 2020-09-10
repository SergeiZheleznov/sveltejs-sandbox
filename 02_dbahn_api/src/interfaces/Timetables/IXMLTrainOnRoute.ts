import type { IXMLRouteInfo } from "./IXMLRouteInfo";

export interface IXMLTrainOnRoute {
  ar: IXMLRouteInfo,
  dp: IXMLRouteInfo,
  tl: {
    c: string,
    f: string,
    n: string,
    o: string
  }
}