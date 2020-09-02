import type { ILocation } from "./Ilocation";
import type { IArivalBoardItem } from "./IArivalBoardItem";

export interface IDeutscheBahnApiService {
  findLocation(str: string): Promise<ILocation[]>;
  getArivalBoard(location: ILocation, time: Date): Promise<IArivalBoardItem[]>;
}