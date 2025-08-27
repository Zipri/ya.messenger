import { compile } from 'handlebars';
import './chatList.scss';
import chatListTemplate from './chatList.hbs?raw';
import { ChatItem } from './chatItem/chatItem';
import type { TChatData } from './chatItem/types';

interface IChatListProps {
    chats: TChatData[];
    onChatClick?: (chatId: string) => void;
}

export class ChatList {
    private template = compile(chatListTemplate);
    private props: IChatListProps;
    private chatItems: ChatItem[] = [];

    constructor(props: IChatListProps) {
        this.props = props;
        this.createChatItems();
    }

    render(): string {
        const renderedChats = this.chatItems.map((item) => item.render());

        return this.template({
            chats: renderedChats,
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
