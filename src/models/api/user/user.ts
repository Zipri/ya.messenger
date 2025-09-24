import type { TUrl } from 'models/types';
import BaseApi from '../baseApi';

class UserApi extends BaseApi {
  baseUrl: TUrl = '/user';

  search() {
    return this.http.post(`${this.baseUrl}/search`, undefined);
  }
}

export default UserApi;
