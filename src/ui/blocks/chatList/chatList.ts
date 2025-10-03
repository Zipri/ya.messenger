import './chatList.scss';
import { Block, globalEventBus, type TBlockProps } from '@controllers';
import router from '@controllers/router/router';
import { BASE_URLS } from '@models';
import type { TChat } from '@models/types';
import { formatTime } from '@utils';

import { ChatItem } from './chatItem/chatItem';
import type { TChatData } from './chatItem/types';
import chatListTemplate from './chatList.hbs?raw';
import { SearchChat } from './searchChat/searchChat';

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
      chats: [],
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
      const success = await window.APP.store.chats.createChat(chatTitle);

      if (success) {
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
        time: formatTime(chat.last_message?.time),
        unreadCount: chat.unread_count > 0 ? chat.unread_count : undefined,
        avatar: chat.avatar || '',
      };

      return new ChatItem({
        ...chatData,
        events: {
          click: () => {
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

  render(): string {
    return chatListTemplate;
  }
}
