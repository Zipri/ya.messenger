import './register.scss';

import { FormBlock, InputBlock } from '../../components';

import registerTemplate from './register.hbs?raw';
import { Block } from '../../../controllers';
import { fakeNavigate } from '../../../utils';

type RegisterPageProps = Record<string, any>;

export class RegisterPage extends Block<RegisterPageProps> {
  constructor(props: RegisterPageProps) {
    super({
      ...props,
      // Компоненты
      registerForm: new FormBlock({
        submitTrigger: '#register-submit',
        fields: [
          new InputBlock({
            id: 'email',
            name: 'email',
            label: 'Почта',
            type: 'text',
            validation: ['required', 'email'],
          }),
          new InputBlock({
            id: 'login',
            name: 'login',
            label: 'Логин',
            type: 'text',
            validation: ['required', 'login'],
          }),
          new InputBlock({
            id: 'first_name',
            name: 'first_name',
            label: 'Имя',
            type: 'text',
            validation: ['required', 'name'],
          }),
          new InputBlock({
            id: 'second_name',
            name: 'second_name',
            label: 'Фамилия',
            type: 'text',
            validation: ['required', 'name'],
          }),
          new InputBlock({
            id: 'phone',
            name: 'phone',
            label: 'Телефон',
            type: 'text',
            validation: ['required', 'phone'],
          }),
          new InputBlock({
            id: 'password',
            name: 'password',
            label: 'Пароль',
            type: 'password',
            validation: ['required', 'password'],
          }),
          new InputBlock({
            id: 'repeat_password',
            name: 'repeat_password',
            label: 'Пароль (ещё раз)',
            type: 'password',
            validation: ['required', 'password'],
          }),
        ],
        onSubmit: (values) => {
          console.log('Register form data:', values);
          if (values.password !== values.repeat_password) {
            alert('Пароли не совпадают');
          } else {
            fakeNavigate('chat');
          }
        },
      }),
    });
  }

  render() {
    return registerTemplate;
  }
}
