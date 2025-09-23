import './chat.scss';

import chatTemplate from './chat.hbs?raw';
import { Dialog } from './dialog/dialog';
import { ChatList } from '@ui-blocks';
import { Block, type TBlockProps } from '@controllers';

interface ChatPageProps {
  chatList: ChatList;
  id?: string; // id приходит от роутера
}

export class ChatPage extends Block<ChatPageProps & TBlockProps> {
  constructor(props: ChatPageProps) {
    const chatState = props.id ? 'dialog' : 'empty';

    super({
      ...props,
      chatState, // Передаем состояние в шаблон
      // Компоненты
      chatList: props.chatList,
      dialog: new Dialog({
        chatId: props.id,
      }),
    });
  }

  render(): string {
    return chatTemplate;
  }
}
