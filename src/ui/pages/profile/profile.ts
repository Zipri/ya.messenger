import './profile.scss';
import profileTemplate from './profile.hbs?raw';
import { ProfileInfoBlock } from './profileInfo/profileInfo';
import { Block } from '../../../controllers';
import type { TBlockProps } from '../../../controllers/block/types';

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
