import type { TUrl } from 'models/types';
import BaseApi from '../baseApi';

class AuthApi extends BaseApi {
  baseUrl: TUrl = '/auth';

  login(login: string, password: string) {
    return this.http.post(`${this.baseUrl}/signin`, {
      data: {
        login,
        password,
      },
    });
  }

  getCurrentUser() {
    return this.http.get(`${this.baseUrl}/user`);
  }
}

export default AuthApi;
