import './chat.scss';

import chatTemplate from './chat.hbs?raw';
import { Dialog } from './dialog/dialog';
import { Block } from '../../core';
import { ChatList } from '../../blocks';

type ChatState = 'dialog' | 'empty';

interface ChatPageProps {
  chatList: ChatList;
  chatState?: ChatState;
}

export class ChatPage extends Block<ChatPageProps & Record<string, any>> {
  constructor(props: ChatPageProps) {
    super({
      chatState: 'empty',
      // Компоненты
      chatList: props.chatList,
      dialog: new Dialog().render(),
    });

    props.chatList.setProps({
      onChatClick: (chatId: string) => {
        console.log(`Нажат чат с ID: ${chatId}`);
        this.setProps({ chatState: 'dialog' });
      },
    });
  }

  render(): string {
    return chatTemplate;
  }
}
