import type { AppStore, ProfileService } from '@controllers';

//#region BaseTypes
export type TID = string;
export type TUrl = `/${string}`;

declare global {
  interface Window {
    APP: {
      services?: {
        profileService: ProfileService;
      };
      store?: AppStore;
    };
  }
}
//#endregion BaseTypes

//#region User
export type TUser = {
  id: TID;
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
};
//#endregion User
