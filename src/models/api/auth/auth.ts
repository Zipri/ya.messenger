import type { TApiResponse } from '@models/http/types';
import type { TRegistrationProps, TUrl, TUser } from 'models/types';

import BaseApi from '../baseApi';

class AuthApi extends BaseApi {
  baseUrl: TUrl = '/auth';

  registration(props: TRegistrationProps) {
    return this.http.post(`${this.baseUrl}/signup`, {
      data: props,
    });
  }

  login(login: string, password: string) {
    return this.http.post(`${this.baseUrl}/signin`, {
      data: {
        login,
        password,
      },
    });
  }

  logout() {
    return this.http.post(`${this.baseUrl}/logout`);
  }

  getCurrentUser(): Promise<TApiResponse<TUser>> {
    return this.http.get(`${this.baseUrl}/user`);
  }
}

export default AuthApi;
