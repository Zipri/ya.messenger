import './profileInfo.scss';

import profileInfoTemplate from './profileInfo.hbs?raw';
import { Button, FormBlock, InputBlock } from '@ui-components';
import { Block, type TBlockProps } from '@controllers';
import router from '@controllers/router/router';
import type { TEditProfileProps } from '@models/types';

export const BASE_RESOURCES_URL = 'https://ya-praktikum.tech/api/v2/resources';
type ProfileState = 'view' | 'edit' | 'edit-password';

interface ProfileInfoProps {
  profileState?: ProfileState;
  avatar?: string;
  name?: string;
  email?: string;
}

export class ProfileInfoBlock extends Block<ProfileInfoProps & TBlockProps> {
  constructor(props: ProfileInfoProps = {}) {
    const emailInput = new InputBlock({
      id: 'email',
      name: 'email',
      label: 'Почта',
      validation: ['required', 'email'],
      disabled: true,
    });

    const loginInput = new InputBlock({
      id: 'login',
      name: 'login',
      label: 'Логин',
      validation: ['required', 'login'],
      disabled: true,
    });

    const firstNameInput = new InputBlock({
      id: 'first_name',
      name: 'first_name',
      label: 'Имя',
      validation: ['required', 'name'],
      disabled: true,
    });

    const secondNameInput = new InputBlock({
      id: 'second_name',
      name: 'second_name',
      label: 'Фамилия',
      validation: ['required', 'name'],
      disabled: true,
    });

    const phoneInput = new InputBlock({
      id: 'phone',
      name: 'phone',
      label: 'Телефон',
      validation: ['required', 'phone'],
      disabled: true,
    });

    const oldPasswordInput = new InputBlock({
      id: 'old_password',
      name: 'old_password',
      label: 'Старый пароль',
      type: 'password',
      validation: ['required', 'password'],
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
      onSubmit: async (values) => {
        const isSuccess = await window.APP.store?.user.editProfile(
          values as TEditProfileProps
        );
        if (isSuccess) {
          this._setProfileState('view');
        }
      },
    });

    const passwordForm = new FormBlock({
      // можно задать триггер кнопки, если он уже в DOM: '#password-save'
      submitTrigger: '#password-save',
      fields: [oldPasswordInput, passwordInput, repeatPasswordInput],
      onSubmit: async (_values) => {
        const values = _values as {
          old_password: string;
          password: string;
          repeat_password: string;
        };

        if (values.password !== values.repeat_password) {
          this.children.repeatPasswordInput.setProps({
            error: 'Пароли не совпадают',
          });
          return;
        }

        const isSuccess = await window.APP.store?.user.editPassword(values);
        if (isSuccess) {
          this._resetPasswordInputs();
          this._setProfileState('view');
        }
      },
    });

    super({
      profileState: 'view',
      ...props,
      // компоненты
      backButton: new Button({
        id: 'back-button',
        text: 'Назад',
        styleClasses: 'profileInfo__header__button',
        onClick: () => {
          router.go('/chat');
        },
      }),
      cancelButton: new Button({
        id: 'cancel-button',
        text: 'Отмена',
        styleClasses: 'button_dark',
        onClick: () => {
          this._setProfileState('view');
          this._setUserInputsState();
          this._resetPasswordInputs();
        },
      }),
      logoutButton: new Button({
        id: 'logout-button',
        text: 'Выйти',
        styleClasses: 'button_dark',
        onClick: () => {
          window.APP.store?.user.logout(() => {
            router.go('/login');
          });
        },
      }),
      avatarChangeButton: new Button({
        id: 'avatat-change-button',
        text: 'Изменить аватар',
        styleClasses: 'button_main',
        onClick: async () => {
          const file = await this._handleFileUpload();
          if (file) {
            const isSuccess = await window.APP.store?.user.editAvatar(file);
            if (isSuccess) {
              this._setProfileState('view');
              this._setUserInputsState();
            }
          }
        },
      }),
      // инпуты
      emailInput,
      loginInput,
      firstNameInput,
      secondNameInput,
      phoneInput,
      passwordInput,
      repeatPasswordInput,
      oldPasswordInput,

      // формы
      profileForm,
      passwordForm,
    });
  }

  protected render(): string {
    return profileInfoTemplate;
  }

  protected componentDidMount(): void {
    this._setUserInputsState();
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

      this._setProfileState(newState);
      // при смене состояния разметка может меняться — перевяжем триггеры
      queueMicrotask(() => this._bindSubmitTriggers());
    }
  };

  private _setProfileState(state: ProfileState): void {
    this.setProps({
      profileState: state,
    });
    this._disableInputs(state);
  }

  private _setUserInputsState(): void {
    const user = window.APP.store?.user.currentUser;

    if (user) {
      if (user.avatar) {
        this.setProps({
          avatar: `${BASE_RESOURCES_URL}${user.avatar}`,
        });
      }
      // Сначала очищаем значения, чтобы гарантировать срабатывание componentDidUpdate
      this.children.emailInput.setProps({ value: '' });
      this.children.loginInput.setProps({ value: '' });
      this.children.firstNameInput.setProps({ value: '' });
      this.children.secondNameInput.setProps({ value: '' });
      this.children.phoneInput.setProps({ value: '' });

      // Затем устанавливаем правильные значения
      queueMicrotask(() => {
        this.children.emailInput.setProps({ value: user.email });
        this.children.loginInput.setProps({ value: user.login });
        this.children.firstNameInput.setProps({ value: user.first_name });
        this.children.secondNameInput.setProps({ value: user.second_name });
        this.children.phoneInput.setProps({ value: user.phone });
      });
    }
  }

  private _resetPasswordInputs(): void {
    queueMicrotask(() => {
      this.children.oldPasswordInput.setProps({ value: '', error: '' });
      this.children.passwordInput.setProps({ value: '', error: '' });
      this.children.repeatPasswordInput.setProps({ value: '', error: '' });
    });
  }

  private _disableInputs(state: ProfileState): void {
    const disabled = state === 'view';

    this.children.emailInput.setProps({ disabled });
    this.children.loginInput.setProps({ disabled });
    this.children.firstNameInput.setProps({ disabled });
    this.children.secondNameInput.setProps({ disabled });
    this.children.phoneInput.setProps({ disabled });

    // пароли активны только в режиме смены пароля
    const pwdDisabled = state !== 'edit-password';
    this.children.passwordInput.setProps({
      disabled: pwdDisabled,
    });
    this.children.repeatPasswordInput.setProps({
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

  private _handleFileUpload(): Promise<File | null> {
    return new Promise((resolve) => {
      // Создаем скрытый input для выбора файла
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.style.display = 'none';

      // Обработчик выбора файла
      fileInput.addEventListener('change', (event) => {
        const target = event.target as HTMLInputElement;
        const file = target.files?.[0];

        // Удаляем временный input
        document.body.removeChild(fileInput);

        if (file) {
          resolve(file);
        } else {
          resolve(null);
        }
      });

      // Обработчик отмены выбора
      fileInput.addEventListener('cancel', () => {
        document.body.removeChild(fileInput);
        resolve(null);
      });

      // Добавляем input в DOM и программно кликаем по нему
      document.body.appendChild(fileInput);
      fileInput.click();
    });
  }
}
