import UserApi from 'models/api/user/user';
import HTTPTransport from 'models/http/http';

import AuthApi from './auth/auth';
import ChatsApi from './chats/chats';
import ResourcesApi from './resources/resources';

class ApiClient {
  userApi: UserApi;
  authApi: AuthApi;
  chatsApi: ChatsApi;
  resourcesApi: ResourcesApi;

  constructor() {
    const http = new HTTPTransport();

    this.userApi = new UserApi(http);
    this.authApi = new AuthApi(http);
    this.chatsApi = new ChatsApi(http);
    this.resourcesApi = new ResourcesApi(http);

    console.info('API сервисы инициализированы.');
  }
}

export default ApiClient;
