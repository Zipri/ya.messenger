import './login.scss';

import loginTemplate from './login.hbs?raw';
import { Block, type TBlockProps } from '@controllers';
import { FormBlock, InputBlock } from '@ui-components';
import router from '@controllers/router/router';

type LoginPageProps = TBlockProps;

export class LoginPage extends Block<LoginPageProps> {
  constructor(props: LoginPageProps) {
    super({
      ...props,
      // Компоненты
      loginForm: new FormBlock({
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
          console.info('Login form data:', values);
          router.go('/chat');
        },
      }),
    });
  }

  render() {
    return loginTemplate;
  }
}
