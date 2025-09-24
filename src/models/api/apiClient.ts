import HTTPTransport from 'models/http/http';
import UserApi from 'models/api/user/user';
import AuthApi from './auth/auth';
import ChatsApi from './chats/chats';

class ApiClient {
  userApi: UserApi;
  authApi: AuthApi;
  chatsApi: ChatsApi;

  constructor() {
    const http = new HTTPTransport();

    this.userApi = new UserApi(http);
    this.authApi = new AuthApi(http);
    this.chatsApi = new ChatsApi(http);

    console.info('API сервисы инициализированы.');
  }
}

export default ApiClient;
