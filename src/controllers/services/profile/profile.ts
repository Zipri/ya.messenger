import type { AuthApi, UserApi } from '@models';

class ProfileService {
  private baseApi!: UserApi;
  private authApi!: AuthApi;

  constructor(userApi: UserApi, authApi: AuthApi) {
    this.baseApi = userApi;
    this.authApi = authApi;
  }

  async login(login: string, password: string) {
    const { data } = await this.authApi.login(login, password);
    return data;
  }

  async authorize(login: string, password: string) {
    // 1. Авторизуемся (получаем cookies)
    await this.login(login, password);
    // 2. Получаем данные пользователя
    const { data } = await this.authApi.getCurrentUser();
    return data;
  }

  async getCurrentUser() {
    const { data } = await this.authApi.getCurrentUser();
    return data;
  }

  async getUsers(login?: string) {
    const { data } = await this.baseApi.search(login);
    return data;
  }
}

export default ProfileService;
