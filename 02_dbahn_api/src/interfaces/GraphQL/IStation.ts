import type { ITrainInStation } from "./ITrainInStation";

export interface IStation {
  name: string;
  primaryEvaId: number;
  picture?: {
    url: string;
  }
  timetable?: {
    nextArrivals: ITrainInStation[],
    nextDepatures: ITrainInStation[]
  }
}