import './userItem.scss';
import userItemTemplate from './userItem.hbs?raw';
import type { TUserItem } from './types';
import { Block, type TBlockProps } from '@controllers';
import type { TID } from '@models/types';

interface UserItemProps {
  user: TUserItem;
  onDelete?: (userId: TID) => void;
}

export class UserItem extends Block<TBlockProps> {
  constructor(props: UserItemProps) {
    super({
      ...props.user,
      events: {
        click: (event: Event) => {
          if (
            (event.target as HTMLElement).classList.contains(
              'user-item__delete-btn'
            )
          ) {
            props.onDelete?.(props.user.id);
          }
        },
      },
    });
  }

  render(): string {
    return userItemTemplate;
  }
}

