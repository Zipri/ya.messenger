import { LoginPage, RegisterPage } from './pages';
import './styles/style.scss';

// FIXME SKV (!) сделать смену страниц через state
class App {
    private rootElement: HTMLElement;

    constructor() {
        this.rootElement = document.querySelector('#app')!;
    }

    render() {
        const loginPage = new LoginPage();
        const registerPage = new RegisterPage();

        this.rootElement.innerHTML = loginPage.render();
        // this.rootElement.innerHTML = registerPage.render();
    }
}

export default App;
