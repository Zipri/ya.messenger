import type { IHttpTransport } from 'models/http/types';
import type { TUrl } from 'models/types';

/** Абстрактный класс для унаследования от него различных api сервисов */
abstract class BaseApi {
  abstract baseUrl: TUrl;
  http!: IHttpTransport;

  constructor(http: IHttpTransport) {
    this.init(http);
  }

  init(instance: IHttpTransport) {
    this.http = instance;
  }
}

export default BaseApi;
