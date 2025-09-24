import type { AuthApi, UserApi } from '@models';

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

  async getUsers(login?: string) {
    try {
      const { data } = await this.baseApi.search(login);
      return data;
    } catch (error) {
      console.error('Error getting users', error);
    }
  }
}

export default ProfileService;
