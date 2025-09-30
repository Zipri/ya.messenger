import type { TChat, TGetChatsProps, TID, TUrl } from 'models/types';
import BaseApi from '../baseApi';
import type { TApiResponse } from '@models/http/types';

class ChatsApi extends BaseApi {
  baseUrl: TUrl = '/chats';

  getChats(props: TGetChatsProps): Promise<TApiResponse<TChat[]>> {
    return this.http.get(`${this.baseUrl}`, {
      data: props,
    });
  }

  createChat(title: string): Promise<TApiResponse<TID>> {
    return this.http.post(`${this.baseUrl}`, {
      data: {
        title,
      },
    });
  }

  deleteChat(chatId: TID): Promise<TApiResponse<TID>> {
    return this.http.delete(`${this.baseUrl}`, {
      data: {
        chatId,
      },
    });
  }

  getChatToken(chatId: TID): Promise<TApiResponse<{ token: TID }>> {
    return this.http.post(`${this.baseUrl}/token/${chatId}`);
  }
}

export default ChatsApi;
