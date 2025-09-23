import './chat.scss';

import chatTemplate from './chat.hbs?raw';
import { Dialog } from './dialog/dialog';
import { ChatList } from '@ui-blocks';
import { Block, type TBlockProps } from '@controllers';

interface ChatPageProps {
  chatList: ChatList;
}

export class ChatPage extends Block<ChatPageProps & TBlockProps> {
  constructor(props: ChatPageProps) {
    super({
      // Компоненты
      chatList: props.chatList,
      dialog: new Dialog({}),
    });
  }

  render(): string {
    return chatTemplate;
  }
}
