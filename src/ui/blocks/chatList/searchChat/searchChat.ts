import './searchChat.scss';

import searchChatTemplate from './searchChat.hbs?raw';
import { Block, type TBlockProps } from '@controllers';
import { Button, InputBlock } from '@ui-components';
import { BASE_RESOURCES_URL } from '@models';

interface SearchChatProps {
  onClickProfile?: () => void;
  onCreateChat?: (chatTitle: string) => Promise<void>;
}

export class SearchChat extends Block<SearchChatProps & TBlockProps> {
  constructor(props: SearchChatProps) {
    super({
      ...props,
      // Компоненты
      searchInput: new InputBlock({
        id: 'search-chat-input',
        name: 'search',
        type: 'text',
        placeholder: 'Поиск чата',
        value: '',
      }),
      profileButton: new Button({
        id: 'profile-button',
        text: 'Профиль',
        styleClasses: 'search-chat__header__button',
        onClick: props.onClickProfile,
      }),
      createChatButton: new Button({
        id: 'create-chat-button',
        text: '+ Создать чат',
        styleClasses: 'search-chat__create-button',
        onClick: () => this._handleCreateChat(),
      }),
    });
  }

  protected componentDidMount(): void {
    const user = window.APP.store?.user.currentUser;

    if (user) {
      this.props.name = user.first_name + ' ' + user.second_name;
      this.props.email = user.email;
      this.props.avatar = `${BASE_RESOURCES_URL}${user.avatar}`;
    }
  }

  /** Обработчик создания нового чата */
  private async _handleCreateChat() {
    const chatTitle = prompt('Введите название нового чата:');

    if (!chatTitle || !chatTitle.trim()) {
      return;
    }

    const trimmedTitle = chatTitle.trim();

    try {
      if (this.props.onCreateChat) {
        await this.props.onCreateChat(trimmedTitle);
        console.info('Чат успешно создан:', trimmedTitle);
      } else {
        // Fallback - прямое обращение к Store
        if (window.APP.store) {
          const success = await window.APP.store.chats.createChat(trimmedTitle);
          if (success) {
            console.info('Чат успешно создан:', trimmedTitle);
          } else {
            alert('Ошибка создания чата');
          }
        }
      }
    } catch (error) {
      console.error('Ошибка создания чата:', error);
      alert('Ошибка создания чата');
    }
  }

  render(): string {
    return searchChatTemplate;
  }
}
