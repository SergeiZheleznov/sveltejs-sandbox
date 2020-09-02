export interface IConfigurationService {
  getBearer(): Promise<string>;
}