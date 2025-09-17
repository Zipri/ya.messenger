import './dialog.scss';

import { Message } from './message/message';
import dialogTemplate from './dialog.hbs?raw';
import { messages } from './mock';
import { Block } from '../../../../controllers';
import { FormBlock, InputBlock } from '../../../components';
import type { TBlockProps } from '../../../../controllers/block/types';

interface DialogProps {}

export class Dialog extends Block<DialogProps & TBlockProps> {
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

  componentDidMount(): void {
    const messageForm = this.children.messageForm as FormBlock | undefined;
    const submitButton = this.element?.querySelector(
      '#message-submit'
    ) as HTMLElement | null;

    if (messageForm && submitButton) {
      messageForm.setSubmitTrigger(submitButton);
    }
  }
}
