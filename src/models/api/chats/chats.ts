import type { TChat, TGetChatsProps, TID, TUrl, TUser } from 'models/types';
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

  getChatUsers(chatId: TID): Promise<TApiResponse<TUser[]>> {
    return this.http.get(`${this.baseUrl}/${chatId}/users`);
  }

  addChatUsers(chatId: TID, users: TID[]): Promise<TApiResponse<TID>> {
    return this.http.put(`${this.baseUrl}/users`, {
      data: {
        users,
        chatId,
      },
    });
  }

  deleteChatUsers(chatId: TID, users: TID[]): Promise<TApiResponse<TID>> {
    return this.http.delete(`${this.baseUrl}/users`, {
      data: {
        users,
        chatId,
      },
    });
  }
}

export default ChatsApi;
