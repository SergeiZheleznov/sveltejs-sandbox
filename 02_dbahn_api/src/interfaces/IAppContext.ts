import type { IDBGraphQlService, IDBTimetablesService } from ".";
export interface IAppContext {
  dbApiService: IDBGraphQlService;
	dbTimetableService: IDBTimetablesService;
}
export const APP_CONTEXT = 'appContext';