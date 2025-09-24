import './searchChat.scss';

import searchChatTemplate from './searchChat.hbs?raw';
import { Block, type TBlockProps } from '@controllers';
import { Button, InputBlock } from '@ui-components';

interface SearchChatProps {
  onClickProfile?: () => void;
}

export class SearchChat extends Block<SearchChatProps & TBlockProps> {
  constructor(props: SearchChatProps) {
    super({
      ...props,
      avatar:
        'https://pic.rutubelist.ru/user/74/93/7493abf139502d19ca81b0457a2ef0cd.jpg',
      name: 'Seroshtan',
      email: 'seroshtan@gmail.com',
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
      console.log(user);
      this.props.name = user.first_name + ' ' + user.second_name;
      this.props.email = user.email;
    }
  }

  protected render(): string {
    return searchChatTemplate;
  }
}
