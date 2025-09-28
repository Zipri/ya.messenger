import './searchChat.scss';

import searchChatTemplate from './searchChat.hbs?raw';
import { Block, type TBlockProps } from '@controllers';
import { Button, InputBlock } from '@ui-components';
import { BASE_RESOURCES_URL } from '@models';

interface SearchChatProps {
  onClickProfile?: () => void;
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

  protected render(): string {
    return searchChatTemplate;
  }
}
