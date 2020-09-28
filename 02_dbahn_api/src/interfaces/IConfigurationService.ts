export interface IConfigurationService {
  getBearer(): string;
  getGraphQLEndpoint(): string;
  getTimetableApiUrl(): string;
}