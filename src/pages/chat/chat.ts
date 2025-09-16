import './chat.scss';

import chatTemplate from './chat.hbs?raw';
import { Dialog } from './dialog/dialog';
import { Block } from '../../core';
import { ChatList } from '../../blocks';

type ChatState = 'dialog' | 'empty';

interface ChatPageProps {
  chatState?: ChatState;
}

export class ChatPage extends Block<ChatPageProps & Record<string, any>> {
  constructor() {
    super({
      chatState: 'empty',
      // Компоненты
      chatList: new ChatList({
        isSearchHidden: false,
        onChatClick: (chatId: string) => {
          console.log(`Нажат чат с ID: ${chatId}`);
          this.setProps({ chatState: 'dialog' });
        },
      }),
      dialog: new Dialog().render(),
    });
  }

  render(): string {
    return chatTemplate;
  }
}
