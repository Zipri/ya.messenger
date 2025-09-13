import { v4 } from 'uuid';
import { EventBus } from '../eventBus';
import type { IBlock, TBlockEvents, TBlockProps } from './types';
import type { TID } from '../../types/types';

/**
 * Block - базовый класс для всех компонентов
 * Предоставляет жизненный цикл, управление состоянием и интеграцию с DOM
 */
abstract class Block<T extends TBlockProps = TBlockProps> implements IBlock<T> {
  private _id: TID;
  private _element: HTMLElement | null = null;

  protected props: T;
  protected eventBus: EventBus;

  protected static EVENTS: Record<string, TBlockEvents> = {
    INIT: 'init',
    FLOW_CDM: 'component-did-mount',
    FLOW_CDU: 'component-did-update',
    FLOW_RENDER: 'render',
  };

  constructor(props: T) {
    const eventBus = new EventBus();

    this._id = v4();
    this.props = this._makePropsProxy(props);
    this.eventBus = eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  /** Получение DOM элемента компонента */
  getContent(): HTMLElement | null {
    return this._element;
  }

  getID(): TID {
    return this._id;
  }

  /** Установка новых пропсов (вызывает ререндер) */
  setProps(nextProps: Partial<T>): void {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  }

  /** Показать компонент */
  show(): void {
    if (this._element) {
      this._element.style.display = 'block';
    }
  }

  /** Скрыть компонент */
  hide(): void {
    if (this._element) {
      this._element.style.display = 'none';
    }
  }

  /** Удалить компонент из DOM */
  remove(): void {
    if (this._element) {
      this._element.remove();
      this._element = null;
    }

    // Очищаем все события
    this.eventBus.removeAllListeners();
  }

  /** Монтирование компонента в DOM */
  dispatchComponentDidMount(): void {
    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  //#region protected methods
  /** Переопределяемый метод - вызывается после монтирования компонента в DOM */
  protected componentDidMount(): void {
    // Переопределяется в наследниках
  }

  /** Переопределяемый метод - проверяет нужно ли обновлять компонент */
  protected componentDidUpdate(oldProps: Partial<T>, newProps: T): boolean {
    // По умолчанию всегда обновляем
    return true;
  }

  /** Переопределяемый метод - возвращает HTML строку для рендера */
  protected abstract render(): string;
  //#endregion

  //#region private methods
  /** Регистрация событий жизненного цикла */
  private _registerEvents(eventBus: EventBus): void {
    eventBus.subscribe(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.subscribe(
      Block.EVENTS.FLOW_CDM,
      this._componentDidMount.bind(this)
    );
    eventBus.subscribe(
      Block.EVENTS.FLOW_CDU,
      this._componentDidUpdate.bind(this)
    );
    eventBus.subscribe(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  /** Инициализация компонента */
  private _init(): void {
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  /** Создание прокси для отслеживания изменений пропсов */
  private _makePropsProxy(props: T): T {
    return new Proxy(props, {
      set: (target, prop: string, value) => {
        const oldValue = target[prop as keyof T];

        target[prop as keyof T] = value;

        if (oldValue !== value) {
          this.eventBus.emit(Block.EVENTS.FLOW_CDU, { [prop]: value }, target);
        }
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа для удаления свойства');
      },
    });
  }

  /** Внутренний метод componentDidMount */
  private _componentDidMount(): void {
    this.componentDidMount();
  }

  /** Внутренний метод componentDidUpdate */
  private _componentDidUpdate(oldProps: Partial<T>, newProps: T): void {
    const shouldUpdate = this.componentDidUpdate(oldProps, newProps);

    if (shouldUpdate) {
      this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  /** Внутренний метод рендера */
  private _render(): void {
    const fragment = this._createDocumentElement(this.render());

    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element && newElement) {
      this._element.replaceWith(newElement);
    }

    this._element = newElement;
  }

  /** Создание DOM элемента из HTML строки */
  private _createDocumentElement(html: string): DocumentFragment {
    const template = document.createElement('template');
    template.innerHTML = html.trim();

    return template.content;
  }
  //#endregion
}

export default Block;
