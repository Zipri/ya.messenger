import type {
  TEditPasswordProps,
  TEditProfileProps,
  TUrl,
  TUser,
} from 'models/types';
import BaseApi from '../baseApi';
import type { TApiResponse } from '@models/http/types';

class UserApi extends BaseApi {
  baseUrl: TUrl = '/user';

  search(login?: string): Promise<TApiResponse<TUser[]>> {
    return this.http.post(`${this.baseUrl}/search`, {
      data: {
        login,
      },
    });
  }

  editProfile(props: TEditProfileProps): Promise<TApiResponse<TUser>> {
    return this.http.put(`${this.baseUrl}/profile`, {
      data: props,
    });
  }

  editAvatar(file: FormData): Promise<TApiResponse<TUser>> {
    return this.http.put(`${this.baseUrl}/profile/avatar`, {
      data: file,
    });
  }

  editPassword(props: TEditPasswordProps): Promise<TApiResponse<TUser>> {
    return this.http.put(`${this.baseUrl}/password`, {
      data: props,
    });
  }
}

export default UserApi;
