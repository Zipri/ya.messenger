import { EventBus } from './eventBus';
import { Block } from './block';

import type { TBlockProps } from './block/types';
import { Route, Router } from './router';
import ProfileService from './services/profile/profile';
import iocServices from './services/ioc';

export type { TBlockProps };

export { EventBus, Block, Router, Route };

export { ProfileService, iocServices };
