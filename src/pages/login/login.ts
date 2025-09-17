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
            validation: ['required', 'login'],
          }),
          new InputBlock({
            id: 'password',
            name: 'password',
            label: 'Пароль',
            type: 'password',
            validation: ['required', 'password'],
          }),
        ],
        onSubmit: (values) => {
          console.log('Login form data:', values);

          // Создаем временную невидимую кнопку для навигации
          const tempButton = document.createElement('button');
          tempButton.setAttribute('data-page', 'chat');
          tempButton.style.position = 'absolute';
          tempButton.style.left = '-9999px';
          tempButton.style.opacity = '0';

          // Добавляем в DOM, кликаем, удаляем
          document.body.appendChild(tempButton);
          tempButton.click();
          document.body.removeChild(tempButton);
        },
      }),
    });
  }

  render() {
    return loginTemplate;
  }
}
