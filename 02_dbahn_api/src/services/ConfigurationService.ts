import type { IConfigurationService } from "../interfaces";
import axios from 'axios';
declare var __app;

export class ConfigurationService implements IConfigurationService {

  private url = '/api/token';
  public async getBearer(): Promise<string> {

    if (__app.env.API_TOKEN) {
      console.log('API key was found in enviroment variables');
      return __app.env.API_TOKEN;
    }
    const response = await axios.get(this.url);
    console.log('response.key',response);
    if (response.data && response.data.key) {
      return response.data.key;
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
