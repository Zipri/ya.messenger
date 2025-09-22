import './chat.scss';

import chatTemplate from './chat.hbs?raw';
import { Dialog } from './dialog/dialog';
import { Block } from '../../../controllers';
import type { ChatList } from '../../blocks';
import type { TBlockProps } from '../../../controllers/block/types';

type ChatState = 'dialog' | 'empty';

interface ChatPageProps {
  chatList: ChatList;
  chatState?: ChatState;
}

export class ChatPage extends Block<ChatPageProps & TBlockProps> {
  constructor(props: ChatPageProps) {
    super({
      chatState: 'empty',
      // Компоненты
      chatList: props.chatList,
      dialog: new Dialog({}),
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
