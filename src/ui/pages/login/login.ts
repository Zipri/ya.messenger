import './login.scss';

import { Block, type TBlockProps } from '@controllers';
import router from '@controllers/router/router';
import { BASE_URLS } from '@models';
import { Button, FormBlock, InputBlock } from '@ui-components';

import loginTemplate from './login.hbs?raw';

type LoginPageProps = TBlockProps;

export class LoginPage extends Block<LoginPageProps> {
  constructor(props: LoginPageProps) {
    super({
      ...props,
      BASE_URLS,
      // Компоненты
      loginForm: new FormBlock({
        submitButton: new Button({
          id: 'login-submit',
          type: 'submit',
          text: 'Войти',
          styleClasses: 'button_main',
        }),
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
          window.APP.store?.user.login(
            { login: values.login, password: values.password },
            () => {
              router.go(BASE_URLS.chat);
            }
          );
        },
      }),
    });
  }

  render() {
    return loginTemplate;
  }

  protected componentDidMount(): void {
    const isUserLoggedIn = !!window.APP.store?.user.currentUser;
    if (isUserLoggedIn) {
      router.go(BASE_URLS.chat);
    }
  }
}
