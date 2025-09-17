import './message.scss';

import messageTemplate from './message.hbs?raw';
import type { TMessage } from './types';
import { Block } from '../../../../../controllers';
import type { TBlockProps } from '../../../../../controllers/block/types';

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
