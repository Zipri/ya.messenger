import './register.scss';


import { Block, type TBlockProps } from '@controllers';
import router from '@controllers/router/router';
import { BASE_URLS } from '@models';

import { FormBlock, InputBlock } from '../../components';

import registerTemplate from './register.hbs?raw';

type RegisterPageProps = TBlockProps;

export class RegisterPage extends Block<RegisterPageProps> {
  constructor(props: RegisterPageProps) {
    super({
      ...props,
      BASE_URLS,
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
          if (values.password !== values.repeat_password) {
            alert('Пароли не совпадают');
          } else {
            window.APP.store?.user.register(
              {
                login: values.login,
                password: values.password,
                email: values.email,
                phone: values.phone,
                first_name: values.first_name,
                second_name: values.second_name,
              },
              () => {
                router.go(BASE_URLS.chat);
              }
            );
          }
        },
      }),
    });
  }

  render() {
    return registerTemplate;
  }
}
