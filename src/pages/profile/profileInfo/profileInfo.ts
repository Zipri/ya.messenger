import './profileInfo.scss';
import { compile } from 'handlebars';

import { Input } from '../../../components/input/input';

import profileInfoTemplate from './profileInfo.hbs?raw';

export class ProfileInfo {
    private template = compile(profileInfoTemplate);
    private input = new Input();
    private profileState: 'view' | 'edit' | 'edit-password' = 'view';

    constructor() {
        this.initEventListeners();
    }

    /** Простая реализация переключения состояния ProfileInfo */
    private initEventListeners() {
        // Слушаем клики по всему документу
        document.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;

            // Проверяем, что кликнули по кнопке с нужным атрибутом
            if (
                target.tagName === 'BUTTON' &&
                target.hasAttribute('data-profile-info')
            ) {
                const profileState = target.getAttribute(
                    'data-profile-info'
                ) as 'view' | 'edit' | 'edit-password';
                this.profileState = profileState;
                // Уведомляем родительский компонент о необходимости перерисовки
                const event = new CustomEvent('profileStateChanged');
                document.dispatchEvent(event);
            }
        });
    }

    render(): string {
        const emailInput = this.input.render({
            id: 'email',
            name: 'email',
            label: 'Почта',
            value: 'ivanivanov@yandex.ru',
            disabled: this.profileState === 'view',
        });

        const loginInput = this.input.render({
            id: 'login',
            name: 'login',
            label: 'Логин',
            value: 'ivanivanov',
            disabled: this.profileState === 'view',
        });

        const firstNameInput = this.input.render({
            id: 'first_name',
            name: 'first_name',
            label: 'Имя',
            value: 'Иван',
            disabled: this.profileState === 'view',
        });

        const secondNameInput = this.input.render({
            id: 'second_name',
            name: 'second_name',
            label: 'Фамилия',
            value: 'Иванов',
            disabled: this.profileState === 'view',
        });

        const phoneInput = this.input.render({
            id: 'phone',
            name: 'phone',
            label: 'Телефон',
            value: '+7 (999) 999-99-99',
            disabled: this.profileState === 'view',
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

            avatar: 'https://pic.rutubelist.ru/user/74/93/7493abf139502d19ca81b0457a2ef0cd.jpg',
            name: 'Seroshtan',
            email: 'seroshtan@gmail.com',

            isView: this.profileState === 'view',
            isEdit: this.profileState === 'edit',
            isEditPassword: this.profileState === 'edit-password',
        });
    }
}
