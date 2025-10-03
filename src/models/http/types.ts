export enum ApiMethodEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export type TRequestOptions = {
  method?: ApiMethodEnum;
  // Могут передаваться различные атрибуты, в данном случае нет смысла конкретизировать
  data?: Record<string, any>;
  headers?: Record<string, string>;
  timeout?: number;
};

// Могут передаваться различные атрибуты, в данном случае нет смысла конкретизировать
export type TApiResponse<T = any> = {
  data: T;
  status: number;
  statusText: string;
};

export type TQueryParams = Record<string, string | number | boolean>;

export type THttpTransportRequestOptions = Omit<TRequestOptions, 'method'>;

export interface IHttpTransport {
  get(
    url: string,
    options?: THttpTransportRequestOptions
  ): Promise<TApiResponse>;
  post(
    url: string,
    options?: THttpTransportRequestOptions
  ): Promise<TApiResponse>;
  put(
    url: string,
    options?: THttpTransportRequestOptions
  ): Promise<TApiResponse>;
  patch(
    url: string,
    options?: THttpTransportRequestOptions
  ): Promise<TApiResponse>;
  delete(
    url: string,
    options?: THttpTransportRequestOptions
  ): Promise<TApiResponse>;
}
