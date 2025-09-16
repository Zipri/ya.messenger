import { compile } from 'handlebars';

import './chatList.scss';
import { ChatItem } from './chatItem/chatItem';
import chatListTemplate from './chatList.hbs?raw';
import { SearchChat } from './searchChat/searchChat';
import type { TChatData } from './chatItem/types';
import { getMockChatItems } from '../../pages/chat/mock';

interface IChatListProps {
  isSearchHidden?: boolean;
}

export class ChatList {
  private template = compile(chatListTemplate);
  private props: IChatListProps;
  private chatsData: TChatData[] = [];
  private chatItems: ChatItem[] = [];
  private searchChat: SearchChat;

  constructor(props: IChatListProps) {
    this.props = props;
    this.chatsData = getMockChatItems();
    this.createChatItems();
    this.searchChat = new SearchChat({
      onSearch: () => {},
    });
  }

  render(): string {
    const renderedChats = this.chatItems.map((item) => item.render());

    return this.template({
      searchChat: this.searchChat.render(),
      chats: renderedChats,
      isSearchShown: !this.props.isSearchHidden,
    });
  }

  private createChatItems(): void {
    this.chatItems = this.chatsData.map(
      (chatData) =>
        new ChatItem({
          data: chatData,
          onClick: () => {},
        })
    );
  }
}
