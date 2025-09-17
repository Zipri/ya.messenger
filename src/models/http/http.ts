import type { TBlockProps } from '../../controllers/block/types';
import {
  ApiMethodEnum,
  type IHttpTransport,
  type TRequestOptions,
} from './types';

class HTTPTransport implements IHttpTransport {
  private static readonly TIMEOUT = 5000;

  get(url: string, options: TRequestOptions = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: ApiMethodEnum.GET });
  }

  post(url: string, options: TRequestOptions = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: ApiMethodEnum.POST });
  }

  put(url: string, options: TRequestOptions = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: ApiMethodEnum.PUT });
  }

  patch(url: string, options: TRequestOptions = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: ApiMethodEnum.PATCH });
  }

  delete(url: string, options: TRequestOptions = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: ApiMethodEnum.DELETE });
  }

  private request(
    url: string,
    options: TRequestOptions = {}
  ): Promise<XMLHttpRequest> {
    const {
      method = ApiMethodEnum.GET,
      data = {},
      headers = {},
      timeout = HTTPTransport.TIMEOUT,
    } = options;

    return new Promise((resolve, reject) => {
      // Для GET запросов добавляем query параметры к URL
      const requestUrl =
        method === ApiMethodEnum.GET
          ? this._buildUrlWithParams(url, data)
          : url;

      const xhr = new XMLHttpRequest();

      // Настройка запроса
      xhr.open(method, requestUrl);

      // Установка заголовков
      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      // Для POST/PUT/DELETE устанавливаем Content-Type по умолчанию
      if (method !== ApiMethodEnum.GET && !headers['Content-Type']) {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }

      // Таймаут
      xhr.timeout = timeout;

      // Обработчики событий
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr);
        } else {
          reject(new Error(`HTTP Error: ${xhr.status} ${xhr.statusText}`));
        }
      };

      xhr.onerror = () => {
        reject(new Error('Network Error'));
      };

      xhr.ontimeout = () => {
        reject(new Error(`Request timeout (${timeout}ms)`));
      };

      xhr.onabort = () => {
        reject(new Error('Request aborted'));
      };

      // Отправка запроса
      if (method === ApiMethodEnum.GET) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }

  /** Построение URL с query параметрами */
  private _buildUrlWithParams(url: string, params: TBlockProps): string {
    if (!params || Object.keys(params).length === 0) {
      return url;
    }

    const queryString = Object.keys(params)
      .map((key) => {
        const value = params[key];
        return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
      })
      .join('&');

    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}${queryString}`;
  }
}

export default HTTPTransport;
