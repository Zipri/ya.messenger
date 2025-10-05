import type { TID } from '@models/types';

export type TMessage = {
  id: TID;
  text?: string;
  image?: string;
  isOwn: boolean;
  time: string;
};
