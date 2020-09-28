import type { IConfigurationService } from "../interfaces";
declare var __app;

export class ConfigurationService implements IConfigurationService {

  public getBearer(): string {
    if (__app.env.API_TOKEN) {
      console.log('API key was set');
      return __app.env.API_TOKEN;
    }
    return 'api_key_was_not_found';
  }

  public getGraphQLEndpoint(): string {
    return 'https://api.deutschebahn.com/1bahnql/v1/graphql';
  }

  public getTimetableApiUrl(): string {
    return 'https://api.deutschebahn.com/timetables/v1';
  }
}
