import type { TID } from '@models/types';

export type TChatData = {
  id: TID;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
  /** Отправитель сообщения -- пользователь */
  isOwn?: boolean;
};
