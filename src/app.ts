import { ChatList } from './blocks';
import type { Block } from './core';
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
        const loginPage = new LoginPage({});
        this._renderBlock(loginPage);
        return;

      case 'register':
        const registerPage = new RegisterPage({});
        this._renderBlock(registerPage);
        return;

      case 'chat': {
        this.chatListBlock.setProps({
          isSearchHidden: false,
          onChatClick: (chatId: string) => {
            console.log(`Из App.ts: нажат чат с ID: ${chatId}`);
          },
        });

        const chatPage = new ChatPage({ chatList: this.chatListBlock });

        this._renderBlock(chatPage);
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

        this._renderBlock(profilePage);
        return;

      case 'error':
        const errorPage = new ErrorPage({
          errorCode: 'Error 404',
          errorMessage: 'Oops! Страничка не найдена',
        });

        this._renderBlock(errorPage);
        return;
    }

    this.rootElement.innerHTML = pageContent;
  }

  private _renderBlock(block: Block) {
    this.rootElement.innerHTML = '';
    this.rootElement.appendChild(block.getContent());
    block.dispatchComponentDidMount();
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
