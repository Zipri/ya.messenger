import { ProfileService, type TServices } from '@controllers';
import type {
  TEditPasswordProps,
  TEditProfileProps,
  TRegistrationProps,
  TUser,
} from '@models/types';

export class AppStore {
  private profileService!: ProfileService;

  constructor(services: TServices) {
    this.profileService = services.profileService;
  }

  user = {
    currentUser: null as TUser | null,

    //#region Auth
    authorize: async (logoutCallback: () => void) => {
      const userData: TUser | undefined =
        await this.profileService.getCurrentUser();

      if (userData) {
        this.user.currentUser = userData;
      } else {
        const userCredentials = window.localStorage.getItem('userCredentials');
        if (userCredentials) {
          const { login, password } = JSON.parse(userCredentials);
          await this.profileService.login(login, password);
          this.user.currentUser =
            (await this.profileService.getCurrentUser()) || null;
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

      await this.profileService.login(login, password);
      const userData: TUser | undefined =
        await this.profileService.getCurrentUser();

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
      await this.profileService.registration(credentials);

      const userData: TUser | undefined =
        await this.profileService.getCurrentUser();

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
        await this.profileService.logout();
        this.user.currentUser = null;
        window.localStorage.removeItem('userCredentials');
        logoutCallback();
      } catch (error) {
        console.error('Error logging out', error);
      }
    },
    //#endregion Auth

    //#region User
    editProfile: async (props: TEditProfileProps) => {
      try {
        const userData = await this.profileService.editProfile(props);

        if (!userData) {
          return false;
        }

        this.user.currentUser = userData || null;
        return true;
      } catch (error) {
        console.error('Error editing profile', error);
      }
    },

    editPassword: async (props: {
      old_password: string;
      password: string;
      repeat_password: string;
    }) => {
      const { old_password, password } = props;
      try {
        await this.profileService.editPassword({
          newPassword: password,
          oldPassword: old_password,
        });
      } catch (error) {
        console.error('Error editing password', error);
      }
    },

    editAvatar: async (file: File) => {
      try {
        const formData = new FormData();
        formData.append('avatar', file);

        const userData = await this.profileService.editAvatar(formData);

        if (!userData) {
          return false;
        }

        this.user.currentUser = userData || null;
        return true;
      } catch (error) {
        console.error('Error editing avatar', error);
      }
    },
    //#endregion User
  };
}

//#region Init
export function appStoreInit(services: TServices) {
  const store = new AppStore(services);

  if (!window.APP) {
    window.APP = {};
  }

  window.APP.store = store;

  console.info('Локальное хранилище инициализировано.');
}
//#endregion Init
