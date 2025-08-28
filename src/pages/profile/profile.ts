import './profile.scss';
import { compile } from 'handlebars';
import chatTemplate from './profile.hbs?raw';
import { ChatList } from '../../blocks/chatList/chatList';
import { getMockChatItems } from './mock';

export class ProfilePage {
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
