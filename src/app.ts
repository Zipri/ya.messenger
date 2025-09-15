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

  constructor() {
    this.rootElement = document.querySelector('#app')!;
    this.initEventListeners();
  }

  /** Простая реализация переключения страниц */
  private initEventListeners() {
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
        this.navigateTo(page);
      }
    });
  }

  navigateTo(page: PageType) {
    this.currentPage = page;
    this.render();
  }

  render() {
    let pageContent = '';
    let currentPageInstance: ChatPage | ProfilePage | null = null;

    switch (this.currentPage) {
      case 'login':
        const loginPage = new LoginPage();
        pageContent = loginPage.render();
        break;
      case 'register':
        const registerPage = new RegisterPage();
        pageContent = registerPage.render();
        break;
      case 'chat':
        const chatPage = new ChatPage();
        pageContent = chatPage.render();
        currentPageInstance = chatPage;
        break;
      case 'profile':
        const profilePage = new ProfilePage();
        pageContent = profilePage.render();
        currentPageInstance = profilePage as unknown as ProfilePage;
        break;
      case 'error':
        const errorPage = new ErrorPage();
        pageContent = errorPage.render(
          'Error 404',
          'Oops! Страничка не найдена'
        );
        break;
    }

    this.rootElement.innerHTML = pageContent;

    if (this.currentPage === 'chat' && currentPageInstance) {
      (currentPageInstance as ChatPage).afterMount();
    }
    if (this.currentPage === 'profile' && currentPageInstance) {
      (currentPageInstance as ProfilePage).afterMount();
    }
  }
}

export default App;
