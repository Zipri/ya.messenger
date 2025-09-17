import './message.scss';

import messageTemplate from './message.hbs?raw';
import type { TMessage } from './types';
import { Block } from '../../../../../controllers';

interface MessageProps {
  message: TMessage;
}

export class Message extends Block<Record<string, any>> {
  constructor(props: MessageProps) {
    super({
      ...props.message,
    });
  }

  render(): string {
    return messageTemplate;
  }
}
