import './profile.scss';
import profileTemplate from './profile.hbs?raw';
import { Block } from '../../core';
import { ProfileInfoBlock } from './profileInfo/profileInfo';
import { ChatList } from '../../blocks/chatList/chatList';

type ProfilePageProps = Record<string, any>;

export class ProfilePage extends Block<ProfilePageProps> {
  constructor() {
    super({
      chatList: new ChatList({
        isSearchHidden: true,
      }).render(),
      profileInfo: new ProfileInfoBlock(),
    });
  }

  protected render(): string {
    return profileTemplate;
  }
}
