import './input.scss';
import inputTemplate from './input.hbs?raw';
import { Block } from '../../core';

interface InputProps {
  id: string;
  name: string;
  label?: string;
  type?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

export class InputBlock extends Block<InputProps> {
  constructor(props: InputProps) {
    super(props);
  }

  protected render(): string {
    return inputTemplate;
  }
}
