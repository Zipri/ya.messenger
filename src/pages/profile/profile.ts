import './profile.scss';
import profileTemplate from './profile.hbs?raw';
import { Block } from '../../core';
import { ProfileInfoBlock } from './profileInfo/profileInfo';

// FIXME SKV (!) убрать все Record<string, any>
type ProfilePageProps = Record<string, any>;

export class ProfilePage extends Block<ProfilePageProps> {
  constructor(props: ProfilePageProps) {
    super({
      chatList: props.chatList,
      profileInfo: new ProfileInfoBlock(),
    });
  }

  protected render(): string {
    return profileTemplate;
  }
}
