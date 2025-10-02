import type { TID } from '@models/types';

export type TUserItem = {
  id: TID;
  name: string;
  avatar?: string;
  isOwn?: boolean;
};

