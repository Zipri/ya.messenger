import { ChatList } from './blocks';
import {
  ChatPage,
  ErrorPage,
  LoginPage,
  ProfilePage,
  RegisterPage,
} from './pages';
import './styles/style.scss';

type PageType = 'login' | 'register' | 'chat' | 'profile' | 'error';

class App {
  private rootElement: HTMLElement;
  private currentPage: PageType = 'login';
  private chatListBlock: ChatList;

  constructor() {
    this.rootElement = document.querySelector('#app')!;
    this.chatListBlock = new ChatList({});
    this._initEventListeners();
  }

  render() {
    let pageContent = '';

    switch (this.currentPage) {
      case 'login':
        const loginPage = new LoginPage();
        pageContent = loginPage.render();
        break;

      case 'register':
        const registerPage = new RegisterPage();
        pageContent = registerPage.render();
        break;

      case 'chat': {
        this.chatListBlock.setProps({
          isSearchHidden: false,
          onChatClick: (chatId: string) => {
            console.log(`Из App.ts: нажат чат с ID: ${chatId}`);
          },
        });

        const chatPage = new ChatPage({ chatList: this.chatListBlock });

        this.rootElement.innerHTML = '';
        this.rootElement.appendChild(chatPage.getContent());

        chatPage.dispatchComponentDidMount();
        return;
      }

      case 'profile':
        this.chatListBlock.setProps({
          isSearchHidden: true,
          onChatClick: (chatId: string) => {
            console.log(`Из App.ts: нажат чат с ID: ${chatId}`);
          },
        });

        const profilePage = new ProfilePage({ chatList: this.chatListBlock });

        this.rootElement.innerHTML = '';
        this.rootElement.appendChild(profilePage.getContent());

        profilePage.dispatchComponentDidMount();
        return;

      case 'error':
        const errorPage = new ErrorPage();
        pageContent = errorPage.render(
          'Error 404',
          'Oops! Страничка не найдена'
        );
        break;
    }

    this.rootElement.innerHTML = pageContent;
  }

  /** Простая реализация переключения страниц */
  private _initEventListeners() {
    // Слушаем клики по всему документу
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;

      // Проверяем, что кликнули по ссылке с нужным атрибутом
      if (
        (target.tagName === 'A' || target.tagName === 'BUTTON') &&
        target.hasAttribute('data-page')
      ) {
        event.preventDefault();
        const page = target.getAttribute('data-page') as PageType;
        this._navigateTo(page);
      }
    });
  }

  private _navigateTo(page: PageType) {
    this.currentPage = page;
    this.render();
  }
}

export default App;
