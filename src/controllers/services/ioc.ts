import { ApiClient } from '@models';

import ChatService from './chat/chat';
import ProfileService from './profile/profile';
import UsersService from './users/users';
import WebSocketService from './websocket';

function iocServicesInit() {
  const apiClient = new ApiClient();

  const services = {
    profileService: new ProfileService(apiClient.userApi, apiClient.authApi),
    chatService: new ChatService(apiClient.chatsApi),
    usersService: new UsersService(apiClient.userApi),
    webSocketService: new WebSocketService(),
  };

  if (!window.APP) {
    window.APP = {};
  }

  window.APP.services = services;

  console.info('Общие сервисы инициализированы.');

  return services;
}

export type TServices = ReturnType<typeof iocServicesInit>;

export default iocServicesInit;
