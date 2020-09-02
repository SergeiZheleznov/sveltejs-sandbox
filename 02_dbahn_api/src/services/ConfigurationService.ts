import type { IConfigurationService } from "../interfaces";
import axios from 'axios';
interface IResponse {
  key: string
}
declare var __app;

export class ConfigurationService implements IConfigurationService {
  private url = 'https://zealous-forest-0e9dd1703.azurestaticapps.net/api/locations';
  public async getBearer(): Promise<string> {

    if (__app.env.API_TOKEN) {
      return __app.env.API_TOKEN;
    }
    const response: IResponse = await axios.get(this.url);
    return response.key;
  }
}
