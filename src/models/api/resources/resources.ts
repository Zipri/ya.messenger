import type { TUrl } from 'models/types';
import BaseApi from '../baseApi';
import type { TApiResponse } from '@models/http/types';

class ResourcesApi extends BaseApi {
  baseUrl: TUrl = '/resources';

  download(path: string): Promise<TApiResponse<File>> {
    return this.http.post(`${this.baseUrl}/download`, {
      data: {
        path,
      },
    });
  }
}

export default ResourcesApi;
