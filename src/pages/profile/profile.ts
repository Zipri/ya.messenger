import './profile.scss';
import { compile } from 'handlebars';
import chatTemplate from './profile.hbs?raw';
import { ChatList } from '../../blocks/chatList/chatList';
import { getMockChatItems } from './mock';
import { ProfileInfo } from './profileInfo/profileInfo';

export class ProfilePage {
    private template = compile(chatTemplate);
    private chatList: ChatList;
    private profileInfo: ProfileInfo;

    constructor() {
        this.chatList = new ChatList({
            chats: getMockChatItems(),
            onChatClick: () => {},
        });
        this.profileInfo = new ProfileInfo();
    }

    render(): string {
        return this.template({
            chatList: this.chatList.render(),
            profileInfo: this.profileInfo.render(),
        });
    }
}
