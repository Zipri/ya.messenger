import type { AppStore, ProfileService } from '@controllers';
import type ChatService from '@controllers/services/chat/chat';
import type WebSocketService from '@controllers/services/websocket';
import type { TMessage } from '@controllers/services/websocket';

//#region BaseTypes
export type TID = string;
export type TUrl = `/${string}`;
export type TPagination<T> = {
  page: number;
  count: number;
  result: T[];
};

export type TPaginationProps = {
  limit: number;
  offset: number;
};

declare global {
  interface Window {
    APP: {
      services?: {
        profileService: ProfileService;
        chatService: ChatService;
        webSocketService: WebSocketService;
      };
      store?: AppStore;
    };
  }
}
//#endregion BaseTypes

//#region Auth
export type TRegistrationProps = Omit<
  TUser,
  'id' | 'display_name' | 'avatar'
> & {
  password: string;
};
//#endregion Auth

//#region User
export type TUser = {
  id: TID;
  first_name: string;
  second_name: string;
  display_name: string;
  /** string === path */
  avatar: string;
  login: string;
  email: string;
  phone: string;
};

export type TEditProfileProps = Omit<TUser, 'id' | 'avatar' | 'display_name'>;

export type TEditPasswordProps = {
  oldPassword: string;
  newPassword: string;
};

//#endregion User

//#region Chats
export type TChat = {
  id: TID;
  title: string;
  avatar: string;
  unread_count: number;
  created_by: number;
  last_message: {
    user: TUser;
    time: string;
    content: string;
  };
};

export type TGetChatsProps = TPaginationProps & {
  title?: string;
};
//#endregion Chats
