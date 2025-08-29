import './dialog.scss';
import { compile } from 'handlebars';
import dialogTemplate from './dialog.hbs?raw';
import { Input } from '../../../components';

export class Dialog {
    private template = compile(dialogTemplate);
    private input = new Input();

    constructor() {}

    render(): string {
        const messageInput = this.input.render({
            id: 'message',
            name: 'message',
            value: '',
        });

        return this.template({
            messageInput,

            userAvatar:
                'https://images.steamusercontent.com/ugc/2052004474097085207/12B44815F2A65699D34584DA2071A26BE23692F9/?imw=512&amp;imh=395&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true',
            userName: 'John Doe',
            userEmail: 'john.doe@example.com',
        });
    }
}
