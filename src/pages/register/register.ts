import './register.scss';

import { InputBlock } from '../../components';

import registerTemplate from './register.hbs?raw';
import { Block } from '../../core';

type RegisterPageProps = Record<string, any>;

export class RegisterPage extends Block<RegisterPageProps> {
  constructor(props: RegisterPageProps) {
    super({
      ...props,
      // Компоненты
      emailInput: new InputBlock({
        id: 'email',
        name: 'email',
        label: 'Почта',
        type: 'text',
        value: 'ivanivanov@yandex.ru',
      }),
      loginInput: new InputBlock({
        id: 'login',
        name: 'login',
        label: 'Логин',
        type: 'text',
        value: 'ivanivanov',
      }),
      firstNameInput: new InputBlock({
        id: 'first_name',
        name: 'first_name',
        label: 'Имя',
        type: 'text',
        value: 'Иван',
      }),
      secondNameInput: new InputBlock({
        id: 'second_name',
        name: 'second_name',
        label: 'Фамилия',
        type: 'text',
        value: 'Иванов',
      }),
      phoneInput: new InputBlock({
        id: 'phone',
        name: 'phone',
        label: 'Телефон',
        type: 'text',
        value: '+7 (999) 999-99-99',
      }),
      passwordInput: new InputBlock({
        id: 'password',
        name: 'password',
        label: 'Пароль',
        type: 'password',
        value: '••••••••••',
      }),
      repeatPasswordInput: new InputBlock({
        id: 'repeat_password',
        name: 'repeat_password',
        label: 'Пароль (ещё раз)',
        type: 'password',
        value: '••••••••••',
      }),
    });
  }

  render() {
    return registerTemplate;
  }
}
