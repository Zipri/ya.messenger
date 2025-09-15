import './profile.scss';
import { compile } from 'handlebars';

import { ChatList } from '../../blocks/chatList/chatList';

import { getMockChatItems } from './mock';
import profileTemplate from './profile.hbs?raw';
import { ProfileInfoBlock } from './profileInfo/profileInfo';

export class ProfilePage {
  private template = compile(profileTemplate);
  private chatList: ChatList;
  private profileInfo: ProfileInfoBlock;

  constructor() {
    this.chatList = new ChatList({
      chats: getMockChatItems(),
      isSearchHidden: true,
      onChatClick: () => {},
    });
    this.profileInfo = new ProfileInfoBlock();
  }

  render(): string {
    return this.template({
      chatList: this.chatList.render(),
    });
  }

  afterMount(): void {
    const slot = document.querySelector('#profile-info-slot');
    if (slot) {
      slot.replaceWith(this.profileInfo.getContent());
      this.profileInfo.dispatchComponentDidMount();
    }
  }
}
