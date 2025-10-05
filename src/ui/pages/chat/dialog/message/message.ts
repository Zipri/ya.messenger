import './message.scss';

import { Block, type TBlockProps } from '@controllers';

import messageTemplate from './message.hbs?raw';
import type { TMessage } from './types';

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
