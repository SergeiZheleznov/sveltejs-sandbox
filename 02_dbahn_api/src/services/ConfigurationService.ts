import type { IConfigurationService } from "../interfaces";
import axios from 'axios';
interface IResponse {
  key: string
}
declare var __app;

export class ConfigurationService implements IConfigurationService {
  private url = '/api/token';
  public async getBearer(): Promise<string> {

    if (__app.env.API_TOKEN) {
      console.log('API key was found in enviroment variables');
      return __app.env.API_TOKEN;
    }
    const response: IResponse = await axios.get(this.url);
    console.log('response.key',response);
    return response.key;
  }
}
