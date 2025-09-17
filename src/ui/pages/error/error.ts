import './error.scss';

import errorTemplate from './error.hbs?raw';
import { Block } from '../../../controllers';

interface ErrorPageProps {
  errorCode: string;
  errorMessage: string;
}

export class ErrorPage extends Block<ErrorPageProps & Record<string, any>> {
  constructor(props: ErrorPageProps) {
    super({
      ...props,
    });
  }

  render(): string {
    return errorTemplate;
  }
}
