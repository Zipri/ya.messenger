import { Block } from '@controllers';
import type { TID } from '@models/types';

import buttonTemplate from './button.hbs?raw';

interface ButtonProps {
  id: TID;
  text: string;
  content?: string | HTMLElement;
  disabled?: boolean;
  onClick?: () => void;
  styleClasses?: string;
  attr?: Record<string, string>;
  type?: 'button' | 'submit' | 'reset';
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    const adaptedProps = {
      ...props,
      content: props.content ? props.content : undefined,
      text: props.content ? undefined : props.text,
      type: props.type ?? 'button',
    };
    super({
      ...adaptedProps,
      events: {
        click: props.onClick,
      },
    });
  }

  protected addAttributes(): void {
    super.addAttributes();
    const root = this.element;
    const button = root?.querySelector('button') as HTMLButtonElement | null;
    if (!button) return;
    button.disabled = this.props.disabled || false;
  }

  protected render(): string {
    return buttonTemplate;
  }
}
