export type TEventName = string;

export interface IEventBus {
  subscribe(eventName: TEventName, callback: Function): void;
  unsubscribe(eventName: TEventName, callback: Function): void;
  emit(eventName: TEventName, ...args: any[]): void;
  hasListeners(eventName: TEventName): boolean;
  getListenerCount(eventName: TEventName): number;
  removeAllListeners(eventName?: TEventName): void;
  once(eventName: TEventName, callback: Function): void;
}
