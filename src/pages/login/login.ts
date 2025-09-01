import './login.scss';
import { compile } from 'handlebars';

import { Input } from '../../components';

import loginTemplate from './login.hbs?raw';

export class LoginPage {
    private template = compile(loginTemplate);
    private input = new Input();

    render() {
        const loginInput = this.input.render({
            id: 'login',
            name: 'login',
            label: 'Логин',
            type: 'text',
            value: 'ivanivanov',
        });

        const passwordInput = this.input.render({
            id: 'password',
            name: 'password',
            label: 'Пароль',
            type: 'password',
            value: '••••••••••',
        });

        return this.template({
            loginInput,
            passwordInput,
        });
    }
}
