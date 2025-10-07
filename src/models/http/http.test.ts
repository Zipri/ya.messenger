import { BASE_API_URL } from '@models/consts';
import HTTPTransport from './http';

// Глобальный мок для XMLHttpRequest
const mockXhr = {
  open: jest.fn(),
  send: jest.fn(),
  setRequestHeader: jest.fn(),
  readyState: 4,
  status: 200,
  responseText: JSON.stringify({ message: 'ok' }),
  onload: () => {},
  onerror: () => {},
  onabort: () => {},
  ontimeout: () => {},
};

// Применяем мок
global.XMLHttpRequest = Object.assign(
  jest.fn(() => mockXhr as unknown as XMLHttpRequest),
  {
    UNSENT: 0,
    OPENED: 1,
    HEADERS_RECEIVED: 2,
    LOADING: 3,
    DONE: 4,
  } as const
);

describe('HTTPTransport', () => {
  let http: HTTPTransport;

  beforeEach(() => {
    // Сбрасываем моки перед каждым тестом
    (global.XMLHttpRequest as unknown as jest.Mock).mockClear();
    mockXhr.open.mockClear();
    mockXhr.send.mockClear();
    mockXhr.setRequestHeader.mockClear();

    // Создаем новый экземпляр перед каждым тестом
    http = new HTTPTransport();
  });

  //#region GET
  it('should send a GET request correctly', async () => {
    const endpoint = '/test-get';
    const promise = http.get(endpoint);

    // Имитируем успешный ответ от сервера
    mockXhr.onload();

    const result = await promise;

    // Проверяем, что open был вызван с правильными параметрами
    expect(mockXhr.open).toHaveBeenCalledWith(
      'GET',
      `${BASE_API_URL}${endpoint}`
    );

    // Проверяем, что send был вызван
    expect(mockXhr.send).toHaveBeenCalled();

    // Проверяем, что данные ответа корректны
    expect(result.data).toEqual({ message: 'ok' });
  });
  //#endregion GET

  //#region POST
  it('should send a POST request with data correctly', async () => {
    const endpoint = '/test-post';
    const data = { id: '123', value: 'test' };
    const promise = http.post(endpoint, { data });

    // Имитируем успешный ответ
    mockXhr.onload();

    await promise;

    // Проверяем, что open был вызван с 'POST'
    expect(mockXhr.open).toHaveBeenCalledWith(
      'POST',
      `${BASE_API_URL}${endpoint}`
    );

    // Проверяем, что заголовок Content-Type установлен для JSON
    expect(mockXhr.setRequestHeader).toHaveBeenCalledWith(
      'Content-Type',
      'application/json'
    );

    // Проверяем, что send был вызван с преобразованными в строку данными
    expect(mockXhr.send).toHaveBeenCalledWith(JSON.stringify(data));
  });
  //#endregion POST

  //#region ERROR
  it('should handle request failure', async () => {
    const endpoint = '/test-error';
    const promise = http.get(endpoint);

    // Имитируем ошибку
    mockXhr.onerror();

    // Проверяем, что промис отклоняется
    await expect(promise).rejects.toThrow();
  });
  //#endregion ERROR
});
