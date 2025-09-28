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
      .use('/login', LoginPage)
      .use('/register', RegisterPage)
      .use('/chat', ChatPage, { chatList: chatList }) // Для страницы со списком чатов
      .use('/chat/:id', ChatPage, { chatList: chatList }) // Для страницы с конкретным диалогом
      .use('/profile', ProfilePage, { chatList: chatList })
      .use('/error', ErrorPage, {
        errorCode: 'Error 404',
        errorMessage: 'Oops! Страничка не найдена',
      });

    await window.APP.store?.user.authorize(() => {
      router.go('/login');
    });

    router.start();

    if (window.location.pathname === '/') {
      router.go('/login');
    }
  }

  private _bindLinkNavigation() {
    document.addEventListener('click', (event) => {
      const target = (event.target as HTMLElement).closest(
        '[data-page]'
      ) as HTMLAnchorElement | null;
      if (!target) return;
      event.preventDefault();
      const href = target.getAttribute('data-page');
      if (href) router.go(`/${href}`);
    });
  }
}

export default App;
