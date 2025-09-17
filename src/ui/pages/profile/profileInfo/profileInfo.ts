import './profileInfo.scss';

import profileInfoTemplate from './profileInfo.hbs?raw';
import { FormBlock, InputBlock } from '../../../components';
import { Block } from '../../../../core';

type ProfileState = 'view' | 'edit' | 'edit-password';

interface ProfileInfoProps {
  profileState?: ProfileState;
  avatar?: string;
  name?: string;
  email?: string;
}

export class ProfileInfoBlock extends Block<
  ProfileInfoProps & Record<string, any>
> {
  constructor(props: ProfileInfoProps = {}) {
    const emailInput = new InputBlock({
      id: 'email',
      name: 'email',
      label: 'Почта',
      value: 'ivanivanov@yandex.ru',
      validation: ['required', 'email'],
      disabled: true,
    });

    const loginInput = new InputBlock({
      id: 'login',
      name: 'login',
      label: 'Логин',
      value: 'ivanivanov',
      validation: ['required', 'login'],
      disabled: true,
    });

    const firstNameInput = new InputBlock({
      id: 'first_name',
      name: 'first_name',
      label: 'Имя',
      value: 'Иван',
      validation: ['required', 'name'],
      disabled: true,
    });

    const secondNameInput = new InputBlock({
      id: 'second_name',
      name: 'second_name',
      label: 'Фамилия',
      value: 'Иванов',
      validation: ['required', 'name'],
      disabled: true,
    });

    const phoneInput = new InputBlock({
      id: 'phone',
      name: 'phone',
      label: 'Телефон',
      value: '+79999999999',
      validation: ['required', 'phone'],
      disabled: true,
    });

    const passwordInput = new InputBlock({
      id: 'password',
      name: 'password',
      label: 'Пароль',
      type: 'password',
      validation: ['required', 'password'],
    });

    const repeatPasswordInput = new InputBlock({
      id: 'repeat_password',
      name: 'repeat_password',
      label: 'Пароль (ещё раз)',
      type: 'password',
      validation: ['required', 'password'],
    });

    const profileForm = new FormBlock({
      // можно задать триггер кнопки, если он уже в DOM: '#profile-save'
      submitTrigger: '#profile-save',
      fields: [
        emailInput,
        loginInput,
        firstNameInput,
        secondNameInput,
        phoneInput,
      ],
      onSubmit: (values) => {
        console.log('Profile form data:', values);
        this.setProps({
          profileState: 'view',
        });
        this._updateInputsState('view');
      },
    });

    const passwordForm = new FormBlock({
      // можно задать триггер кнопки, если он уже в DOM: '#password-save'
      submitTrigger: '#password-save',
      fields: [passwordInput, repeatPasswordInput],
      onSubmit: (values) => {
        if (values.password !== values.repeat_password) {
          (this.children.repeatPasswordInput as InputBlock).setProps({
            error: 'Пароли не совпадают',
          });
          return;
        }

        console.log('Password form data:', values);
        this.setProps({
          profileState: 'view',
        });
        this._updateInputsState('view');
      },
    });

    super({
      profileState: 'view',
      avatar:
        'https://pic.rutubelist.ru/user/74/93/7493abf139502d19ca81b0457a2ef0cd.jpg',
      name: 'Seroshtan',
      email: 'seroshtan@gmail.com',
      ...props,

      // инпуты
      emailInput,
      loginInput,
      firstNameInput,
      secondNameInput,
      phoneInput,
      passwordInput,
      repeatPasswordInput,

      // формы
      profileForm,
      passwordForm,
    });
  }

  protected render(): string {
    return profileInfoTemplate;
  }

  protected componentDidMount(): void {
    this.setProps({
      events: {
        click: this._handleButtonClick,
      },
    });

    this._bindSubmitTriggers();
  }

  private _handleButtonClick = (event: Event): void => {
    const target = event.target as HTMLElement;

    if (
      target.tagName === 'BUTTON' &&
      target.hasAttribute('data-profile-info')
    ) {
      const newState = target.getAttribute('data-profile-info') as ProfileState;

      this.setProps({
        profileState: newState,
      });

      this._updateInputsState(newState);
      // при смене состояния разметка может меняться — перевяжем триггеры
      queueMicrotask(() => this._bindSubmitTriggers());
    }
  };

  private _updateInputsState(state: ProfileState): void {
    const disabled = state === 'view';

    (this.children.emailInput as InputBlock).setProps({ disabled });
    (this.children.loginInput as InputBlock).setProps({ disabled });
    (this.children.firstNameInput as InputBlock).setProps({ disabled });
    (this.children.secondNameInput as InputBlock).setProps({ disabled });
    (this.children.phoneInput as InputBlock).setProps({ disabled });

    // пароли активны только в режиме смены пароля
    const pwdDisabled = state !== 'edit-password';
    (this.children.passwordInput as InputBlock).setProps({
      disabled: pwdDisabled,
    });
    (this.children.repeatPasswordInput as InputBlock).setProps({
      disabled: pwdDisabled,
    });
  }

  private _bindSubmitTriggers(): void {
    const root = this.element;
    if (!root) return;

    const profileForm = this.children.profileForm as FormBlock | undefined;
    const passwordForm = this.children.passwordForm as FormBlock | undefined;

    const profileBtn = root.querySelector(
      '#profile-save'
    ) as HTMLElement | null;
    const passwordBtn = root.querySelector(
      '#password-save'
    ) as HTMLElement | null;

    if (profileForm && profileBtn) {
      profileForm.setSubmitTrigger(profileBtn);
    }
    if (passwordForm && passwordBtn) {
      passwordForm.setSubmitTrigger(passwordBtn);
    }
  }
}
