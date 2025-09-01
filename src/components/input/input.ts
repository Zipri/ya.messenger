import { compile } from 'handlebars';

import './input.scss';
import inputTemplate from './input.hbs?raw';

interface InputProps {
    id: string;
    name: string;
    label?: string;
    type?: string;
    value?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
}

export class Input {
    private template = compile(inputTemplate);

    render(props: InputProps) {
        return this.template({
            type: 'text',
            ...props,
        });
    }
}
