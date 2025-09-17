import './chatList.scss';
import { ChatItem } from './chatItem/chatItem';
import chatListTemplate from './chatList.hbs?raw';
import { SearchChat } from './searchChat/searchChat';
import type { TChatData } from './chatItem/types';
import { Block } from '../../../controllers';
import { getMockChatItems } from '../../pages/chat/mock';

interface ChatListProps {
  isSearchHidden?: boolean;
  onChatClick?: (chatId: string) => void;
}

export class ChatList extends Block<ChatListProps & Record<string, any>> {
  constructor(props: ChatListProps) {
    // 1. Сначала инициализируем Block с пустым списком чатов.
    // Это позволяет нам получить доступ к `this` в конструкторе.
    super({
      ...props,
      searchChat: new SearchChat({}),
      chats: [], // Передаем пустой массив
      isSearchShown: !props.isSearchHidden,
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
