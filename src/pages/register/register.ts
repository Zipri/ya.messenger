import './register.scss';
import { compile } from 'handlebars';

import { Input } from '../../components';

import registerTemplate from './register.hbs?raw';

export class RegisterPage {
    private template = compile(registerTemplate);
    private input = new Input();

    render() {
        const emailInput = this.input.render({
            id: 'email',
            name: 'email',
            label: 'Почта',
            type: 'text',
            value: 'ivanivanov@yandex.ru',
        });

        const loginInput = this.input.render({
            id: 'login',
            name: 'login',
            label: 'Логин',
            type: 'text',
            value: 'ivanivanov',
        });

        const firstNameInput = this.input.render({
            id: 'first_name',
            name: 'first_name',
            label: 'Имя',
            type: 'text',
            value: 'Иван',
        });

        const secondNameInput = this.input.render({
            id: 'second_name',
            name: 'second_name',
            label: 'Фамилия',
            type: 'text',
            value: 'Иванов',
        });

        const phoneInput = this.input.render({
            id: 'phone',
            name: 'phone',
            label: 'Телефон',
            type: 'text',
            value: '+7 (999) 999-99-99',
        });

        const passwordInput = this.input.render({
            id: 'password',
            name: 'password',
            label: 'Пароль',
            type: 'password',
            value: '••••••••••',
        });

        const repeatPasswordInput = this.input.render({
            id: 'repeat_password',
            name: 'repeat_password',
            label: 'Пароль (ещё раз)',
            type: 'password',
            value: '••••••••••',
        });

        return this.template({
            emailInput,
            loginInput,
            firstNameInput,
            secondNameInput,
            phoneInput,
            passwordInput,
            repeatPasswordInput,
        });
    }
}
