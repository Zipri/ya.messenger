import type { TID } from '@models/types';

// Локальные типы для WebSocket
type TMessageType = 'message' | 'get old' | 'user connected' | 'ping';

interface TMessage {
  id: TID;
  user_id: TID;
  chat_id: TID;
  type: string;
  time: string;
  content: string;
  file?: {
    id: TID;
    user_id: TID;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  };
}

interface TWebSocketMessage {
  content: string;
  type: TMessageType;
}

interface WebSocketEventHandlers {
  onOpen?: () => void;
  onMessage?: (message: TMessage | TMessage[]) => void;
  onUserConnected?: (userId: string) => void;
  onClose?: (event: CloseEvent) => void;
  onError?: (error: Event) => void;
}

class WebSocketService {
  private socket: WebSocket | null = null;
  private pingInterval: number | null = null;
  private readonly WS_BASE_URL = 'wss://ya-praktikum.tech/ws/chats';
  private readonly PING_INTERVAL = 30000;

  private handlers: WebSocketEventHandlers = {};

  constructor() {
    this.handlers = {};
  }

  /** Подключение к чату через WebSocket */
  connect(
    userId: TID,
    chatId: TID,
    token: string,
    handlers?: WebSocketEventHandlers
  ) {
    if (
      this.socket &&
      (this.socket.readyState === WebSocket.OPEN ||
        this.socket.readyState === WebSocket.CONNECTING)
    ) {
      console.warn('WebSocket уже подключен или подключается, пропускаем');
      return;
    }

    if (this.socket) {
      this.disconnect();
    }

    if (handlers) {
      this.handlers = { ...handlers };
    }

    const wsUrl = `${this.WS_BASE_URL}/${userId}/${chatId}/${token}`;
    this.socket = new WebSocket(wsUrl);

    this._bindEventHandlers();
    this._startPing();

    console.info(`WS-connect: ${chatId} for user ${userId}`);
  }

  /** Отключение от WebSocket */
  disconnect() {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }

    if (this.socket) {
      if (
        this.socket.readyState === WebSocket.OPEN ||
        this.socket.readyState === WebSocket.CONNECTING
      ) {
        this.socket.close(1000, 'Закрытие по инициативе клиента');
      }
      this.socket = null;
    }

    console.info('WS-disconnect');
  }

  /** Отправка сообщения в чат */
  sendMessage(content: string) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      console.error('WebSocket не подключен');
      return false;
    }

    const message: TWebSocketMessage = {
      content,
      type: 'message',
    };

    this.socket.send(JSON.stringify(message));
    return true;
  }

  /** Запрос старых сообщений с пагинацией */
  getOldMessages(offset: number = 0) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      console.error('WebSocket не подключен');
      return false;
    }

    const message: TWebSocketMessage = {
      content: offset.toString(),
      type: 'get old',
    };

    this.socket.send(JSON.stringify(message));
    return true;
  }

  /** Получение статуса соединения */
  isConnected(): boolean {
    return this.socket?.readyState === WebSocket.OPEN;
  }

  /** Установка обработчиков событий */
  setEventHandlers(handlers: WebSocketEventHandlers) {
    this.handlers = { ...this.handlers, ...handlers };
  }

  /** Привязка обработчиков событий WebSocket  */
  private _bindEventHandlers() {
    if (!this.socket) return;

    this.socket.addEventListener('open', () => {
      console.info('WS-open');
      this.handlers.onOpen?.();
    });

    this.socket.addEventListener('message', (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === 'user connected') {
          this.handlers.onUserConnected?.(data.content);
          return;
        }

        this.handlers.onMessage?.(data);
      } catch (error) {
        console.error('Ошибка парсинга WebSocket сообщения:', error);
      }
    });

    this.socket.addEventListener('close', (event) => {
      if (event.wasClean) {
        console.info('WS-close: clean');
      } else {
        console.info('WS-close: not clean');
      }

      console.info(`WS-close: code ${event.code} | reason ${event.reason}`);

      this._stopPing();
      this.handlers.onClose?.(event);
    });

    this.socket.addEventListener('error', (event) => {
      console.error('WebSocket ошибка:', event);
      this.handlers.onError?.(event);
    });
  }

  /** Запуск ping механизма для поддержания соединения */
  private _startPing() {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
    }

    this.pingInterval = setInterval(() => {
      this._ping();
    }, this.PING_INTERVAL);
  }

  /** Остановка ping механизма */
  private _stopPing() {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }

  /** Отправка ping сообщения */
  private _ping() {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      return;
    }

    const pingMessage: TWebSocketMessage = {
      content: '',
      type: 'ping',
    };

    this.socket.send(JSON.stringify(pingMessage));
  }
}

export default WebSocketService;
export type { TMessage, TWebSocketMessage, WebSocketEventHandlers };
