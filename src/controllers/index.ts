import { EventBus } from './eventBus';
import { Block } from './block';

import type { TBlockProps } from './block/types';
import { Route, Router } from './router';
import ProfileService from './services/profile/profile';
import iocServicesInit, { type TServices } from './services/ioc';
import { AppStore, appStoreInit } from './store';

export type { TBlockProps, TServices };

export { EventBus, Block, Router, Route };

export { ProfileService, iocServicesInit };

export { appStoreInit, AppStore };
