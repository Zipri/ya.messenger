import './error.scss';
import { compile } from 'handlebars';

import errorTemplate from './error.hbs?raw';

export class ErrorPage {
  private template = compile(errorTemplate);

  render(errorCode: string, errorMessage: string): string {
    return this.template({ errorCode, errorMessage });
  }
}
