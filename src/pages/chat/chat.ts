import './chat.scss';
import { compile } from 'handlebars';

import { ChatList } from '../../blocks/chatList/chatList';

import chatTemplate from './chat.hbs?raw';
import { Dialog } from './dialog/dialog';
import { getMockChatItems } from './mock';

export class ChatPage {
  private template = compile(chatTemplate);
  private chatList: ChatList;
  private dialog: Dialog;
  private chatState: 'dialog' | 'empty' = 'empty';

  constructor() {
    this.chatList = new ChatList({
      chats: getMockChatItems(),
      onChatClick: () => {},
    });
    this.dialog = new Dialog();
  }

  render(): string {
    return this.template({
      chatList: this.chatList.render(),
      dialog: this.dialog.render(),
      isEmpty: this.chatState === 'empty',
      isDialog: this.chatState === 'dialog',
    });
  }

  private handleChatClick = (event: Event): void => {
    const target = event.target as HTMLElement;
    const chatItem = target.closest('.chat-item');

    if (chatItem) {
      this.chatState = 'dialog';
      this.rerenderPage();
    }
  };

  private rerenderPage(): void {
    const container = document.querySelector('.chat-page');
    if (container && container.parentElement) {
      container.parentElement.innerHTML = this.render();
      this.afterMount();
    }
  }

  afterMount(): void {
    // Добавляем слушатель на весь документ для обработки кликов по chat-item
    document.addEventListener('click', this.handleChatClick);

    // Если открыт диалог, инициализируем его
    if (this.chatState === 'dialog') {
      this.dialog.afterMount();
    }
  }
}
