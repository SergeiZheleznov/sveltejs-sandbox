import type { ILocationResponse } from "./IlocationResponse";

export interface IDeutscheBahnApiService {
  findLocation(str: string): Promise<ILocationResponse[]>;
}