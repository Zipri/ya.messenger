import './chatList.scss';
import { ChatItem } from './chatItem/chatItem';
import chatListTemplate from './chatList.hbs?raw';
import { SearchChat } from './searchChat/searchChat';
import type { TChatData } from './chatItem/types';
import { getMockChatItems } from '../../pages/chat/mock';
import { Block } from '../../core';

interface ChatListProps {
  isSearchHidden?: boolean;
  onChatClick?: (chatId: string) => void;
}

export class ChatList extends Block<ChatListProps & Record<string, any>> {
  constructor(props: ChatListProps) {
    const chatsData: TChatData[] = getMockChatItems();

    super({
      ...props,
      // Компоненты
      searchChat: new SearchChat({}),
      chats: chatsData.map(
        (chatData) =>
          new ChatItem({
            ...chatData,
            events: {
              click: () => {
                if (props.onChatClick) {
                  props.onChatClick(chatData.id);
                }
              },
            },
          })
      ),
      isSearchShown: !props.isSearchHidden,
    });
  }

  protected render(): string {
    return chatListTemplate;
  }
}
