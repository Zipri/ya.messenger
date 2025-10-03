import './dialog.scss';

import { Message } from './message/message';
import dialogTemplate from './dialog.hbs?raw';
import { Block, type TBlockProps } from '@controllers';
import { Button, FormBlock, InputBlock } from '@ui-components';
import type { TMessage as TWebSocketMessage } from '@controllers/services/websocket';
import type { TMessage as TMessageUI } from './message/types';
import type { TChat } from '@models/types';
import { formatTime } from '@utils';
import { BASE_URLS } from '@models';
import { UserList } from './userList';

interface DialogProps {
  chatId?: string;
  chat?: TChat;
}

export class Dialog extends Block<DialogProps & TBlockProps> {
  private isConnected = false;

  constructor(props: DialogProps) {
    super({
      ...props,
      userAvatar: props.chat?.avatar || '',
      userName: props.chat?.title || 'Неизвестный чат',
      userEmail: '',
      BASE_URLS,
      // Компоненты
      messageForm: new FormBlock({
        fields: [
          new InputBlock({
            id: 'message',
            name: 'message',
            placeholder: 'Введите сообщение...',
            type: 'text',
            validation: ['message'],
          }),
        ],
        onSubmit: (values) => {
          this._handleMessageSubmit(values.message);
        },
      }),
      submitButton: new Button({
        id: 'message-submit',
        text: 'Отправить',
        styleClasses: 'dialog__input__button',
        content: `<img src="../../../../static/paper-plane.png" alt="send" />`,
      }),
      userList: new UserList(),
      messages: [],
    });

    console.log('Dialog-constructor:', {
      chatId: props.chatId,
      chat: props.chat,
    });
  }

  componentDidMount(): void {
    const messageForm = this.children.messageForm as FormBlock | undefined;
    const submitButton = this.element?.querySelector(
      '#message-submit'
    ) as HTMLElement | null;

    if (messageForm && submitButton) {
      messageForm.setSubmitTrigger(submitButton);
    }

    // Инициализируем чат только если он не создан без chatId
    if (this.props.chatId) {
      this._initializeChat();
    }
  }

  componentWillUnmount(): void {
    if (this.isConnected && window.APP.store) {
      window.APP.store.chats.disconnectFromChat();
      window.APP.store.chats.onMessagesUpdate = null;
      this.isConnected = false;
      console.info('Dialog-componentWillUnmount: Отключились от чата');
    }
  }

  /** Инициализация чата - подключение к WebSocket и загрузка сообщений */
  private async _initializeChat() {
    if (!this.props.chatId || !window.APP.store) {
      console.error('Не хватает данных для инициализации чата');
      return;
    }

    // Проверяем, не подключены ли мы уже к этому чату
    if (
      window.APP.store.chats.isWebSocketConnected &&
      window.APP.store.chats.activeChat?.id === this.props.chatId
    ) {
      console.info('Уже подключены к чату', this.props.chatId);
      this.isConnected = true;
      this._subscribeToMessages();
      return;
    }

    // Проверяем, не инициализируется ли уже этот чат другим экземпляром Dialog
    if (this.isConnected) {
      console.info('Dialog уже инициализирован для чата', this.props.chatId);
      return;
    }

    try {
      // Подключаемся к чату через WebSocket
      const connected = await window.APP.store.chats.connectToChat(
        this.props.chatId
      );

      if (connected) {
        this.isConnected = true;

        // Подписываемся на изменения сообщений
        this._subscribeToMessages();

        console.info('Чат успешно инициализирован');
      } else {
        console.error('Не удалось подключиться к чату');
      }
    } catch (error) {
      console.error('Ошибка инициализации чата:', error);
    }
  }

  /** Подписка на изменения сообщений в Store */
  private _subscribeToMessages() {
    if (!window.APP.store) return;

    // FIXME SKV (!) Нужен ли тут этот колбек если есть globalEventBus.subscribe
    // Устанавливаем callback для обновления UI при получении новых сообщений
    window.APP.store.chats.onMessagesUpdate = () => {
      this._updateMessages();
    };

    // Загружаем текущие сообщения
    this._updateMessages();
  }

  /** Обновление списка сообщений из Store */
  private _updateMessages() {
    if (!window.APP.store) return;

    const messages = window.APP.store.chats.activeChatMessages;
    const messageItems = messages.map((message: TWebSocketMessage) => {
      const uiMessage: TMessageUI = {
        id: String(message.id || ''),
        text: message.content || '',
        isOwn:
          String(message.user_id || '') ===
          String(window.APP.store?.user.currentUser?.id || ''),
        time: formatTime(message.time || ''),
      };

      return new Message({ message: uiMessage });
    });

    // Обновляем только списки, без setProps чтобы избежать цикла
    this.lists.messages = messageItems;
  }

  /** Обработка отправки сообщения */
  private _handleMessageSubmit(messageContent: string) {
    if (!this.isConnected || !window.APP.store) {
      console.error('Чат не подключен или Store недоступен');
      return;
    }

    const success = window.APP.store.chats.sendMessage(messageContent);

    if (success) {
      // Очищаем форму
      const messageForm = this.children.messageForm as FormBlock;
      if (
        messageForm &&
        'reset' in messageForm &&
        typeof messageForm.reset === 'function'
      ) {
        (messageForm as any).reset();
      } else {
        // Альтернативный способ очистки - найти input и очистить его
        const messageInput = this.element?.querySelector(
          '#message'
        ) as HTMLInputElement;
        if (messageInput) {
          messageInput.value = '';
        }
      }
      console.info('Сообщение отправлено:', messageContent);
    } else {
      console.error('Ошибка отправки сообщения');
    }
  }

  render(): string {
    return dialogTemplate;
  }
}
