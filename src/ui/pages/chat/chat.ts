import './chat.scss';

import chatTemplate from './chat.hbs?raw';
import { Dialog } from './dialog/dialog';
import { ChatList } from '@ui-blocks';
import { Block, type TBlockProps } from '@controllers';
import type { TChat } from '@models/types';
import { globalEventBus } from 'app';

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
      dialog: null, // Создадим в componentDidMount чтобы избежать дублирования
    });

    console.log('ChatPage-constructor:', {
      id: props.id,
      chatState,
    });
  }

  componentDidMount(): void {
    globalEventBus.subscribe('chats-loaded', () => {
      this._createDialog();
    });
  }

  private _createDialog() {
    // Создаем Dialog только если есть chatId и его еще нет
    if (this.props.id && !this.children.dialog) {
      let selectedChat: TChat | undefined | null = null;

      if (!selectedChat && window.APP.store) {
        const chatStore = window.APP.store.chats;
        // FIXME SKV (!) все ID сделать СТРОКОЙ !!!
        selectedChat =
          String(chatStore.activeChat?.id) === this.props.id
            ? chatStore.activeChat
            : chatStore.chatList.find(
                (chat) => String(chat.id) === this.props.id
              );
      }

      console.log(
        'ChatPage-createDialog: создаем Dialog для чата',
        this.props.id,
        'selectedChat:',
        selectedChat
      );

      if (selectedChat && window.APP.store) {
        window.APP.store.chats.selectChat(selectedChat);
      }

      // 1. Создаем экземпляр Dialog и помещаем его в children
      this.children.dialog = new Dialog({
        chatId: this.props.id,
        chat: selectedChat ?? undefined,
      });

      // 2. Запускаем перерисовку ChatPage, чтобы Dialog появился в DOM
      this.eventBus.emit('render');

      // 3. СРАЗУ ПОСЛЕ ПЕРЕРИСОВКИ:
      // Вручную запускаем жизненный цикл монтирования для нового дочернего компонента.
      this.children.dialog.dispatchComponentDidMount();
    }
  }

  componentWillUnmount(): void {
    if (this.children.dialog) {
      this.children.dialog.remove();
    }
  }

  render(): string {
    return chatTemplate;
  }
}
