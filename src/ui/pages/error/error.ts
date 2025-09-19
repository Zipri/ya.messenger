import './error.scss';

import errorTemplate from './error.hbs?raw';
import { Block } from '../../../controllers';
import type { TBlockProps } from '../../../controllers/block/types';

interface ErrorPageProps {
  errorCode: string;
  errorMessage: string;
}

export class ErrorPage extends Block<ErrorPageProps & TBlockProps> {
  constructor(props: ErrorPageProps) {
    super({
      ...props,
    });
  }

  render(): string {
    return errorTemplate;
  }
}
