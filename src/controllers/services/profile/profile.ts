import type { AuthApi, UserApi } from '@models';

class ProfileService {
  private baseApi!: UserApi;
  private authApi!: AuthApi;

  constructor(userApi: UserApi, authApi: AuthApi) {
    this.baseApi = userApi;
    this.authApi = authApi;
  }

  login(login: string, password: string) {
    return this.authApi.login(login, password);
  }

  getUsers() {
    return this.baseApi.search();
  }
}

export default ProfileService;
