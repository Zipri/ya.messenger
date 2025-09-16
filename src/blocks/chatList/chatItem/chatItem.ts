import './chatItem.scss';
import chatItemTemplate from './chatItem.hbs?raw';
import type { TChatData } from './types';
import { Block } from '../../../core';

interface ChatItemProps extends TChatData {
  events?: {
    click: (event: Event) => void;
  };
}

export class ChatItem extends Block<ChatItemProps> {
  constructor(props: ChatItemProps) {
    super(props);
  }

  protected render(): string {
    return chatItemTemplate;
  }
}
