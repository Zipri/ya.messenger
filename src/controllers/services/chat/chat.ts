import type ChatsApi from '@models/api/chats/chats';
import type { TChat, TGetChatsProps, TID, TUser } from '@models/types';

class ChatService {
  private chatsApi: ChatsApi;

  constructor(chatsApi: ChatsApi) {
    this.chatsApi = chatsApi;
  }

  /** Получение списка чатов пользователя */
  async getChats(props?: TGetChatsProps): Promise<TChat[] | undefined> {
    try {
      const response = await this.chatsApi.getChats(
        props || { limit: 50, offset: 0 }
      );

      if (response.data) {
        return response.data;
      }

      return undefined;
    } catch (error) {
      console.error('Ошибка получения чатов:', error);
      return undefined;
    }
  }

  /** Создание нового чата */
  async createChat(title: string): Promise<TID | undefined> {
    try {
      const response = await this.chatsApi.createChat(title);

      if (response.data) {
        return response.data;
      }

      return undefined;
    } catch (error) {
      console.error('Ошибка создания чата:', error);
      return undefined;
    }
  }

  /** Удаление чата */
  async deleteChat(chatId: TID): Promise<boolean> {
    try {
      await this.chatsApi.deleteChat(chatId);
      return true;
    } catch (error) {
      console.error('Ошибка удаления чата:', error);
      return false;
    }
  }

  /** Получение токена для WebSocket подключения к чату */
  async getChatToken(chatId: TID): Promise<TID | undefined> {
    try {
      const response = await this.chatsApi.getChatToken(chatId);

      if (response.data?.token) {
        return response.data.token;
      }

      return undefined;
    } catch (error) {
      console.error('Ошибка получения токена чата:', error);
      return undefined;
    }
  }

  /** Получение списка пользователей чата */
  async getChatUsers(chatId: TID): Promise<TUser[] | undefined> {
    try {
      const response = await this.chatsApi.getChatUsers(chatId);
      return response.data;
    } catch (error) {
      console.error('Ошибка получения списка пользователей чата:', error);
      return undefined;
    }
  }

  /** Добавление пользователей в чат */
  async addChatUsers(chatId: TID, users: TID[]): Promise<boolean> {
    try {
      await this.chatsApi.addChatUsers(chatId, users);
      return true;
    } catch (error) {
      console.error('Ошибка добавления пользователей в чат:', error);
      return false;
    }
  }

  /** Удаление пользователей из чата */
  async deleteChatUsers(chatId: TID, users: TID[]): Promise<boolean> {
    try {
      await this.chatsApi.deleteChatUsers(chatId, users);
      return true;
    } catch (error) {
      console.error('Ошибка удаления пользователей из чата:', error);
      return false;
    }
  }
}

export default ChatService;
