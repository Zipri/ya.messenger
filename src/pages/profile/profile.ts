import './profile.scss';
import profileTemplate from './profile.hbs?raw';
import { Block } from '../../core';
import { ProfileInfoBlock } from './profileInfo/profileInfo';
import { ChatList } from '../../blocks/chatList/chatList';

// FIXME SKV (!) убрать все Record<string, any>
type ProfilePageProps = Record<string, any>;

export class ProfilePage extends Block<ProfilePageProps> {
  constructor() {
    super({
      chatList: new ChatList({
        isSearchHidden: true,
      }),
      profileInfo: new ProfileInfoBlock(),
    });
  }

  protected render(): string {
    return profileTemplate;
  }
}
