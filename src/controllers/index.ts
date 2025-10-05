import { Block } from './block';
import type { TBlockProps } from './block/types';
import { EventBus } from './eventBus';
import { Route, Router } from './router';
import ChatService from './services/chat/chat';
import iocServicesInit, { type TServices } from './services/ioc';
import ProfileService from './services/profile/profile';
import WebSocketService from './services/websocket';
import { AppStore, appStoreInit } from './store';

export const globalEventBus = new EventBus();

export type { TBlockProps, TServices };

export { EventBus, Block, Router, Route };

export { ProfileService, ChatService, WebSocketService, iocServicesInit };

export { appStoreInit, AppStore };
