import './chat.scss';
import { compile } from 'handlebars';
import chatTemplate from './chat.hbs?raw';
import { ChatList } from '../../blocks/chatList/chatList';
import { getMockChatItems } from './mock';
import { Dialog } from './dialog/dialog';

export class ChatPage {
    private template = compile(chatTemplate);
    private chatList: ChatList;
    private dialog: Dialog;

    constructor() {
        this.chatList = new ChatList({
            chats: getMockChatItems(),
            onChatClick: () => {},
        });
        this.dialog = new Dialog();
    }

    render(): string {
        return this.template({
            chatList: this.chatList.render(),
            dialog: this.dialog.render(),
        });
    }
}
