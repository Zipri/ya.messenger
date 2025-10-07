import { UserApi } from '@models';
import type { TUser } from '@models/types';

class UsersService {
  private baseApi!: UserApi;

  constructor(userApi: UserApi) {
    this.baseApi = userApi;
  }

  async getUsers(login?: string): Promise<TUser[] | undefined> {
    try {
      const response = await this.baseApi.search(login || '');
      return response.data;
    } catch (error) {
      console.error('Error getting users', error);
    }
  }
}

export default UsersService;
