import './searchChat.scss';

import searchChatTemplate from './searchChat.hbs?raw';
import { Block } from '../../../../core';
import { InputBlock } from '../../../components';

interface SearchChatProps {
  searchQuery?: string;
  avatar?: string;
  name?: string;
  email?: string;
}

export class SearchChat extends Block<SearchChatProps & Record<string, any>> {
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
        value: props.searchQuery || '',
      }),
    });
  }

  protected render(): string {
    return searchChatTemplate;
  }
}
