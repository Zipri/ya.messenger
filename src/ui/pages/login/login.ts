import './login.scss';

import loginTemplate from './login.hbs?raw';
import { fakeNavigate } from '../../../utils';
import { Block } from '../../../controllers';
import { FormBlock } from '../../components/form/form';
import { InputBlock } from '../../components';
import type { TBlockProps } from '../../../controllers/block/types';

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
          console.log('Login form data:', values);
          fakeNavigate('chat');
        },
      }),
    });
  }

  render() {
    return loginTemplate;
  }
}
