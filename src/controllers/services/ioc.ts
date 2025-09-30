import { ApiClient } from '@models';
import ProfileService from './profile/profile';
import ChatService from './chat/chat';
import WebSocketService from './websocket';

function iocServicesInit() {
  const apiClient = new ApiClient();

  const services = {
    profileService: new ProfileService(apiClient.userApi, apiClient.authApi),
    chatService: new ChatService(apiClient.chatsApi),
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
