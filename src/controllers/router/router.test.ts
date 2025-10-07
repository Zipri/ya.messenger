import Router from './router';

class MockBlock {
  props: Record<string, any>;
  _element: HTMLElement | null = null;

  constructor(props?: Record<string, any>) {
    this.props = props || {};
    this._element = document.createElement('div');
  }

  render() {
    // В реальном блоке здесь сложная логика, в моке — ничего
  }

  getContent() {
    return this._element;
  }

  show() {
    if (this._element) {
      this._element.style.display = 'block';
    }
  }

  hide() {
    if (this._element) {
      this._element.style.display = 'none';
    }
  }

  // Метод, который мы будем шпионить
  dispatchComponentDidMount() {}
  delete() {}
  remove() {}
}

describe('Router', () => {
  let router: typeof Router;
  let root: HTMLElement;
  let originalHistory: History;

  beforeAll(() => {
    // Сохраняем оригинальный history
    originalHistory = window.history;

    // Мокаем history API
    const mockHistory = {
      pushState: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      go: jest.fn(),
      replaceState: jest.fn(),
      state: null,
      length: 0,
      scrollRestoration: 'auto',
    } as unknown as History;

    Object.defineProperty(window, 'history', {
      writable: true,
      value: mockHistory,
    });
  });

  afterAll(() => {
    // Восстанавливаем оригинальный history
    Object.defineProperty(window, 'history', {
      writable: true,
      value: originalHistory,
    });
  });

  beforeEach(() => {
    root = document.createElement('div');
    root.id = 'app';
    document.body.appendChild(root);

    // Сбрасываем роутер перед каждым тестом
    router = Router;
    // any Необходимо для тестов
    (router as any).routes = [];
    // any Необходимо для тестов
    (router as any)._currentRoute = null;
    // Подменяем history на мок
    (router as any).history = window.history;

    (window.history.pushState as jest.Mock).mockClear();
    (window.history.back as jest.Mock).mockClear();
    (window.history.forward as jest.Mock).mockClear();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  //#region ADD ROUTE
  it('should add a route correctly', () => {
    router.use('/test', MockBlock);
    const route = (router as any)._getRoute('/test');
    expect(route).not.toBeNull();
    expect(route.getPathname()).toBe('/test');
  });
  //#endregion ADD ROUTE

  //#region NAVIGATE TO A ROUTE
  it('should navigate to a route', () => {
    const TestBlock = jest.fn(() => new MockBlock());
    router.use('/go-test', TestBlock as any);

    router.go('/go-test');

    expect(window.history.pushState).toHaveBeenCalledWith({}, '', '/go-test');
    expect(TestBlock).toHaveBeenCalled();
  });
  //#endregion NAVIGATE TO A ROUTE

  //#region DELETE AND RENDER
  it('should call delete on the old route and render on the new one', () => {
    // Создаем мок класса, чтобы отслеживать создание экземпляров
    const renderMock = jest.fn();
    const removeMock = jest.fn();

    class CustomMockBlock extends MockBlock {
      dispatchComponentDidMount() {
        renderMock();
        super.dispatchComponentDidMount();
      }
      remove() {
        removeMock();
        super.remove();
      }
    }

    router.use('/first', CustomMockBlock);
    router.use('/second', CustomMockBlock);

    // Первый переход
    router.go('/first');
    expect(renderMock).toHaveBeenCalledTimes(1);

    // Второй переход
    router.go('/second');

    // Проверяем, что у старого роута был вызван remove (через delete в route)
    expect(removeMock).toHaveBeenCalledTimes(1);

    // Проверяем, что у нового роута был вызван render
    expect(renderMock).toHaveBeenCalledTimes(2);
  });
  //#endregion DELETE AND RENDER

  //#region BACK AND FORWARD
  it('should handle back and forward', () => {
    router.back();
    expect(window.history.back).toHaveBeenCalled();

    router.forward();
    expect(window.history.forward).toHaveBeenCalled();
  });
  //#endregion BACK AND FORWARD
});
