import './chatList.scss';
import { ChatItem } from './chatItem/chatItem';
import chatListTemplate from './chatList.hbs?raw';
import { SearchChat } from './searchChat/searchChat';
import { Block, type TBlockProps } from '@controllers';
import type { TChatData } from './chatItem/types';
import type { TChat } from '@models/types';
import router from '@controllers/router/router';
import { BASE_URLS } from '@models';
import { globalEventBus } from 'app';

interface ChatListProps {
  onChatClick?: (chatId: string, chat: TChat) => void;
}

export class ChatList extends Block<ChatListProps & TBlockProps> {
  constructor(props: ChatListProps) {
    super({
      ...props,
      isSearchShown: true,
      searchChat: new SearchChat({
        onClickProfile: () => {
          router.go(BASE_URLS.profile);
          this.props.isSearchShown = false;
        },
        onCreateChat: async (chatTitle: string) => {
          await this._handleCreateChat(chatTitle);
        },
      }),
      chats: [], // Будем загружать из Store
    });
  }

  componentDidMount(): void {
    this._initializeChatList();

    if (router.getCurrentRoute() === BASE_URLS.chat) {
      this.props.isSearchShown = true;
    }
  }

  /** Инициализация списка чатов - загрузка из Store */
  private async _initializeChatList() {
    if (!window.APP.store) {
      console.error('Store недоступен для загрузки чатов');
      return;
    }

    try {
      // Загружаем чаты из API
      const chats = await window.APP.store.chats.loadChats();

      if (chats && chats.length > 0) {
        this._updateChatList(chats);
        // Уведомляем другие компоненты о загрузке
        globalEventBus.emit('chats-loaded', chats);
      } else {
        console.info('Чатов не найдено');
        this.lists.chats = [];
      }
    } catch (error) {
      console.error('Ошибка загрузки чатов:', error);
      this.lists.chats = [];
    }
  }

  /** Обработчик создания нового чата */
  private async _handleCreateChat(chatTitle: string): Promise<void> {
    if (!window.APP.store) {
      throw new Error('Store недоступен');
    }

    console.info('Создание чата:', chatTitle);

    try {
      // Создаем чат через Store
      const success = await window.APP.store.chats.createChat(chatTitle);

      if (success) {
        // Обновляем список чатов
        await this._initializeChatList();
        console.info('Чат успешно создан и список обновлен');
      } else {
        throw new Error('Не удалось создать чат');
      }
    } catch (error) {
      console.error('Ошибка при создании чата:', error);
      throw error;
    }
  }

  /** Обновление списка чатов из данных Store */
  private _updateChatList(chats: TChat[]) {
    const chatItems = chats.map((chat) => {
      const chatData: TChatData = {
        id: chat.id,
        name: chat.title,
        lastMessage: chat.last_message?.content || 'Нет сообщений',
        time: this._formatTime(chat.last_message?.time),
        unreadCount: chat.unread_count > 0 ? chat.unread_count : undefined,
        avatar: chat.avatar || '',
      };

      return new ChatItem({
        ...chatData,
        events: {
          click: () => {
            // Вызываем callback с данными чата - он сам выберет чат и перейдет
            if (this.props.onChatClick) {
              this.props.onChatClick(chat.id, chat);
              this.props.isSearchShown = true;
            }
          },
        },
      });
    });

    this.lists.chats = chatItems;
    this.setProps({ chats: chatItems });
  }

  /** Форматирование времени последнего сообщения */
  private _formatTime(time?: string): string {
    if (!time) return '';

    try {
      const date = new Date(time);
      const now = new Date();
      const diff = now.getTime() - date.getTime();
      const daysDiff = Math.floor(diff / (1000 * 60 * 60 * 24));

      if (daysDiff === 0) {
        // Сегодня - показываем время
        return date.toLocaleTimeString('ru-RU', {
          hour: '2-digit',
          minute: '2-digit',
        });
      } else if (daysDiff === 1) {
        return 'Вчера';
      } else {
        // Дата
        return date.toLocaleDateString('ru-RU', {
          day: '2-digit',
          month: '2-digit',
        });
      }
    } catch (error) {
      return '';
    }
  }

  // /** Публичный метод для обновления списка чатов */
  // public async refreshChats() {
  //   await this._initializeChatList();
  // }

  // /** Получение текущих чатов из Store */
  // public getCurrentChats(): TChat[] {
  //   return window.APP.store?.chats.chatList || [];
  // }

  render(): string {
    return chatListTemplate;
  }
}
