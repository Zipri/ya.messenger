import type { TUser } from '@models/types';

export class AppStore {
  user = {
    currentUser: null as TUser | null,

    getCurrentUser() {
      const response =
        window.APP.services?.profileService.getUsers('Zipri_dev');
      console.log(response);
    },
  };
}

export function appStoreInit() {
  const store = new AppStore();

  if (!window.APP) {
    window.APP = {};
  }

  window.APP.store = store;

  console.info('Локальное хранилище инициализировано.');
}
