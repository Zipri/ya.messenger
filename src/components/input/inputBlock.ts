import './input.scss';
import inputTemplate from './input.hbs?raw';
import { Block } from '../../core';
import { validateValue, type RuleName } from '../../utils';

interface InputProps {
  id: string;
  name: string;
  label?: string;
  type?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  validation?: RuleName[];
  error?: string;
}

export class InputBlock extends Block<InputProps> {
  constructor(props: InputProps) {
    console.log('props', props);
    super(props);
  }

  protected addAttributes(): void {
    super.addAttributes();

    const root = this.element;
    const input = root?.querySelector('input') as HTMLInputElement | null;
    const errorEl = root?.querySelector('[data-error]') as HTMLElement | null;
    if (!input || !errorEl) return;

    // Инициализация
    if (typeof this.props.value === 'string') {
      input.value = this.props.value;
    }
    if (this.props.validation?.length) {
      input.dataset.validate = this.props.validation.join(',');
    }
    if (typeof this.props.error === 'string') {
      errorEl.textContent = this.props.error;
      input.dataset.valid = this.props.error ? 'false' : 'true';
    }

    // Валидация на blur
    input.onblur = () => {
      const { firstError, valid } = validateValue(
        input.value,
        this.props.validation || []
      );
      input.dataset.valid = valid ? 'true' : 'false';
      errorEl.textContent = firstError ?? '';
    };

    // Очистка ошибки при вводе
    input.oninput = () => {
      if (errorEl.textContent) {
        errorEl.textContent = '';
        input.dataset.valid = 'true';
      }
    };
  }

  protected componentDidUpdate(
    oldProps: Partial<InputProps>,
    newProps: InputProps
  ): boolean {
    // Мягкая синхронизация, если кто-то снаружи меняет value/error через setProps
    const root = this.element;
    const input = root?.querySelector('input') as HTMLInputElement | null;
    const errorEl = root?.querySelector('[data-error]') as HTMLElement | null;
    if (!input || !errorEl) return false;

    if (
      oldProps.value !== newProps.value &&
      typeof newProps.value === 'string'
    ) {
      input.value = newProps.value;
    }
    if (oldProps.error !== newProps.error) {
      errorEl.textContent = newProps.error ?? '';
      input.dataset.valid = newProps.error ? 'false' : 'true';
    }

    // Блокируем полный ререндер
    return false;
  }

  protected render(): string {
    return inputTemplate;
  }
}
