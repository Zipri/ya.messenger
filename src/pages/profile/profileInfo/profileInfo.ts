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
            value: 'ivanivanov@yandex.ru',
            disabled: true,
        });

        const loginInput = this.input.render({
            id: 'login',
            name: 'login',
            label: 'Логин',
            value: 'ivanivanov',
            disabled: true,
        });

        const firstNameInput = this.input.render({
            id: 'first_name',
            name: 'first_name',
            label: 'Имя',
            value: 'Иван',
            disabled: true,
        });

        const secondNameInput = this.input.render({
            id: 'second_name',
            name: 'second_name',
            label: 'Фамилия',
            value: 'Иванов',
            disabled: true,
        });

        const phoneInput = this.input.render({
            id: 'phone',
            name: 'phone',
            label: 'Телефон',
            value: '+7 (999) 999-99-99',
            disabled: true,
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
