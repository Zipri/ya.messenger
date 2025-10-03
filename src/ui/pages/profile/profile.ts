import './profile.scss';
import { Block, type TBlockProps } from '@controllers';

import profileTemplate from './profile.hbs?raw';
import { ProfileInfoBlock } from './profileInfo/profileInfo';

type ProfilePageProps = TBlockProps;

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
