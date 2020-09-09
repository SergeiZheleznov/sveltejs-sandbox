import type { IStation } from "./IStation";
import type { IArivalBoardItem } from "./IArivalBoardItem";

export interface IDeutscheBahnApiService {
  findStation(searchString: string): Promise<IStation[]>;
  getArivalBoard(station: IStation, time: Date): Promise<IArivalBoardItem[]>;
  checkApiAvailabillity(): Promise<boolean>;
}