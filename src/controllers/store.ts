import { ProfileService, type TServices } from '@controllers';
import type ChatService from './services/chat/chat';
import type WebSocketService from './services/websocket';
import type {
  TChat,
  TEditPasswordProps,
  TEditProfileProps,
  TGetChatsProps,
  TID,
  TRegistrationProps,
  TUser,
} from '@models/types';
import type { TMessage } from './services/websocket';
import type UsersService from './services/users/users';

export class AppStore {
  private profileService!: ProfileService;
  private chatService!: ChatService;
  private usersService!: UsersService;
  private webSocketService!: WebSocketService;

  constructor(services: TServices) {
    this.profileService = services.profileService;
    this.chatService = services.chatService;
    this.usersService = services.usersService;
    this.webSocketService = services.webSocketService;
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

  chats = {
    chatList: [] as TChat[],
    activeChat: null as TChat | null,
    activeChatMessages: [] as TMessage[],
    isWebSocketConnected: false,
    onMessagesUpdate: null as (() => void) | null,
    activeChatUsers: [] as TUser[],

    //#region Chats
    /** Загрузка списка чатов */
    loadChats: async (props?: TGetChatsProps) => {
      try {
        const chats = await this.chatService.getChats(props);
        if (chats) {
          this.chats.chatList = chats;
          console.info('Чаты загружены:', chats.length);
          return chats;
        }
        return [];
      } catch (error) {
        console.error('Ошибка загрузки чатов:', error);
        return [];
      }
    },

    /** Создание нового чата */
    createChat: async (title: string): Promise<boolean> => {
      try {
        const chatId = await this.chatService.createChat(title);
        if (chatId) {
          // Перезагружаем список чатов
          await this.chats.loadChats();
          console.info('Чат создан с ID:', chatId);
          return true;
        }
        return false;
      } catch (error) {
        console.error('Ошибка создания чата:', error);
        return false;
      }
    },

    /** Удаление чата */
    deleteChat: async (chatId: TID): Promise<boolean> => {
      try {
        const success = await this.chatService.deleteChat(chatId);
        if (success) {
          // Удаляем из локального списка
          this.chats.chatList = this.chats.chatList.filter(
            (chat) => chat.id !== chatId
          );

          // Если удаляется активный чат, сбрасываем состояние
          if (this.chats.activeChat?.id === chatId) {
            await this.chats.disconnectFromChat();
          }

          console.info('Чат удален:', chatId);
          return true;
        }
        return false;
      } catch (error) {
        console.error('Ошибка удаления чата:', error);
        return false;
      }
    },

    /** Выбор активного чата */
    selectChat: (chat: TChat) => {
      // Отключаемся от текущего чата если подключены
      if (this.chats.activeChat?.id === chat.id) {
        return;
      }
      if (this.chats.isWebSocketConnected && this.chats.activeChat) {
        this.chats.disconnectFromChat();
      }

      this.chats.activeChat = chat;
      this.chats.activeChatMessages = [];

      console.info('Выбран чат:', chat.title);
    },
    //#endregion Chats

    //#region Dialog
    getUsers: async (): Promise<TUser[]> => {
      const users = await this.usersService.getUsers();
      if (users) {
        return users;
      }
      return [];
    },

    getActiveChatUsers: async (): Promise<TUser[]> => {
      if (!this.chats.activeChat?.id) {
        console.error('Чат не выбран');
        return [];
      }

      const users = await this.chatService.getChatUsers(
        this.chats.activeChat.id
      );

      if (users) {
        this.chats.activeChatUsers = users;
        return users;
      }

      return [];
    },

    addChatUser: async (userId: TID): Promise<boolean> => {
      if (!this.chats.activeChat?.id) {
        console.error('Чат не выбран');
        return false;
      }

      return this.chatService.addChatUsers(this.chats.activeChat.id, [
        ...this.chats.activeChatUsers.map((user) => user.id),
        userId,
      ]);
    },

    deleteChatUser: async (userId: TID): Promise<boolean> => {
      if (!this.chats.activeChat?.id) {
        console.error('Чат не выбран');
        return false;
      }

      return this.chatService.deleteChatUsers(this.chats.activeChat.id, [
        userId,
      ]);
    },
    //#endregion Dialog

    //#region WS:Connection
    /** Подключение к чату через WebSocket */
    connectToChat: async (chatId: TID): Promise<boolean> => {
      if (!this.user.currentUser) {
        console.error('Пользователь не авторизован');
        return false;
      }

      // Проверяем, не подключены ли мы уже к этому чату
      if (
        this.chats.isWebSocketConnected &&
        this.chats.activeChat?.id === chatId
      ) {
        console.info('Уже подключены к чату', chatId);
        return true;
      }

      // Отключаемся от предыдущего чата если подключены к другому
      if (
        this.chats.isWebSocketConnected &&
        this.chats.activeChat?.id !== chatId
      ) {
        console.info(
          'Отключаемся от предыдущего чата для подключения к новому'
        );
        this.chats.disconnectFromChat();
      }

      try {
        // Получаем токен для подключения
        const token = await this.chatService.getChatToken(chatId);
        if (!token) {
          console.error('Не удалось получить токен для чата');
          return false;
        }

        // Подключаемся через WebSocket
        this.webSocketService.connect(this.user.currentUser.id, chatId, token, {
          onOpen: () => {
            this.chats.isWebSocketConnected = true;
            console.info('Подключен к чату через WebSocket');

            // Загружаем последние сообщения
            this.chats.loadMessageHistory();
          },
          onMessage: (messages) => {
            this.chats._handleIncomingMessage(messages);
          },
          onClose: () => {
            this.chats.isWebSocketConnected = false;
            console.info('Отключен от чата');
          },
          onError: (error) => {
            console.error('WebSocket ошибка:', error);
          },
          onUserConnected: (userId) => {
            console.info('Пользователь подключился к чату:', userId);
          },
        });

        return true;
      } catch (error) {
        console.error('Ошибка подключения к чату:', error);
        return false;
      }
    },

    /** Отключение от чата */
    disconnectFromChat: () => {
      this.webSocketService.disconnect();
      this.chats.isWebSocketConnected = false;
      this.chats.activeChat = null;
      this.chats.activeChatMessages = [];
      this.chats.onMessagesUpdate = null;
    },
    //#endregion WS:Connection

    //#region WS:Messages
    /** Отправка сообщения */
    sendMessage: (content: string): boolean => {
      if (!this.chats.isWebSocketConnected) {
        console.error('WebSocket не подключен');
        return false;
      }

      if (!content.trim()) {
        console.error('Сообщение не может быть пустым');
        return false;
      }

      return this.webSocketService.sendMessage(content.trim());
    },

    /** Загрузка истории сообщений */
    loadMessageHistory: (offset: number = 0) => {
      if (!this.chats.isWebSocketConnected) {
        console.error('WebSocket не подключен');
        return false;
      }

      return this.webSocketService.getOldMessages(offset);
    },

    /** Обработка входящих сообщений */
    _handleIncomingMessage: (data: TMessage | TMessage[]) => {
      const messages = Array.isArray(data) ? data : [data];

      // Добавляем новые сообщения, избегая дубликатов
      messages.forEach((message) => {
        console.info('WS-message: ', message);
        if (message.type !== 'message') return;

        const exists = this.chats.activeChatMessages.find(
          (msg) => msg.id === message.id
        );
        if (!exists) {
          this.chats.activeChatMessages.push(message);
        }
      });

      // Сортируем сообщения по времени
      this.chats.activeChatMessages.sort(
        (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
      );

      console.info('Получены сообщения:', messages.length);

      // Уведомляем UI об обновлении сообщений
      if (this.chats.onMessagesUpdate) {
        this.chats.onMessagesUpdate();
      }
    },
    //#endregion WS:Messages
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
