import router from '@controllers/router/router';
import { BASE_URLS } from '@models';
import type { TChat, TID } from '@models/types';
import { ChatList } from '@ui-blocks';
import {
  ChatPage,
  ErrorPage,
  LoginPage,
  ProfilePage,
  RegisterPage,
} from '@ui-pages';
import './ui/styles/style.scss';
import { appStoreInit, iocServicesInit } from '@controllers';

class App {
  constructor() {
    const services = iocServicesInit();
    appStoreInit(services);
    this._bindLinkNavigation();
  }

  async start() {
    //#region Blocks
    const chatList = new ChatList({
      onChatClick: (chatId: TID, chat: TChat) => {
        if (window.APP.store) {
          window.APP.store.chats.selectChat(chat);
        }

        router.go(`${BASE_URLS.chat}/${chatId}`);
      },
    });
    //#endregion Blocks

    //#region Routes
    router
      .use(BASE_URLS.root, LoginPage)
      .use(BASE_URLS.login, LoginPage)
      .use(BASE_URLS.register, RegisterPage)
      .use(BASE_URLS.chat, ChatPage, { chatList: chatList })
      .use(`${BASE_URLS.chat}/:id`, ChatPage, { chatList: chatList })
      .use(BASE_URLS.profile, ProfilePage, { chatList: chatList })
      .use(BASE_URLS.error, ErrorPage, {
        errorCode: 'Error 404',
        errorMessage: 'Oops! Страничка не найдена',
      });

    await window.APP.store?.user.authorize(() => {
      router.go(BASE_URLS.login);
    });

    router.start();
    //#endregion Routes
  }

  private _bindLinkNavigation() {
    document.addEventListener('click', (event) => {
      const target = (event.target as HTMLElement).closest(
        '[data-page]'
      ) as HTMLAnchorElement | null;
      if (!target) return;
      event.preventDefault();
      const href = target.getAttribute('data-page');
      if (href) router.go(href);
    });
  }
}

export default App;
