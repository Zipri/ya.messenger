import type { IEventBus, TEventName } from './types';

/** EventBus - система событий для связи между компонентами
 * Позволяет подписываться на события, генерировать их и отписываться */
class EventBus implements IEventBus {
  private listeners: Record<TEventName, Function[]> = {};

  subscribe(eventName: TEventName, callback: Function): void {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    this.listeners[eventName].push(callback);
  }

  unsubscribe(eventName: TEventName, callback: Function): void {
    if (!this.listeners[eventName]) {
      throw new Error(`No event: ${event}`);
    }

    this.listeners[eventName] = this.listeners[eventName].filter(
      (listener) => listener !== callback
    );

    // Если больше нет слушателей для этого события, удаляем ключ
    if (this.listeners[eventName].length === 0) {
      delete this.listeners[eventName];
    }
  }

  emit(eventName: TEventName, ...args: any[]): void {
    if (!this.listeners[eventName]) {
      throw new Error(`Событие "${eventName}" не имеет слушателей`);
    }

    // Проходим по всем слушателям и вызываем их
    this.listeners[eventName].forEach((listenerCallback) => {
      try {
        listenerCallback(...args);
      } catch (error) {
        console.error(`Ошибка в обработчике события "${eventName}":`, error);
      }
    });
  }

  /** Проверка наличия слушателей для события */
  hasListeners(eventName: TEventName): boolean {
    return !!this.listeners[eventName] && this.listeners[eventName].length > 0;
  }

  /** Получение количества слушателей для события */
  getListenerCount(eventName: TEventName): number {
    return this.listeners[eventName]?.length || 0;
  }

  /** Удаление всех слушателей для события или всех событий */
  removeAllListeners(eventName?: TEventName): void {
    if (eventName) {
      delete this.listeners[eventName];
    } else {
      this.listeners = {};
    }
  }

  /** Одноразовая подписка на событие (автоматически отписывается после первого вызова) */
  once(eventName: TEventName, callback: Function): void {
    const onceCallback = (...args: any[]) => {
      callback(...args);
      this.unsubscribe(eventName, onceCallback);
    };

    this.subscribe(eventName, onceCallback);
  }
}

export default EventBus;
