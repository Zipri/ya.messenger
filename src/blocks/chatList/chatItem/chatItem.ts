import { compile } from 'handlebars';

import './chatItem.scss';
import chatItemTemplate from './chatItem.hbs?raw';
import type { TChatData } from './types';

interface IChatItemProps {
  data: TChatData;
  onClick?: (chatId: string) => void;
}

export class ChatItem {
  private template = compile(chatItemTemplate);
  private props: IChatItemProps;

  constructor(props: IChatItemProps) {
    this.props = props;
  }

  render(): string {
    return this.template(this.props.data);
  }
}
