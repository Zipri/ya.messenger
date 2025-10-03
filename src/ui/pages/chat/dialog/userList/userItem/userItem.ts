import './userItem.scss';
import { Block, type TBlockProps } from '@controllers';
import { BASE_RESOURCES_URL } from '@models';
import type { TID, TUser } from '@models/types';
import { Button } from '@ui-components';

import userItemTemplate from './userItem.hbs?raw';

interface UserItemProps {
  user: TUser;
  onDelete?: (userId: TID) => void;
}

export class UserItem extends Block<TBlockProps> {
  constructor(props: UserItemProps) {
    const currentUser = window.APP.store?.user.currentUser;
    const adaptedProps = {
      ...props.user,
      avatar: props.user.avatar
        ? `${BASE_RESOURCES_URL}${props.user.avatar}`
        : '',
      isOwn: currentUser?.id === props.user.id,
    };

    super({
      ...adaptedProps,
      // Компоненты
      deleteBtn: new Button({
        id: 'delete-btn',
        styleClasses: 'user-item__delete-btn',
        text: 'X',
        onClick: () => {
          props.onDelete?.(props.user.id);
        },
      }),
    });
  }

  render(): string {
    return userItemTemplate;
  }
}
