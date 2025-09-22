import './message.scss';

import messageTemplate from './message.hbs?raw';
import type { TMessage } from './types';
import { Block, type TBlockProps } from '@controllers';

interface MessageProps {
  message: TMessage;
}

export class Message extends Block<TBlockProps> {
  constructor(props: MessageProps) {
    super({
      ...props.message,
    });
  }

  render(): string {
    return messageTemplate;
  }
}
