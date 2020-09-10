import type { IStation } from "./IStation";

export interface IDBGraphQlService {
  getStationsByName(searchString: string): Promise<IStation[]>;
  getStationByPrimaryEvaId(primaryEvaId: number): Promise<IStation>;
  checkApiAvailabillity(): Promise<boolean>;
}