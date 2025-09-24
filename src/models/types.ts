import type { ProfileService } from '@controllers';

export type TID = string;
export type TUrl = `/${string}`;

declare global {
  interface Window {
    APP: {
      services?: {
        profileService: ProfileService;
      };
    };
  }
}
