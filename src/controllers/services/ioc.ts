import { ApiClient } from '@models';
import ProfileService from './profile/profile';

function iocServicesInit() {
  const apiClient = new ApiClient();

  const services = {
    profileService: new ProfileService(apiClient.userApi, apiClient.authApi),
  };

  if (!window.APP) {
    window.APP = {};
  }

  window.APP.services = services;

  console.info('Общие сервисы инициализированы.');
}

export default iocServicesInit;
