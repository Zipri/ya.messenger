import './error.scss';

import { Block, type TBlockProps } from '@controllers';
import { BASE_URLS } from '@models';

import errorTemplate from './error.hbs?raw';

interface ErrorPageProps {
  errorCode: string;
  errorMessage: string;
}

export class ErrorPage extends Block<ErrorPageProps & TBlockProps> {
  constructor(props: ErrorPageProps) {
    super({
      ...props,
      BASE_URLS,
    });
  }

  render(): string {
    return errorTemplate;
  }
}
