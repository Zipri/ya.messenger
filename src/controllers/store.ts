import type {
  TEditPasswordProps,
  TEditProfileProps,
  TRegistrationProps,
  TUser,
} from '@models/types';

export class AppStore {
  user = {
    currentUser: null as TUser | null,

    authorize: async (logoutCallback: () => void) => {
      const userData: TUser | undefined =
        await window.APP.services?.profileService.getCurrentUser();

      if (userData) {
        this.user.currentUser = userData;
      } else {
        const userCredentials = window.localStorage.getItem('userCredentials');
        if (userCredentials) {
          const { login, password } = JSON.parse(userCredentials);
          await window.APP.services?.profileService.login(login, password);
          this.user.currentUser =
            (await window.APP.services?.profileService.getCurrentUser()) ||
            null;
        } else {
          logoutCallback();
          console.error('Авторизация не прошла, пожалуйста, авторизуйтесь');
          return;
        }
      }

      console.info(
        'Авторизация прошла успешно, добро пожаловать,',
        userData?.login
      );
    },

    login: async (
      credentials: { login: string; password: string },
      loginCallback: () => void
    ) => {
      const { login, password } = credentials;

      await window.APP.services?.profileService.login(login, password);
      const userData: TUser | undefined =
        await window.APP.services?.profileService.getCurrentUser();

      if (userData) {
        this.user.currentUser = userData;
        window.localStorage.setItem(
          'userCredentials',
          JSON.stringify({ login, password })
        );
        loginCallback();
      }
    },

    register: async (
      credentials: TRegistrationProps,
      registerCallback: () => void
    ) => {
      await window.APP.services?.profileService.registration(credentials);

      const userData: TUser | undefined =
        await window.APP.services?.profileService.getCurrentUser();

      if (userData) {
        const { login, password } = credentials;
        this.user.currentUser = userData;
        window.localStorage.setItem(
          'userCredentials',
          JSON.stringify({ login, password })
        );
        registerCallback();
      }
    },

    logout: async (logoutCallback: () => void) => {
      try {
        await window.APP.services?.profileService.logout();
        this.user.currentUser = null;
        window.localStorage.removeItem('userCredentials');
        logoutCallback();
      } catch (error) {
        console.error('Error logging out', error);
      }
    },

    editProfile: async (props: TEditProfileProps) => {
      try {
        const userData =
          await window.APP.services?.profileService.editProfile(props);
        this.user.currentUser = userData || null;
        return true;
      } catch (error) {
        console.error('Error editing profile', error);
        return false;
      }
    },

    editPassword: async (props: {
      old_password: string;
      password: string;
      repeat_password: string;
    }) => {
      const { old_password, password } = props;
      try {
        await window.APP.services?.profileService.editPassword({
          newPassword: password,
          oldPassword: old_password,
        });

        return true;
      } catch (error) {
        console.error('Error editing password', error);
        return false;
      }
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
