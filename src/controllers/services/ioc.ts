import { ApiClient } from '@models';
import ProfileService from './profile/profile';
import ChatService from './chat/chat';
import WebSocketService from './websocket';
import UsersService from './users/users';

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
