import type { ITrainOnRoute } from '.';

export interface IDBTimetablesService {
  getTrainsOnRoute(evaId: string): Promise<ITrainOnRoute[]>;
}