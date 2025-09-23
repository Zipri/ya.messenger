import { Block } from '@controllers';
import buttonTemplate from './button.hbs?raw';

interface ButtonProps {
  id: string;
  text: string;
  disabled?: boolean;
  onClick?: () => void;
  styleClasses?: string;
  attr?: Record<string, string>;
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    super({
      ...props,
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
