import HTTPTransport from 'models/http/http';
import UserApi from 'models/api/user/user';
import AuthApi from './auth/auth';

class ApiClient {
  userApi: UserApi;
  authApi: AuthApi;

  constructor() {
    const http = new HTTPTransport();

    this.userApi = new UserApi(http);
    this.authApi = new AuthApi(http);

    console.info('API сервисы инициализированы.');
  }
}

export default ApiClient;
