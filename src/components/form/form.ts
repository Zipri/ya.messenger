// src/components/form/form.ts
import './form.scss';
import template from './form.hbs?raw';
import { Block } from '../../core';

type FormValues = Record<string, string>;

type FormSubmitHandler = (values: FormValues, event: SubmitEvent) => void;

interface FormProps {
  title?: string;
  submitText?: string;
  fields?: any[]; // массив дочерних блоков (например, InputBlock)
  /** Селектор или сам элемент */
  submitTrigger?: string | HTMLElement;
  onSubmit?: FormSubmitHandler;
  attr?: Record<string, string>;
  events?: Record<string, (e: Event) => void>;
}

export class FormBlock extends Block<FormProps> {
  private _externalEl?: HTMLElement;
  private _externalHandler?: (e: Event) => void;

  get externalEl(): HTMLElement | null {
    return this._externalEl ?? null;
  }

  get externalHandler(): ((e: Event) => void) | null {
    return this._externalHandler ?? null;
  }

  constructor(props: FormProps) {
    super(props);
  }

  public submit(): void {
    const formEl = this.element as HTMLFormElement | null;
    if (!formEl) return;

    // Проверяем поддержку современного API
    const canRequestSubmit = typeof formEl.requestSubmit === 'function';

    // FIXME SKV Может просто вызывать formEl.requestSubmit()?
    if (canRequestSubmit) {
      // Современный способ: вызывает событие submit с валидацией
      formEl.requestSubmit();
    } else {
      // Старый способ: создаем событие submit
      const evt = new Event('submit', { bubbles: true, cancelable: true });
      formEl.dispatchEvent(evt);
    }
  }

  protected componentDidMount(): void {
    const formEl = this.element as HTMLFormElement | null;
    if (!formEl) return;

    formEl.addEventListener('submit', (event) => {
      event.preventDefault();

      const inputs = formEl.querySelectorAll<
        HTMLInputElement | HTMLTextAreaElement
      >('input, textarea');
      inputs.forEach((el) =>
        el.dispatchEvent(new Event('blur', { bubbles: true }))
      );

      const hasInvalid = Array.from(inputs).some(
        (el) => el.dataset.valid === 'false'
      );
      // не отправляем, пока ошибки не исправлены
      if (hasInvalid) return;

      const values: FormValues = {};
      const fields = formEl.querySelectorAll<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >('input, textarea, select');

      fields.forEach((field) => {
        if (field.name) values[field.name] = field.value ?? '';
      });

      this.props.onSubmit?.(values, event as SubmitEvent);
    });

    // Привязка внешней кнопки
    const trigger = this.props.submitTrigger;
    if (trigger) {
      // Ищем кнопку по селектору или передаем сам элемент
      const submitElement =
        typeof trigger === 'string'
          ? (document.querySelector(trigger) as HTMLElement | null)
          : trigger;

      if (submitElement) {
        const handler = (e: Event) => {
          e.preventDefault();
          e.stopPropagation();
          this.submit();
        };

        submitElement.addEventListener('click', handler);
        this._externalEl = submitElement;
        this._externalHandler = handler;
      }
    }
  }

  public remove(): void {
    // Очищаем внешний обработчик
    if (this._externalEl && this._externalHandler) {
      this._externalEl.removeEventListener('click', this._externalHandler);
      this._externalEl = undefined;
      this._externalHandler = undefined;
    }

    // Вызываем родительский метод для очистки остального
    super.remove();
  }

  protected render(): string {
    return template;
  }
}
