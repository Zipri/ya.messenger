import './profileInfo.scss';
import { compile } from 'handlebars';
import profileInfoTemplate from './profileInfo.hbs?raw';
import { Input } from '../../../components/input/input';

export class ProfileInfo {
    private template = compile(profileInfoTemplate);
    private input = new Input();

    constructor() {}

    render(): string {
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

        return this.template({
            emailInput,
            loginInput,
            firstNameInput,
            secondNameInput,
            phoneInput,
            avatar: 'https://pic.rutubelist.ru/user/74/93/7493abf139502d19ca81b0457a2ef0cd.jpg',
            name: 'Seroshtan',
            email: 'seroshtan@gmail.com',
        });
    }
}
