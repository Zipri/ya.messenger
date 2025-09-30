import './chatList.scss';
import { ChatItem } from './chatItem/chatItem';
import chatListTemplate from './chatList.hbs?raw';
import { SearchChat } from './searchChat/searchChat';
import { Block, type TBlockProps } from '@controllers';
import { getMockChatItems } from 'ui/pages/chat/mock';
import type { TChatData } from './chatItem/types';
import router from '@controllers/router/router';
import { BASE_URLS } from '@models';

interface ChatListProps {
  onChatClick?: (chatId: string) => void;
}

export class ChatList extends Block<ChatListProps & TBlockProps> {
  constructor(props: ChatListProps) {
    super({
      ...props,
      isSearchShown: true,
      searchChat: new SearchChat({
        onClickProfile: () => {
          router.go(BASE_URLS.profile);
          this.props.isSearchShown = false;
        },
      }),
      chats: [], // Передаем пустой массив
    });

    const chatsData: TChatData[] = getMockChatItems();
    const chatItems = chatsData.map(
      (chatData) =>
        new ChatItem({
          ...chatData,
          events: {
            click: () => {
              if (this.props.onChatClick) {
                this.props.onChatClick(chatData.id);
                router.go(`${BASE_URLS.chat}/${chatData.id}`);
                this.props.isSearchShown = true;
              }
            },
          },
        })
    );

    this.lists.chats = chatItems;
  }

  protected componentDidMount(): void {
    if (router.getCurrentRoute() === BASE_URLS.chat) {
      this.props.isSearchShown = true;
    }
  }

  protected render(): string {
    return chatListTemplate;
  }
}
