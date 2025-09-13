import './profile.scss';
import { compile } from 'handlebars';

import { ChatList } from '../../blocks/chatList/chatList';

import { getMockChatItems } from './mock';
import profileTemplate from './profile.hbs?raw';
import { ProfileInfo } from './profileInfo/profileInfo';

export class ProfilePage {
  private template = compile(profileTemplate);
  private chatList: ChatList;
  private profileInfo: ProfileInfo;

  constructor() {
    this.chatList = new ChatList({
      chats: getMockChatItems(),
      isSearchHidden: true,
      onChatClick: () => {},
    });
    this.profileInfo = new ProfileInfo();

    // Слушаем изменения состояния профиля
    document.addEventListener('profileStateChanged', () => {
      this.rerender();
    });
  }

  /** Простая реализация переключения состояния ProfileInfo */
  private rerender(): void {
    const rootElement = document.querySelector('#app');
    if (rootElement) {
      rootElement.innerHTML = this.render();
    }
  }

  render(): string {
    return this.template({
      chatList: this.chatList.render(),
      profileInfo: this.profileInfo.render(),
    });
  }
}
