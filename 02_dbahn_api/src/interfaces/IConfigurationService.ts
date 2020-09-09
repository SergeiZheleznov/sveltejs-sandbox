export interface IConfigurationService {
  getBearer(): Promise<string>;
  getGraphQLEndpoint(): string;
}