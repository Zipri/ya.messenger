import './login.scss';

import { FormBlock, InputBlock } from '../../components';

import loginTemplate from './login.hbs?raw';
import { Block } from '../../core';

type LoginPageProps = Record<string, any>;

export class LoginPage extends Block<LoginPageProps> {
  constructor(props: LoginPageProps) {
    super({
      ...props,
      // Компоненты
      loginForm: new FormBlock({
        title: 'Вход',
        submitTrigger: '#login-submit',
        fields: [
          new InputBlock({
            id: 'login',
            name: 'login',
            label: 'Логин',
            type: 'text',
          }),
          new InputBlock({
            id: 'password',
            name: 'password',
            label: 'Пароль',
            type: 'password',
          }),
        ],
        onSubmit: (values) => {
          console.log('Login form data:', values);
        },
      }),
    });
  }

  render() {
    return loginTemplate;
  }
}
