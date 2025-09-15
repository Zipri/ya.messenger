export enum ApiMethodEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export type TRequestOptions = {
  method?: ApiMethodEnum;
  data?: Record<string, any>;
  headers?: Record<string, string>;
  timeout?: number;
};

export type TQueryParams = Record<string, string | number | boolean>;

export type THttpTransportRequestOptions = Omit<TRequestOptions, 'method'>;

export interface IHttpTransport {
  get(
    url: string,
    options?: THttpTransportRequestOptions
  ): Promise<XMLHttpRequest>;
  post(
    url: string,
    options?: THttpTransportRequestOptions
  ): Promise<XMLHttpRequest>;
  put(
    url: string,
    options?: THttpTransportRequestOptions
  ): Promise<XMLHttpRequest>;
  patch(
    url: string,
    options?: THttpTransportRequestOptions
  ): Promise<XMLHttpRequest>;
  delete(
    url: string,
    options?: THttpTransportRequestOptions
  ): Promise<XMLHttpRequest>;
}
