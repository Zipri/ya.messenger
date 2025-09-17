import './dialog.scss';

import { FormBlock, InputBlock } from '../../../components';

import { Message } from './message/message';
import dialogTemplate from './dialog.hbs?raw';
import { messages } from './mock';
import { Block } from '../../../core';

interface DialogProps {}

export class Dialog extends Block<DialogProps & Record<string, any>> {
  constructor(props: DialogProps) {
    super({
      ...props,
      userAvatar:
        'https://images.steamusercontent.com/ugc/2052004474097085207/12B44815F2A65699D34584DA2071A26BE23692F9/?imw=512&amp;imh=395&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true',
      userName: 'John Doe',
      userEmail: 'john.doe@example.com',
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
          console.log('Message form data:', values);
        },
      }),
      messages: [],
    });

    const messageItems = messages.map(
      (message) =>
        new Message({
          message: message,
        })
    );

    this.lists.messages = messageItems;
  }

  render(): string {
    return dialogTemplate;
  }

  // FIXME SKV (!) почему работает?
  componentDidMount(): void {
    this._scrollToBottom();
    const messageForm = this.children.messageForm as FormBlock | undefined;
    const submitButton = this.element?.querySelector(
      '#message-submit'
    ) as HTMLElement | null;

    if (messageForm && submitButton) {
      messageForm.setSubmitTrigger(submitButton);
    }
  }

  // FIXME SKV (!) не работает
  private _scrollToBottom(): void {
    return;
    // // 1. Получаем корневой элемент нашего компонента Dialog
    // const dialogElement = this.getContent();
    // if (!dialogElement) return;

    // // 2. Ищем контейнер для сообщений ВНУТРИ нашего компонента
    // const container = dialogElement.querySelector(
    //   '.dialog__messages'
    // ) as HTMLElement | null;

    // if (!container) return; // Если не нашли, выходим

    // const scroll = () => {
    //   container.scrollTop = container.scrollHeight;
    // };

    // // После рендера и после следующего тика, когда браузер дорисует высоты
    // requestAnimationFrame(() => {
    //   scroll();
    //   requestAnimationFrame(scroll);
    // });

    // // Доскролл при догрузке изображений
    // const images = container.querySelectorAll('img');
    // images.forEach((img) => {
    //   if (img.complete) return;
    //   img.addEventListener('load', scroll, { once: true });
    //   img.addEventListener('error', scroll, { once: true });
    // });

    // // Если контейнер растянется (перепоток/ресайз), доскроллим
    // const ro = new ResizeObserver(() => scroll());
    // ro.observe(container);
  }
}
