import './profile.scss';
import profileTemplate from './profile.hbs?raw';
import { Block } from '../../core';
import { ProfileInfoBlock } from './profileInfo/profileInfo';
import { ChatList } from '../../blocks/chatList/chatList';
import { getMockChatItems } from './mock';

type ProfilePageProps = Record<string, any>;

export class ProfilePage extends Block<ProfilePageProps> {
  constructor() {
    super({
      chatList: new ChatList({
        chats: getMockChatItems(),
        isSearchHidden: true,
        onChatClick: () => {},
      }).render(),
      profileInfo: new ProfileInfoBlock(),
    });
  }

  protected render(): string {
    return profileTemplate;
  }
}
