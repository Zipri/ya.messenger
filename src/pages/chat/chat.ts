import './chat.scss';
import { compile } from 'handlebars';
import chatTemplate from './chat.hbs?raw';
import { ChatList } from '../../blocks/chatList/chatList';
import { getMockChatItems } from './mock';

export class ChatPage {
    private template = compile(chatTemplate);
    private chatList: ChatList;

    constructor() {
        this.chatList = new ChatList({
            chats: getMockChatItems(),
            onChatClick: () => {},
        });
    }

    render(): string {
        return this.template({
            chatList: this.chatList.render(),
        });
    }
}
