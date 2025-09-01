export type TChatData = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
  /** Отправитель сообщения -- пользователь */
  isOwn?: boolean;
};
