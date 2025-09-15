import { v4 } from 'uuid';
import { EventBus } from '../eventBus';
import type { IBlock, TBlockEvents, TBlockProps } from './types';
import type { TID } from '../../types/types';
import Handlebars from 'handlebars';

/** Block - базовый класс для всех компонентов
 * Предоставляет жизненный цикл, управление состоянием и интеграцию с DOM */
class Block<T extends TBlockProps = TBlockProps> implements IBlock<T> {
  private _id: TID;
  private _element: HTMLElement | null = null;

  protected props: TBlockProps;
  protected eventBus: EventBus;

  /** Массивы элементов */
  protected lists: Record<string, any[]>;
  /** Дочерние компоненты */
  protected children: Record<string, Block>;

  protected static EVENTS: Record<string, TBlockEvents> = {
    INIT: 'init',
    FLOW_CDM: 'component-did-mount',
    FLOW_CDU: 'component-did-update',
    FLOW_RENDER: 'render',
  };

  constructor(propsWithChildren: T = {} as T) {
    const { props, children, lists } =
      this._getChildrenPropsAndProps(propsWithChildren);
    const eventBus = new EventBus();

    this._id = v4();
    this.props = this._makePropsProxy({ ...props });
    this.children = children;
    this.lists = this._makePropsProxy({ ...lists });
    this.eventBus = eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
    console.log('constructor'); // FIXME SKV (!)
  }

  get element(): HTMLElement | null {
    return this._element;
  }

  get id(): TID {
    return this._id;
  }

  /** Получение DOM элемента компонента */
  getContent(): HTMLElement {
    if (!this._element) {
      throw new Error('Element is not created');
    }
    return this._element;
  }

  /** Установка новых пропсов (вызывает ререндер) */
  setProps = (nextProps: Partial<T>): void => {
    if (!nextProps) {
      return;
    }

    // FIXME SKV (!) что делает эта строка?
    Object.assign(this.props, nextProps);
  };

  setLists = (nextList: Record<string, any[]>): void => {
    if (!nextList) {
      return;
    }

    Object.assign(this.lists, nextList);
  };

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
  protected init(): void {
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  /** Переопределяемый метод - вызывается после монтирования компонента в DOM */
  protected componentDidMount(): void {
    console.log('componentDidMount'); // FIXME SKV (!)
  }

  /** Переопределяемый метод - проверяет нужно ли обновлять компонент */
  protected componentDidUpdate(oldProps: Partial<T>, newProps: T): boolean {
    return true;
  }

  /** Переопределяемый метод - возвращает HTML строку для рендера */
  protected render(): string {
    return '';
  }

  protected addAttributes(): void {
    const { attr = {} } = this.props;

    Object.entries(attr).forEach(([key, value]) => {
      if (this._element) {
        this._element.setAttribute(key, value as string);
      }
    });
  }

  protected setAttributes(attr: any): void {
    Object.entries(attr).forEach(([key, value]) => {
      if (this._element) {
        this._element.setAttribute(key, value as string);
      }
    });
  }
  //#endregion

  //#region private methods
  private _addEvents(): void {
    const { events = {} } = this.props;
    Object.keys(events).forEach((eventName) => {
      if (this._element) {
        this._element.addEventListener(eventName, events[eventName]);
      }
    });
  }

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
  private _makePropsProxy(props: TBlockProps): TBlockProps {
    return new Proxy(props, {
      get(target: any, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },

      set: (target, prop, value) => {
        const oldValue = { ...target };
        target[prop as keyof T] = value;
        // FIXME SKV (!) почему не используется oldValue
        // if (oldValue !== value) {
        // this.eventBus.emit(Block.EVENTS.FLOW_CDU, { [prop]: value }, target);
        this.eventBus.emit(Block.EVENTS.FLOW_CDU, oldValue, target);
        // }
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
    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  /** Внутренний метод componentDidUpdate */
  private _componentDidUpdate(oldProps: Partial<T>, newProps: T): void {
    const shouldUpdate = this.componentDidUpdate(oldProps, newProps);

    if (shouldUpdate) {
      this._render();
      // FIXME SKV (!) почему не используется eventBus.emit(Block.EVENTS.FLOW_RENDER);
      // this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  /** Внутренний метод рендера */
  private _render(): void {
    const propsAndStubs: TBlockProps = { ...this.props };
    const tmpId = v4();

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    Object.entries(this.lists).forEach(([key]) => {
      propsAndStubs[key] = `<div data-id="__l_${tmpId}"></div>`;
    });

    const fragment = this._createDocumentElement('template');
    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      if (stub) {
        stub.replaceWith(child.getContent());
      }
    });

    Object.entries(this.lists).forEach(([, child]) => {
      const listCont = this._createDocumentElement('template');
      child.forEach((item) => {
        if (item instanceof Block) {
          listCont.content.append(item.getContent());
        } else {
          listCont.content.append(`${item}`);
        }
      });
      const stub = fragment.content.querySelector(`[data-id="__l_${tmpId}"]`);
      if (stub) {
        stub.replaceWith(listCont.content);
      }
    });

    const newElement = fragment.content.firstElementChild as HTMLElement;
    if (this._element && newElement) {
      this._element.replaceWith(newElement);
    }
    this._element = newElement;
    this._addEvents();
    this.addAttributes();
  }

  /** Создание DOM элемента из HTML строки */
  private _createDocumentElement(html: string): HTMLTemplateElement {
    return document.createElement(html) as HTMLTemplateElement;
  }

  private _getChildrenPropsAndProps(propsAndChildren: TBlockProps): {
    children: Record<string, Block>;
    props: TBlockProps;
    lists: Record<string, any[]>;
  } {
    const children: Record<string, Block> = {};
    const props: TBlockProps = {};
    const lists: Record<string, any[]> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value)) {
        lists[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props, lists };
  }
  //#endregion
}

export default Block;
