import './login.scss';

import { InputBlock } from '../../components';

import loginTemplate from './login.hbs?raw';
import { Block } from '../../core';

type LoginPageProps = Record<string, any>;

export class LoginPage extends Block<LoginPageProps> {
  constructor(props: LoginPageProps) {
    super({
      ...props,
      // Компоненты
      loginInput: new InputBlock({
        id: 'login',
        name: 'login',
        label: 'Логин',
        type: 'text',
        value: 'ivanivanov',
      }),
      passwordInput: new InputBlock({
        id: 'password',
        name: 'password',
        label: 'Пароль',
        type: 'password',
        value: '••••••••••',
      }),
    });
  }

  render() {
    return loginTemplate;
  }
}
