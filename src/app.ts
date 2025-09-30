import router from '@controllers/router/router';
import './ui/styles/style.scss';
import { ChatList } from '@ui-blocks';
import {
  ChatPage,
  ErrorPage,
  LoginPage,
  ProfilePage,
  RegisterPage,
} from '@ui-pages';
import { appStoreInit, iocServicesInit } from '@controllers';
import { BASE_URLS } from '@models';

class App {
  constructor() {
    const services = iocServicesInit();
    appStoreInit(services);
    this._bindLinkNavigation();
  }

  async start() {
    const chatList = new ChatList({
      onChatClick: (chatId: string) => {
        console.log(`Из App.ts: нажат чат с ID: ${chatId}`);
      },
    });

    router
      .use('/', LoginPage)
      .use(BASE_URLS.login, LoginPage)
      .use(BASE_URLS.register, RegisterPage)
      .use(BASE_URLS.chat, ChatPage, { chatList: chatList }) // Для страницы со списком чатов
      .use(`${BASE_URLS.chat}/:id`, ChatPage, { chatList: chatList }) // Для страницы с конкретным диалогом
      .use(BASE_URLS.profile, ProfilePage, { chatList: chatList })
      .use(BASE_URLS.error, ErrorPage, {
        errorCode: 'Error 404',
        errorMessage: 'Oops! Страничка не найдена',
      });

    await window.APP.store?.user.authorize(() => {
      router.go(BASE_URLS.login);
    });

    router.start();
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
