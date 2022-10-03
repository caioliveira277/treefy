import { UserPlantsRequest } from '@/@types/request';
import { UserPlantDataSource } from '@/data/data-sources';
import { HttpClient, HttpStatusCode } from '@/data/protocols';
import { UserPlantModel } from '@/domain/models';
import { GetUserPlants, GetUserPlantsAllParams } from '@/domain/usecases';

export class RemoteGetUserPlants implements GetUserPlants {
  private readonly httpClient: HttpClient;

  private readonly baseUrl = `${process.env.API_BASE_URL}/api/species`;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  private formatParams(params: Record<string, any>) {
    const formatedParams: { [key: string]: string | number } = {
      'pagination[page]': params?.pagination?.page || 1,
      'pagination[pageSize]': params?.pagination?.size || 1,
      'filters[name][$containsi]': params?.name || '',
    };

    return formatedParams;
  }

  public async all(params: GetUserPlantsAllParams): Promise<UserPlantModel[]> {
    try {
      const response = await this.httpClient.request<UserPlantsRequest>({
        method: 'GET',
        url: this.baseUrl,
        params: this.formatParams(params),
      });

      if (
        response.statusCode === HttpStatusCode.ok &&
        response?.body?.data?.length
      ) {
        return new UserPlantDataSource(response.body.data).toModel();
      }
      return [];
    } catch (error) {
      return [];
    }
  }
}