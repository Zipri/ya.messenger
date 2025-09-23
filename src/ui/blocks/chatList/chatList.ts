import './chatList.scss';
import { ChatItem } from './chatItem/chatItem';
import chatListTemplate from './chatList.hbs?raw';
import { SearchChat } from './searchChat/searchChat';
import { Block, type TBlockProps } from '@controllers';
import { getMockChatItems } from 'ui/pages/chat/mock';
import type { TChatData } from './chatItem/types';
import router from '@controllers/router/router';

interface ChatListProps {
  onChatClick?: (chatId: string) => void;
}

export class ChatList extends Block<ChatListProps & TBlockProps> {
  constructor(props: ChatListProps) {
    // 1. Сначала инициализируем Block с пустым списком чатов.
    // Это позволяет нам получить доступ к `this` в конструкторе.
    super({
      ...props,
      isSearchShown: true,
      searchChat: new SearchChat({}),
      chats: [], // Передаем пустой массив
    });

    // 2. Теперь, когда `this` доступен, мы можем создать ChatItem'ы.
    // Их обработчики будут ссылаться на `this.props`, который всегда актуален.
    const chatsData: TChatData[] = getMockChatItems();
    const chatItems = chatsData.map(
      (chatData) =>
        new ChatItem({
          ...chatData,
          events: {
            click: () => {
              // 3. Используем `this.props`, а не `props` из аргументов конструктора.
              if (this.props.onChatClick) {
                this.props.onChatClick(chatData.id);
                this.props.isSearchShown = true;
                // router.go(`/dialog/${chatData.id}`);
                router.go(`/chat`);
              }
            },
          },
        })
    );

    // 4. Обновляем `lists` нашего компонента. Proxy в `Block` отследит это
    // изменение и вызовет перерисовку с новым списком чатов.
    this.lists.chats = chatItems;
  }

  protected render(): string {
    return chatListTemplate;
  }
}
