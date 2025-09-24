import type { TUrl } from 'models/types';
import BaseApi from '../baseApi';

class UserApi extends BaseApi {
  baseUrl: TUrl = '/user';

  search(login?: string) {
    return this.http.post(`${this.baseUrl}/search`, {
      data: {
        login,
      },
    });
  }
}

export default UserApi;
