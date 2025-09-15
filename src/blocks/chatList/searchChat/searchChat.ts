import { compile } from 'handlebars';

import './searchChat.scss';
import { Input } from '../../../components/input/input';

import searchChatTemplate from './searchChat.hbs?raw';

interface ISearchChatProps {
  searchQuery?: string;
  onSearch?: (query: string) => void;
}

export class SearchChat {
  private template = compile(searchChatTemplate);
  private props: ISearchChatProps;
  private input: Input;

  constructor(props: ISearchChatProps = {}) {
    this.props = props;
    this.input = new Input();
  }

  render(): string {
    const inputHtml = this.input.render({
      id: 'search-chat-input',
      name: 'search',
      label: '',
      type: 'text',
      placeholder: 'Поиск чата',
      value: this.props.searchQuery || '',
    });

    return this.template({
      searchInput: inputHtml,
      avatar:
        'https://pic.rutubelist.ru/user/74/93/7493abf139502d19ca81b0457a2ef0cd.jpg',
      name: 'Seroshtan',
      email: 'seroshtan@gmail.com',
    });
  }
}
