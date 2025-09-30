import { EventBus } from './eventBus';
import { Block } from './block';

import type { TBlockProps } from './block/types';
import { Route, Router } from './router';
import ProfileService from './services/profile/profile';
import ChatService from './services/chat/chat';
import WebSocketService from './services/websocket';
import iocServicesInit, { type TServices } from './services/ioc';
import { AppStore, appStoreInit } from './store';

export type { TBlockProps, TServices };

export { EventBus, Block, Router, Route };

export { ProfileService, ChatService, WebSocketService, iocServicesInit };

export { appStoreInit, AppStore };
