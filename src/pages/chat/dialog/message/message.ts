import './message.scss';
import { compile } from 'handlebars';
import messageTemplate from './message.hbs?raw';
import type { TMessage } from './types';

export class Message {
    private template = compile(messageTemplate);

    constructor() {}

    render(message: TMessage): string {
        return this.template({
            ...message,
        });
    }
}
