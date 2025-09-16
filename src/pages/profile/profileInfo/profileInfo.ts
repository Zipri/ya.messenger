import './profileInfo.scss';

import profileInfoTemplate from './profileInfo.hbs?raw';
import { Block } from '../../../core';
import { InputBlock } from '../../../components';

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
    super({
      profileState: 'view',
      avatar:
        'https://pic.rutubelist.ru/user/74/93/7493abf139502d19ca81b0457a2ef0cd.jpg',
      name: 'Seroshtan',
      email: 'seroshtan@gmail.com',
      ...props,

      // Дочерние Input компоненты
      emailInput: new InputBlock({
        id: 'email',
        name: 'email',
        label: 'Почта',
        value: 'ivanivanov@yandex.ru',
        disabled: props.profileState === 'view',
      }),

      loginInput: new InputBlock({
        id: 'login',
        name: 'login',
        label: 'Логин',
        value: 'ivanivanov',
        disabled: props.profileState === 'view',
      }),

      firstNameInput: new InputBlock({
        id: 'first_name',
        name: 'first_name',
        label: 'Имя',
        value: 'Иван',
        disabled: props.profileState === 'view',
      }),

      secondNameInput: new InputBlock({
        id: 'second_name',
        name: 'second_name',
        label: 'Фамилия',
        value: 'Иванов',
        disabled: props.profileState === 'view',
      }),

      phoneInput: new InputBlock({
        id: 'phone',
        name: 'phone',
        label: 'Телефон',
        value: '+7 (999) 999-99-99',
        disabled: props.profileState === 'view',
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

  protected render(): string {
    return profileInfoTemplate;
  }

  protected componentDidMount(): void {
    this.setProps({
      events: {
        click: this._handleButtonClick,
      },
    });
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
    }
  };

  private _updateInputsState(state: ProfileState): void {
    const disabled = state === 'view';

    (this.children.emailInput as InputBlock).setProps({ disabled });
    (this.children.loginInput as InputBlock).setProps({ disabled });
    (this.children.firstNameInput as InputBlock).setProps({ disabled });
    (this.children.secondNameInput as InputBlock).setProps({ disabled });
    (this.children.phoneInput as InputBlock).setProps({ disabled });
  }
}
