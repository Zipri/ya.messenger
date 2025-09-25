import { AuthApi, ResourcesApi, UserApi } from '@models';
import type {
  TEditPasswordProps,
  TEditProfileProps,
  TRegistrationProps,
} from '@models/types';

class ProfileService {
  private baseApi!: UserApi;
  private authApi!: AuthApi;

  constructor(userApi: UserApi, authApi: AuthApi) {
    this.baseApi = userApi;
    this.authApi = authApi;
  }

  async login(login: string, password: string) {
    try {
      const { data } = await this.authApi.login(login, password);
      return data;
    } catch (error) {
      console.error('Error logging in', error);
    }
  }

  async registration(credentials: TRegistrationProps) {
    try {
      await this.authApi.registration(credentials);
    } catch (error) {
      console.error('Error registering', error);
    }
  }

  async logout() {
    try {
      await this.authApi.logout();
    } catch (error) {
      console.error('Error logging out', error);
    }
  }

  async getCurrentUser() {
    try {
      const { data } = await this.authApi.getCurrentUser();
      return data;
    } catch (error) {
      console.error('Error getting current user', error);
    }
  }

  async editProfile(props: TEditProfileProps) {
    try {
      const { data } = await this.baseApi.editProfile(props);
      return data;
    } catch (error) {
      console.error('Error editing profile', error);
    }
  }

  async editAvatar(file: FormData) {
    try {
      const { data } = await this.baseApi.editAvatar(file);
      return data;
    } catch (error) {
      console.error('Error editing avatar', error);
    }
  }

  async editPassword(props: TEditPasswordProps) {
    try {
      const { data } = await this.baseApi.editPassword(props);
      return data;
    } catch (error) {
      console.error('Error editing password', error);
    }
  }
}

export default ProfileService;
