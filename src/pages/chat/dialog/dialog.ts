import './dialog.scss';
import { compile } from 'handlebars';

import { Input } from '../../../components';

import dialogTemplate from './dialog.hbs?raw';
import { Message } from './message/message';
import { messages } from './mock';

export class Dialog {
  private template = compile(dialogTemplate);
  private input = new Input();
  private message = new Message();

  constructor() {}

  render(): string {
    const messageInput = this.input.render({
      id: 'message',
      name: 'message',
      label: '',
      placeholder: 'Введите сообщение...',
      value: '',
    });

    const messagesHtml: string[] = messages.map((message) =>
      this.message.render(message)
    );

    return this.template({
      messageInput,
      messagesHtml,
      userAvatar:
        'https://images.steamusercontent.com/ugc/2052004474097085207/12B44815F2A65699D34584DA2071A26BE23692F9/?imw=512&amp;imh=395&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true',
      userName: 'John Doe',
      userEmail: 'john.doe@example.com',
    });
  }

  scrollToBottom(): void {
    const container = document.querySelector(
      '.dialog__messages'
    ) as HTMLElement | null;
    if (!container) return;

    const scroll = () => {
      container.scrollTop = container.scrollHeight;
    };

    // После рендера и после следующего тика, когда браузер дорисует высоты
    requestAnimationFrame(() => {
      scroll();
      requestAnimationFrame(scroll);
    });

    // Доскролл при догрузке изображений
    const images = container.querySelectorAll('img');
    images.forEach((img) => {
      if (img.complete) return;
      img.addEventListener('load', scroll, { once: true });
      img.addEventListener('error', scroll, { once: true });
    });

    // Если контейнер растянется (перепоток/ресайз), доскроллим
    const ro = new ResizeObserver(() => scroll());
    ro.observe(container);
  }

  afterMount(): void {
    this.scrollToBottom();
  }
}
