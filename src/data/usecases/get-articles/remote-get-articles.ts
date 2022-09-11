import { GetByCategoryIdParams, GetArticles } from '@/domain/usecases';
import { HttpClient, HttpStatusCode } from '@/data/protocols';
import { ArticleModel } from '@/domain/models';
import { ArticlesRequest } from '@/@types/request';

export class RemoteGetArticles implements GetArticles {
  private readonly httpClient: HttpClient;

  private readonly url = `${process.env.API_BASE_URL}/api/categories`;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  private formatUrlImage(imageUrl: string) {
    return `${process.env.API_BASE_URL}${imageUrl}`;
  }

  private formatParams(params: GetByCategoryIdParams, withContent: boolean) {
    const formatedParams: { [key: string]: string | number } = {
      'pagination[page]': params?.pagination?.page || 1,
      'pagination[pageSize]': params?.pagination?.size || 10,
      'populate[banner][fields]': 'url',
      'populate[thumbnail][fields]': 'url',
      'fields[0]': 'title',
      'fields[1]': 'description',
      'fields[3]': 'createdAt',
      'fields[4]': 'updatedAt',
    };
    if (withContent) formatedParams['fields[2]'] = 'content';
    return formatedParams;
  }

  public async allByCategoryId(
    params: GetByCategoryIdParams
  ): Promise<ArticleModel[]> {
    const response = await this.httpClient.request<ArticlesRequest>({
      method: 'GET',
      url: this.url,
      params: {
        ...this.formatParams(params, false),
        'filters[categories][id][$contains]': params.categoryId,
      },
    });
    if (
      response.statusCode === HttpStatusCode.ok &&
      response?.body?.data?.length
    ) {
      return response.body.data.map((article) => ({
        id: article.id,
        title: article.attributes.title,
        description: article.attributes.description,
        content: '',
        categories: article.attributes.categories.data.map((category) => ({
          id: category.id,
          title: category.attributes.title,
        })),
        banner: article.attributes.banner.data.attributes.url,
        thumbnail: article.attributes.thumbnail.data.attributes.url,
        createdAt: new Date(article.attributes.createdAt),
        updatedAt: new Date(article.attributes.updatedAt),
      }));
    }
    return [];
  }
}
