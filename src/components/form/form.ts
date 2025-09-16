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
  onSubmit?: FormSubmitHandler;
  attr?: Record<string, string>;
  events?: Record<string, (e: Event) => void>;
}

export class FormBlock extends Block<FormProps> {
  constructor(props: FormProps) {
    super(props);
  }

  protected componentDidMount(): void {
    const formEl = this.element as HTMLFormElement | null;
    if (!formEl) return;

    formEl.addEventListener('submit', (event) => {
      event.preventDefault();

      const values: FormValues = {};
      const fields = formEl.querySelectorAll<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >('input, textarea, select');

      fields.forEach((field) => {
        if (field.name) values[field.name] = field.value ?? '';
      });

      this.props.onSubmit?.(values, event as SubmitEvent);
    });
  }

  protected render(): string {
    return template;
  }
}
