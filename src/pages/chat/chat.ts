import './chat.scss';
import { compile } from 'handlebars';
import chatTemplate from './chat.hbs?raw';

export class ChatPage {
    private template = compile(chatTemplate);

    render() {
        return this.template({});
    }
}
