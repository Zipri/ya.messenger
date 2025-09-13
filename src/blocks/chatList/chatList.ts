import { compile } from 'handlebars';

import './chatList.scss';
import { ChatItem } from './chatItem/chatItem';
import type { TChatData } from './chatItem/types';
import chatListTemplate from './chatList.hbs?raw';
import { SearchChat } from './searchChat/searchChat';

interface IChatListProps {
  chats: TChatData[];
  isSearchHidden?: boolean;
  onChatClick?: (chatId: string) => void;
  onSearch?: (query: string) => void;
}

export class ChatList {
  private template = compile(chatListTemplate);
  private props: IChatListProps;
  private chatItems: ChatItem[] = [];
  private searchChat: SearchChat;

  constructor(props: IChatListProps) {
    this.props = props;
    this.createChatItems();
    this.searchChat = new SearchChat({
      onSearch: this.props.onSearch,
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
    this.chatItems = this.props.chats.map(
      (chatData) =>
        new ChatItem({
          data: chatData,
          onClick: this.props.onChatClick,
        })
    );
  }
}
