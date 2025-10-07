import Block from './block';
import type { TBlockProps } from './types';

// Простой тестовый компонент, наследуемый от Block
class TestBlock extends Block {
  constructor(props: TBlockProps) {
    super(props);
  }

  // Переопределяем render, чтобы он возвращал простой HTML
  render() {
    return `<div>{{text}}</div>`;
  }
}

describe('Block component', () => {
  let block: TestBlock;
  const initialProps = { text: 'Hello' };

  beforeEach(() => {
    block = new TestBlock(initialProps);
  });

  //#region Создание
  it('should create a block with initial props', () => {
    // Проверяем, что props были установлены
    expect((block as any).props.text).toBe(initialProps.text);
  });
  //#endregion Создание

  //#region Первичный рендер
  it('should render the component after initialization', () => {
    // Шпионим за методом render
    const renderSpy = jest.spyOn(block as any, 'render');
    // Имитируем событие init, которое вызывает render
    block.eventBus.emit(Block['EVENTS'].INIT);
    // Проверяем, что render был вызван
    expect(renderSpy).toHaveBeenCalled();
    renderSpy.mockRestore();
  });
  //#endregion Первичный рендер

  //#region Обновление
  it('should update props and re-render', () => {
    const newText = 'World';
    const renderSpy = jest.spyOn(block as any, '_render');

    // Устанавливаем новые props
    block.setProps({ text: newText });

    // Проверяем, что props обновились
    expect((block as any).props.text).toBe(newText);
    // Проверяем, что был вызван re-render
    expect(renderSpy).toHaveBeenCalled();
    renderSpy.mockRestore();
  });
  //#endregion Обновление

  //#region Жизненный цикл
  it('should call componentDidMount when dispatchComponentDidMount is called', () => {
    const cdmSpy = jest.spyOn(block as any, 'componentDidMount');
    block.dispatchComponentDidMount();
    expect(cdmSpy).toHaveBeenCalled();
    cdmSpy.mockRestore();
  });
  //#endregion Жизненный цикл

  //#region Создание элемента
  it('should create a valid HTML element', () => {
    const element = block.getContent();
    expect(element).toBeInstanceOf(HTMLElement);
    expect(element.tagName).toBe('DIV');
    expect(element.textContent).toContain(initialProps.text);
  });
  //#endregion Создание элемента

  //#region События
  it('should add events to the element', () => {
    const mockFn = jest.fn();
    const propsWithEvent = {
      text: 'Click me',
      events: {
        click: mockFn,
      },
    };

    const blockWithEvent = new TestBlock(propsWithEvent);
    const element = blockWithEvent.getContent();

    // Симулируем клик
    element.click();

    // Проверяем, что обработчик был вызван
    expect(mockFn).toHaveBeenCalled();
  });
  //#endregion События

  //#region Видимость
  it('should show and hide the element', () => {
    const element = block.getContent();
    block.hide();
    expect(element.style.display).toBe('none');
    block.show();
    expect(element.style.display).toBe('block');
  });
  //#endregion Видимость
});
